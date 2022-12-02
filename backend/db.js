const mongoose = require('mongoose');
const mongoURI = process.env.mongoURI;

const connectToMongo = () => {
    mongoose.connect(mongoURI, { dbName: 'devcode' }, () => {
        console.log("Connected To Mongo Successfully!!");
    });
}


module.exports = connectToMongo;