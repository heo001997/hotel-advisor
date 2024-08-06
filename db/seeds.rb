# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

Accommodation.create(room_type: :single, sleeps: 1, room_count: 2, price: 30)
Accommodation.create(room_type: :double, sleeps: 2, room_count: 3, price: 50)
Accommodation.create(room_type: :family, sleeps: 4, room_count: 1, price: 85)
