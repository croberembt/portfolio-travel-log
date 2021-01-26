const mongoose = require('mongoose'); 

const { Schema } = mongoose; 

const logSchema = new Schema({
    title: {
        type: String,
   
    }, 
    description: {
        type: String,
   
    },
    vacation_rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 5
    },
    image: String,
    latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90
    },
    longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180
    }

}, {
    timestamps: true
});

const LogEntry = mongoose.model('LogEntry', logSchema); 

module.exports = LogEntry; 