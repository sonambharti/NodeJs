const mongoose = require('mongoose');

const TourSchema = new mongoose.Schema({
    tour_id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    NoOfDays: {
      type: String,
      required: true
    },
    Price: {
        type: Number,
        required: [true, 'A tour price is compulsory'],
    },
    DifficultyLevel: {
        type: String,
        required: true,
    },
    
});

module.exports = mongoose.model('Tours', TourSchema);