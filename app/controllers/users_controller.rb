class UsersController < ApplicationController
    skip_before_action :authorize, only: :create
    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def show
        render json: @current_user, status: :ok
    end

    def update
        user = User.find_by(id: params[:id])
        user.update!(user_params)
        render json: user, status: :accepted
    end


    private

    def user_params
        params.permit(:id, :first_name, :last_name, :username, :user_img, :email, :password, :password_confirmation, :chips, :bank)
    end
end
