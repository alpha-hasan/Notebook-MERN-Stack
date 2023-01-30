require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB atlas
const mongoURI = process.env.DATABASE_URI;

// Local Connection / MongoDB Compass
// const mongoURI = "mongodb://localhost:27017";


const connectToMongo = async () => {
    try {
        const connection = await mongoose.connect(mongoURI);
        console.log('DB Connection Established Successfully!');
    }
    catch (error) {
        console.log('Failed To Established DB Connection: ', error);
        process.exit(1);
    }
}
module.exports = connectToMongo;