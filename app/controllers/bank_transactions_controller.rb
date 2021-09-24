class BankTransactionsController < ApplicationController
    def create
        BankTransaction.create!(transaction_params)
        transactions = BankTransaction.where(user_id: params[:user_id])
        render json: transactions.last(12).reverse, status: :created
    end

    def show
        transactions = BankTransaction.where(user_id: params[:user_id])
        render json: transactions.last(12).reverse, status: :ok
    end

    private

    def transaction_params
        params.permit(:user_id, :amount)
    end
end
