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
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            select: false, // will not show in queries
        },  
        secretTour: {
            type: Boolean,
            default: false,
        } ,
    },
    // enabling Options additions to schema
    {
        toJSON: {virtuals: true},
        toObjects: {virtuals: true},
    }

);

// virtual functions is not stored in DB, and hence cannot use aggregators
TourSchema.virtual('durationWeeks').get(function () {
    return this.duration / 7;
})

/**Mongoose Middle ware */
// Document middleware: runs before .save() .create()
TourSchema.pre('save', function (next) {
    // this.constructor.prototype.__getHook__ = 'save';
    console.log('Aill save document');
    next();
});
// Document middleware: runs after .save() .create()
TourSchema.post('save', function (doc, next) {
    console.log(doc.name, 'was just saved');
    next();
})

// Query middleware: runs before .find() .findOne() .update() .remove()
TourSchema.pre(/^find/, function (next) { // '^' in regeluar expression represents the word is prefix
    // console.log('Aill find some documents');
    this.find({secretTour: {$ne : true}});
    this.start = Date.now();
    next();
});

TourSchema.post(/^find/, function (doc,next) { // '^' in regeluar expression represents the word is prefix
    // console.log('Aill find some documents');
    console.log(`Query took ${Date.now() - this.start} milliseconds...`); 
    next();
});

module.exports = mongoose.model('Tours', TourSchema);