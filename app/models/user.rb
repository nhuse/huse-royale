class User < ApplicationRecord
    has_secure_password
    has_many :win_loss_histories
    has_many :games, through: :win_loss_histories

    validates :first_name, presence: true
    validates :last_name, presence: true
    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
    validates :password, length: { maximum: 16 }
end
