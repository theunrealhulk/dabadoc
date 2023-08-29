class User
  include Mongoid::Document
  include Mongoid::Timestamps
  include ActiveModel::SecurePassword

  field :email, type: String
  field :password_digest, type: String
  field :token, type: String
  field :favorites, type: Array, default: []

  has_many :questions

  validates :email,uniqueness: true, presence: true
  validates :password, presence: true, :length => {:minimum =>  6}, :on => :create

  has_secure_password
end
