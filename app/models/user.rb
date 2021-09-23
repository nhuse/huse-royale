class User < ApplicationRecord
    has_secure_password
    has_many :bank_transactions
    has_many :comments
    has_many :games, through: :comments

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
    validates :password, length: { maximum: 16 }
end
