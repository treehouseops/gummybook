module Api
  class QuestionsController < ApplicationController
    skip_before_action :verify_authenticity_token

    def ask
      question_text = params[:question]
      existing_question = Question.find_by(question: question_text)

      Rails.logger.info "Received question: #{question_text}"

      if existing_question
        Rails.logger.info "Question found in database."
        render json: { answer: existing_question.answer }, status: :ok
      else
        Rails.logger.info "Question not found, calling OpenAI API."
        answer = call_openai_api(question_text)
        new_question = Question.create(question: question_text, answer: answer)
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

    def call_openai_api(question)
      # Logic to call OpenAI's API and return the answer
      Rails.logger.info "Calling OpenAI!!"
      return "OpenAI answer"
    end
  end
end
