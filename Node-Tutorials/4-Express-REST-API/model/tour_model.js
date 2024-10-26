const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
    tour_id: {
        type: Number,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    duration: {
      type: Number,
      required: true
    },
    maxGroupSize: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
    },
    ratingsAverage: {
        type: Number,
        required: [true, 'A tour price is compulsory'],
    },
    ratingsQuantity: {
        type: Number,
        required: [true, 'A tour price is compulsory'],
    },
    price: {
        type: Number,
        required: [true, 'A tour price is compulsory'],
    },
    summary: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    imageCover: {
        type: String,
        required: true,
    },
    image: {
        type: Object,
    },
    startDates: {
        type: [Date],
        required: true,
    }
    
});

module.exports = mongoose.model('Tours', TourSchema);