class CommentsController < ApplicationController
    skip_before_action :authorize
    def index
        render json: Comment.order(:id), include: { user: { only: [:first_name] }}, status: :accepted
    end

    def create
        new_comment = Comment.create!(comment_params)
        render json: Comment.all, include: { user: { only: [:first_name] }}, status: :created
    end

    def destroy
        comment = Comment.find_by(id: params[:id])
        comment.destroy
        render json: Comment.all, include: { user: { only: [:first_name] }}, status: :accepted
    end

    def update
        comment = Comment.find_by(id: params[:id])
        comment.update!(comment_params)
        render json: Comment.order(:id), include: { user: { only: [:first_name] }}, status: :accepted
    end

    private

    def comment_params
        params.permit(:id, :comment, :game_id, :user_id)
    end
end
