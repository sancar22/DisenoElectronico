5.times do
    User.find(3).trucks.create({
        truckname: Faker::Superhero.name,
    })
end