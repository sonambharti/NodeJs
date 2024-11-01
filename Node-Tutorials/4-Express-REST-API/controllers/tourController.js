const TourModel = require('./../model/tour_model');
const mongoose = require('mongoose');
const APIFeatures = require('./../utils/apiFeatures');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');


// Getting top 5 tour
exports.getTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratingsAverage,price';
    req.query.fields = 'name,price,ratingsAverage,difficulty';
    next();
};


// Getting all the entries present in the tour package
exports.getAllTour = catchAsync(async (req, res, next) => {
    // try{
        // const tours = await TourModel.find();
        // console.log("query = ", req.query)
        // const tours = await TourModel.find({ price: { '$gte': '500' } }); // mongo query to find the tour whose price >= 500
        // const tours = await TourModel.find({$and: [{ price: { '$gte': '500' } }, {duration: {'$lt': '5'}}]}); // mongo query to find the tour whose price >= 500 and duration is less than 5.
        // const tours = await TourModel.find(req.query);
        const features = new APIFeatures(TourModel.find(), req.query).filter().sort().limitFields().paginate();
        const tours = await features.query;
        // console.log("tours = ", tours)
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours: tours,
            },
        });

    // }
    // catch (err){
    //     new AppError(`Error: ${err}`, 400);
        // res.status(400).json({
        //     status: 'fail',
        //     message: `Error: ${err}`,
        // });

    // }
    
})

// Getting a tour entry via it's id
exports.getTour = async (req, res, next) => {

    try{
        const tour = await TourModel.findById(req.params.id);
        // console.log(`tour_id: ${req.params.id}`);
        // const tour = await TourModel.find({tour_id: req.params.id*1});
        
        res.status(200).json({
            status: 'success',
            data: {
                tour: tour,
            },
        });

    } catch (err){
        return next(new AppError(`Error: ${err}`, 400));
        // res.status(400).json({
        //     status: 'fail',
        //     message: `Error: ${err}`,
        // });

    }
}   

// Update Tour
exports.updateTour = async (req, res) => {
    try{
        const updatedTour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data: {
                tours: updatedTour,
            },
        });

    }
    catch (err){
        res.status(400).json({
            status: 'fail',
            message: `Error: ${err}`,
        });

    }

}   


// Delete Tour
exports.deleteTour = async (req, res) => {
    try{
        const tour = await TourModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            data: null,
        });

    }
    catch (err){
        res.status(400).json({
            status: 'fail',
            message: `Error: ${err}`,
        });

    }
} 


// Adding new entry in the file 
exports.addTour = async (req, res) => {
    try {
        const newTour = await  TourModel.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    }
    catch (err){
        res.status(400).json({
            status: 'fail',
            message: 'Error: Invalid Data Sent',
        });
    }
};

exports.getTourStats = async (req, res) => {
try {
    const stats = await  TourModel.aggregate([
        {
            $match: {ratingsAverage: {$gte: 4.5}},
        },
        {
            $group: {
                // _id: null, // groupBy
                // _id: '$difficulty',
                _id: {$toUpper: '$difficulty'},
                noOfTours: {$sum: 1},
                numRatings: {$sum: '$ratingsQuantity'},
                avgRatings: {$avg: '$price'},
                avgPrice: {$avg: '$price'},
                minPrice: {$min: '$price'},
                maxPrice: {$max: '$price'}, 
            }
        },
        {
            $sort: {
                avgPrice: -1, // descending urder a/c to the stats document
            }
        },
        {
            $match: {_id: {$ne: 'easy'}}, // this match ll be applied on the resultant document based on grouped id where dificulty is not equal to 'easy'.
        }
    ]);
        res.status(200).json({
            status: 'success',
            data: {
                tourStats: stats,
            },
        });
    } catch (err){
        res.status(400).json({
            status: 'fail',
            message: 'Error: Invalid Data Sent',
        });
    }
};


exports.getMonthlyPlan = async (req, res) => {
    try {
        const year = req.params.year * 1;
        const monthlyPlan = await TourModel.aggregate([
            {
                $unwind: '$startDates', // unwind is agregate func in mongo to ungroup a document based on unwind object
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`),
                    },
                },
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numTours: { $sum: 1 },
                    tours: { $push: '$name' },
                },
            },
            {
                $addFields: {
                    month: '$_id',
                    // $month: { $month: '$startDates' },
                },
            },
            {
                $project: {
                    _id: 0,
                    month: 1,
                    numTours: 1,
                    tours: 1,
                }
            },
            {
                $sort: { numTours: 1 }
            },
            {
                $limit: 3,
            }

        ]);
        res.status(200).json({
            status: 'success',
            data: {
                monthlyPlan: monthlyPlan,
            },
        });
    } catch (err){
        res.status(404).json({
            status: 'fail',
            message: `Not Found: ${err}`,
        });
    }
}
