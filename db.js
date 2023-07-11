const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1/notescribe"



const connectDB = () => {
    mongoose.connect(mongoURI,{useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));    
};
module.exports = connectDB;