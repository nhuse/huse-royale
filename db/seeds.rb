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
Game.create(name: "Black Jack", img: "https://www.thesportsbank.net/wp-content/uploads/2020/04/BLACK-JACK.jpg")
Game.create(name: "Roulette", img: "https://extrabetamerica.imgix.net/1aacb593ba314efb9464f00c74e616c5.jpg?fit=crop&ar=1:1")
Game.create(name: "Slots", img: "https://slots.info/wp-content/uploads/2018/02/best-3-reel-slots.jpg")
puts "Done Seeding Games"