require "openai"

require "csv"

COMPLETIONS_MODEL = "text-davinci-003"

MODEL_NAME = "curie"

DOC_EMBEDDINGS_MODEL = "text-search-#{MODEL_NAME}-doc-001"
QUERY_EMBEDDINGS_MODEL = "text-search-#{MODEL_NAME}-query-001"

MAX_SECTION_LEN = 500
SEPARATOR = "\n* "
separator_len = 3

COMPLETIONS_API_PARAMS = {
  # We use temperature of 0.0 because it gives the most predictable, factual answer.
  temperature: 0.0,
  max_tokens: 150,
  model: COMPLETIONS_MODEL
}

$client = OpenAI::Client.new(access_token: ENV["OPENAI_API_KEY"])

module Api
  class QuestionsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def ask
      question_text = params[:question]
      question_text += "?" unless question_text.end_with?("?")

      existing_question = Question.find_by(question: question_text)

      Rails.logger.info "Received question: #{question_text}"

      if existing_question
        Rails.logger.info "Previously asked and answered: #{existing_question.answer}"
        existing_question.ask_count += 1
        existing_question.save
        render json: {
                 question: existing_question.question,
                 answer: existing_question.answer,
                 id: existing_question.id
               },
               status: :ok
      else
        Rails.logger.info "Question not found, calling OpenAI API."
        answer, context = ask_open_ai(question_text)
        new_question =
          Question.create(
            question: question_text,
            answer: answer,
            context: context,
            ask_count: 1
          )
        if new_question.save
          Rails.logger.info "Question saved successfully."
          render json: { answer: new_question.answer }, status: :created
        else
          Rails.logger.error "Failed to save question."
          render json: new_question.errors, status: :unprocessable_entity
        end
      end
    end

    private

    def get_embedding(text, model)
      begin
        response = $client.embeddings(parameters: { model: model, input: text })
        response["data"][0]["embedding"]
      rescue => e
        Rails.logger.error "An error occurred while calling the OpenAI API: #{e.message}"
        nil
      end
    end

    def get_doc_embedding(text)
      get_embedding(text, DOC_EMBEDDINGS_MODEL)
    end

    def get_query_embedding(text)
      get_embedding(text, QUERY_EMBEDDINGS_MODEL)
    end

    def vector_similarity(x, y)
      # Dot product of two vectors
      x.zip(y).map { |xi, yi| xi * yi }.sum
    end

    def order_document_sections_by_query_similarity(query, contexts)
      query_embedding = get_query_embedding(query)

      document_similarities =
        contexts.map do |doc_index, doc_embedding|
          [vector_similarity(query_embedding, doc_embedding), doc_index]
        end

      document_similarities.sort_by { |similarity, _| -similarity }
    end

    def load_embeddings(fname)
      CSV
        .read(fname, headers: true)
        .map do |row|
          title = row["title"]
          embedding = row.to_h.reject { |k, _| k == "title" }.values.map(&:to_f)
          [title, embedding]
        end
        .to_h
    end

    def ask_open_ai(question)
      csv_text = File.read("book.pdf.pages.csv")
      csv = CSV.parse(csv_text, headers: true)
      document_embeddings = load_embeddings("book.pdf.embeddings.csv")

      prompt, context = build_prompt(question, csv, document_embeddings)

      params = COMPLETIONS_API_PARAMS.merge({ "prompt" => prompt })

      response = $client.completions(parameters: params)

      answer = response["choices"][0]["text"].strip

      return answer, context
    end

    def build_prompt(question, csv, document_embeddings)
      most_relevant_document_sections =
        order_document_sections_by_query_similarity(
          question,
          document_embeddings
        )

      # Extract the document indexes from most_relevant_document_sections
      relevant_indexes =
        most_relevant_document_sections.map { |_, doc_index| doc_index }

      chosen_sections = []
      chosen_sections_len = 0
      chosen_sections_indexes = []

      Rails.logger.info "Most relevant document sections: #{most_relevant_document_sections}"

      most_relevant_document_sections.each do |_, section_index|
        row = csv.find { |row| row["title"] == section_index }
        next unless row

        tokens = row["tokens"].to_i
        content = row["content"]

        chosen_sections_len += tokens + SEPARATOR.length
        if chosen_sections_len > MAX_SECTION_LEN
          space_left = MAX_SECTION_LEN - chosen_sections_len - SEPARATOR.length
          chosen_sections.append(SEPARATOR + content[0...space_left])
          chosen_sections_indexes.append(section_index.to_s)
          break
        end

        chosen_sections.append(SEPARATOR + content)
        chosen_sections_indexes.append(section_index.to_s)
      end

      context = chosen_sections.join("")
      prompt = context + "\n\n\nQ: " + question + "\n\nA: "

      return prompt, context
    end
  end
end
