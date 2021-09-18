class WinLossHistoriesController < ApplicationController
    skip_before_action :authorize
    def show
        win_loss_history = WinLossHistory.where(user_id: params[:user_id]).group(:game_id).sum(:totalLG)
        sorted_win_loss = win_loss_history.sort_by{|key, value| -value}
        game = Game.find_by(id: sorted_win_loss[0][0])
        best_game = {
            name: game.name,
            totalLG: sorted_win_loss[0][1]
        }
        render json: best_game, status: :ok
    end

    def create
        new_history = WinLossHistory.create!(history_params)
    end

    private

    def history_params
        params.permit(:chip_amount, :game_id, :user_id)
    end
end
