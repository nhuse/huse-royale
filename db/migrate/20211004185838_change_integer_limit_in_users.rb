class ChangeIntegerLimitInUsers < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :last_slots_time, :integer, limit: 8
  end
end
