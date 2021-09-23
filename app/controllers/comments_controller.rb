class CommentsController < ApplicationController
    skip_before_action :authorize
    def user_comments
        comments = Comment.where(user_id: params[:user_id])
        render json: comments, status: :accepted
    end

    def game_comments
        comments = Comment.where(game_id: params[:game_id])
        render json: comments, include: { user: { only: [:name] }}, status: :accepted
    end

    def create
        new_comment = Comment.create!(comment_params)
        review json: Comment.all, include: { user: { only: [:name] }}, status: :created
    end

    def destroy
        comment = Comment.find_by(id: params[:id])
        comment.destroy
        render json: Comment.all, include: { user: { only: [:name] }}, status: :accepted
    end

    def update
        comment = Comment.find_by(id: params[:id])
        comment.update!(comment_params)
        render json: Comment.order(:id), include: { user: { only: [:name] }}, status: :accepted
    end

    private

    def comment_params
        params.permit(:comment, :game_id, :user_id)
    end
end
