# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding Users..."
User.create(first_name: "Nate", last_name: "Huse", username: "nhuse", email: "1234@gmail.com", password: "1234")
puts "Done Seeding Users!"

puts "Seeding Games..."
Game.create(name: "Black Jack")
Game.create(name: "Roulette")
Game.create(name: "Slots")
Game.create(name: "Texas Hold 'Em")
puts "Done Seeding Games"

puts "Seeding Win/Losses..."
WinLossHistory.create(user_id: 1, game_id: 1, totalLG: 86)
WinLossHistory.create(user_id: 1, game_id: 3, totalLG: 169)
WinLossHistory.create(user_id: 1, game_id: 2, totalLG: -96)
WinLossHistory.create(user_id: 1, game_id: 1, totalLG: -45)
WinLossHistory.create(user_id: 1, game_id: 4, totalLG: -99)
WinLossHistory.create(user_id: 1, game_id: 4, totalLG: 506)
WinLossHistory.create(user_id: 1, game_id: 2, totalLG: 1023)
WinLossHistory.create(user_id: 1, game_id: 3, totalLG: -18)
WinLossHistory.create(user_id: 1, game_id: 3, totalLG: 982)
WinLossHistory.create(user_id: 1, game_id: 1, totalLG: -1046)
WinLossHistory.create(user_id: 1, game_id: 2, totalLG: -96)
WinLossHistory.create(user_id: 1, game_id: 1, totalLG: 113)
WinLossHistory.create(user_id: 1, game_id: 4, totalLG: -86)
WinLossHistory.create(user_id: 1, game_id: 3, totalLG: 169)
WinLossHistory.create(user_id: 1, game_id: 2, totalLG: -96)
WinLossHistory.create(user_id: 1, game_id: 4, totalLG: -45)
puts "Done Seeding Win/Losses!"