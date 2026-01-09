const mongoose = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/camp-db')

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('Database connected')
})

const randSample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({})
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 30) + 10
        const camp = new Campground({
            author:'68df81f028656e125c0f019c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${randSample(descriptors)} ${randSample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dtxoavowy/image/upload/v1761391572/CampCheck/xgucactagqfk92midvhf.png',
                    filename: 'CampCheck/xgucactagqfk92midvhf',             
                },
                {
                    url: 'https://res.cloudinary.com/dtxoavowy/image/upload/v1761391564/CampCheck/tav0wpd56teposlaoq3f.png',
                    filename: 'CampCheck/tav0wpd56teposlaoq3f',
                },
            ],
            description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius vero sunt harum voluptate. Repellat libero, nam ab, molestiae atque commodi voluptates rerum culpa rem sapiente, ut quisquam facilis quae totam.",
            price

        })
        await camp.save()

    }
}

seedDB().then(() => {
    mongoose.connection.close()
})

