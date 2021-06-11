const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlparser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=> {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price= Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
          //MY USER ID!
            author: '60b6e74d3dc3772b34707346',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'YelpCamp the best around the world.',
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
                  url: 'https://res.cloudinary.com/lsilveira194/image/upload/v1622865712/YelpCamp/tj8ximfcw6d1neyytta1.jpg',
                  filename: 'YelpCamp/tj8ximfcw6d1neyytta1'
                },
                {
                  url: 'https://res.cloudinary.com/lsilveira194/image/upload/v1622865713/YelpCamp/zkgts8alznitbt6l7yjm.jpg',
                  filename: 'YelpCamp/zkgts8alznitbt6l7yjm'
                },
                {
                  url: 'https://res.cloudinary.com/lsilveira194/image/upload/v1622865716/YelpCamp/hsv2jxfawsvmmfpnt5tl.jpg',
                  filename: 'YelpCamp/hsv2jxfawsvmmfpnt5tl'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close()
})