class Truck < ApplicationRecord
  belongs_to :user
  has_many :locations
  validates :truckname, presence: true
end
