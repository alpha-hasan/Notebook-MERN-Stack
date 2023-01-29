require('dotenv').config();
const mongoose = require('mongoose');

// MongoDB atlas
const mongoURI = process.env.DATABASE_URI;

// Local Connection / MongoDB Compass
// const mongoURI = "mongodb://localhost:27017";


const connectToMongo = async () => {
    try {
        mongoose.connect(mongoURI, () => {
            console.log('DB Connection Established Successfully!');
        })
    } catch (error) {
        console.log('Error: ', error);
    }
}
module.exports = connectToMongo;