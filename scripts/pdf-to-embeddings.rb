require "dotenv/load"
require "pdf-reader"
require "csv"
require "ruby/openai"

$client = OpenAI::Client.new(access_token: ENV["OPENAI_API_KEY"])

COMPLETIONS_MODEL = "text-davinci-003"
MODEL_NAME = "curie"
DOC_EMBEDDINGS_MODEL = "text-search-#{MODEL_NAME}-doc-001"

# GPT2 Tokenizer in Ruby
def tokenize(text)
  text.split(" ").size
end

def count_tokens(text)
  tokenize(text)
end

def extract_pages(page_text, index)
  return [] if page_text.nil? || page_text.empty?

  content = page_text.split.join(" ")
  puts "page text: #{content}"
  tokens = count_tokens(content) + 4
  [["Page #{index}", content, tokens]]
end

# Command-line arguments
filename = ARGV[0]

# PDF reading
reader = PDF::Reader.new(filename)

res = []
i = 1
reader.pages.each do |page|
  res += extract_pages(page.text, i)
  i += 1
end

# Filter rows with too many tokens and reset index
res = res.select { |row| row[2] < 2046 }

# CSV export
CSV.open("book.pdf.pages.csv", "w") do |csv|
  csv << %w[title content tokens]
  res.each { |row| csv << row }
end

def get_embedding(text, model)
  begin
    response = $client.embeddings(parameters: { model: model, input: text })
    puts "OpenAI API response: #{response}"
    response["data"][0]["embedding"]
  rescue StandardError => e
    puts "Error when calling OpenAI API: #{e}"
    nil
  end
end

def get_doc_embedding(text)
  get_embedding(text, DOC_EMBEDDINGS_MODEL)
end

def compute_doc_embeddings(data)
  doc_embeddings = {}
  data.each_with_index do |row, index|
    doc_embeddings[index] = get_doc_embedding(row[1])
  end
  doc_embeddings
end

# CSV export for embeddings
doc_embeddings = compute_doc_embeddings(res)

CSV.open("book.pdf.embeddings.csv", "w") do |csv|
  csv << ["title"] + (0..4095).to_a
  doc_embeddings.each do |index, embedding|
    csv << ["Page #{index + 1}"] + embedding
  end
end
