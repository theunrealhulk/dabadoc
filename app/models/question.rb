class Question
  include Mongoid::Document
  include Mongoid::Timestamps

  field :title, type: String
  field :content, type: String
  field :location, type: String

  belongs_to :user

  validates :title, presence: true
  validates :content, presence: true
  validates :location, presence: true
  validates_presence_of :user
  validate :unique_combination_of_attributes

  private

  def unique_combination_of_attributes
    existing_question = Question.where(
      title: title,
      content: content,
      location: location
    ).not_in(id: id || -1).first

    if existing_question
      errors.add(:base, 'Question with the same combination of title, content, and location already exists')
    end
  end
end
