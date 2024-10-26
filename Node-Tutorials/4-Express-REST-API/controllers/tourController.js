const TourModel = require('./../model/tour_model');
const mongoose = require('mongoose');

// Getting all the entries present in the tour package
exports.getAllTour = async (req, res) => {
    try{
        const tours = await TourModel.find();
        res.status(200).json({
            status: 'success',
            results: tours.length,
            data: {
                tours: tours,
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

// Getting a tour entry via it's id
exports.getTour = async (req, res) => {

    try{
        // const tour = await TourModel.findById(req.params.id);
        // console.log(`tour_id: ${req.params.id}`);
        const tour = await TourModel.find({tour_id: req.params.id*1});
        res.status(200).json({
            status: 'success',
            data: {
                tour: tour,
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

