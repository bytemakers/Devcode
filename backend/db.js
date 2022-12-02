const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const mongoURI = process.env.mongoURI;

const connectToMongo = () => {
    mongoose.connect(mongoURI, { dbName: 'devcode' }, () => {
        console.log("Connected To Mongo Successfully!!");
    });
}


module.exports = connectToMongo;