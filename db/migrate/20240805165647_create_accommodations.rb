class CreateAccommodations < ActiveRecord::Migration[7.1]
  def change
    create_table :accommodations do |t|
      t.integer :room_type, limit: 2, null: false
      t.integer :sleeps, limit: 2, null: false
      t.bigint :room_count, null: false
      t.decimal :price, precision: 5, scale: 2, null: false

      t.timestamps
    end
  end
end
