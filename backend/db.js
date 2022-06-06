const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/noteBook";

const connectToMongo = async () => {
    try {
        mongoose.connect(mongoURI, () => {
            console.log('Connection Established Successfully!');
        })
    } catch (error) {
        console.log('Error: ', error);
    }
}
module.exports = connectToMongo;