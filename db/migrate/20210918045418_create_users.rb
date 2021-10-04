class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :username
      t.string :password_digest
      t.string :email
      t.integer :chips
      t.integer :bank
      t.string :user_img
      t.integer :last_slots_time

      t.timestamps
    end
  end
end
