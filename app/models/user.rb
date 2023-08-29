class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword

  field :email, type: String
  field :password_digest, type: String
  field :token, type: String

  has_many :questions
  has_many :answers
  has_many :favorites

  validates :email,uniqueness: true, presence: true
  validates :password, presence: true, :length => {:minimum =>  6}, :on => :create

  has_secure_password
end
