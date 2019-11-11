class User < ApplicationRecord
    has_many :trucks
    has_secure_password
    validates :name, presence: true
    validates :email, presence: true
end
