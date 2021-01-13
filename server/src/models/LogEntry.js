const mongoose = require('mongoose'); 

const { Schema } = mongoose; 

const requiredString = {
    type: String, 
    required: true
}; 

const logSchema = new Schema({
    title: requiredString, 
    location: requiredString,
    lodgings: requiredString, 
    description: requiredString,
    location_rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 5
    },
    lodgings_rating: {
        type: Number,
        min: 0,
        max: 10,
        default: 5
    },
    image_one: String,
    image_two: String,
    image_three: String,
    image_four: String,
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
    },

}, {
    timestamps: true
});

const LogEntry = mongoose.model('LogEntry', logSchema); 

module.exports = LogEntry; 