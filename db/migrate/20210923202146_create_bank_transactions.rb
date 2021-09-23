class CreateBankTransactions < ActiveRecord::Migration[6.1]
  def change
    create_table :bank_transactions do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.integer :amount

      t.timestamps
    end
  end
end
