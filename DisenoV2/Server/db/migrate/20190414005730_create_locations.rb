class CreateLocations < ActiveRecord::Migration[5.2]
  def change
    create_table :locations do |t|
      t.references :truck, foreign_key: true
      t.string :Lat
      t.string :Lng
      t.string :Date
      t.string :Time
      t.string :RPM
      t.string :Vel
    end
  end
end
