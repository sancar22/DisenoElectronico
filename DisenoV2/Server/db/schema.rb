# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_04_14_013822) do

  create_table "locations", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.bigint "truck_id"
    t.string "Lat"
    t.string "Lng"
    t.string "Date"
    t.string "Time"
    t.string "RPM"
    t.string "Vel"
    t.index ["truck_id"], name: "index_locations_on_truck_id"
  end

  create_table "trucks", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.bigint "user_id"
    t.string "truckname"
    t.index ["user_id"], name: "index_trucks_on_user_id"
  end

  create_table "users", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.string "password_digest"
  end

  add_foreign_key "locations", "trucks"
  add_foreign_key "trucks", "users"
end
