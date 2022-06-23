const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '626ba8d67ee6254550201cc9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
              type: "Point",
              coordinates: [
                  cities[random1000].longitude,
                  cities[random1000].latitude,
              ]
          },
            images:[
                {
                  url: 'https://res.cloudinary.com/ansh61/image/upload/v1651480965/Campify/lmsvjvkbno1kisjubulv.jpg',
                  filename: 'Campify/lmsvjvkbno1kisjubulv'
                },
                {
                  url: 'https://res.cloudinary.com/ansh61/image/upload/v1651480964/Campify/uavvlb98k2cgncaehhuo.jpg',
                  filename: 'Campify/uavvlb98k2cgncaehhuo'
                },

              ]
        })
        await camp.save();
    }
}
seedDB()
// seedDB().then(() => {
//     mongoose.connection.close();
// })