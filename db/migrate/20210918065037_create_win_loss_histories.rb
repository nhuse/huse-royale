class CreateWinLossHistories < ActiveRecord::Migration[6.1]
  def change
    create_table :win_loss_histories do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :game, null: false, foreign_key: true
      t.integer :totalLG

      t.timestamps
    end
  end
end
