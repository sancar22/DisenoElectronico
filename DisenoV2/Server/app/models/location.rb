class Location < ApplicationRecord
  belongs_to :truck
  validates :Lat, presence: true
  validates :Lng, presence: true
  validates :Date, presence: true
  validates :Time, presence: true
end
