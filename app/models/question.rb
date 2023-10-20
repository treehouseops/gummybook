class Question < ApplicationRecord
    validates :question, length: { maximum: 140 }
    validates :answer, length: { maximum: 1000 }
  end
  