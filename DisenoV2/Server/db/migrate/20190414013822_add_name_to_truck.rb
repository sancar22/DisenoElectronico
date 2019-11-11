class AddNameToTruck < ActiveRecord::Migration[5.2]
  def change
    add_column :trucks, :truckname, :string
  end
end
