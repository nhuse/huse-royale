class Game < ApplicationRecord
    has_many :win_loss_histories
    has_many :users, through: :win_loss_histories
end
