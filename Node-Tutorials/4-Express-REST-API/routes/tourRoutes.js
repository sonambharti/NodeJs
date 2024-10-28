const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// router
//     .route('/')
//     .get(tourController.getAllTour)
//     .post(tourController.checkBody, tourController.addTour); // calling for middleware check first using middleware chaining.


router
    .route('/top-5-cheaps')
    .get(tourController.getTopTours, tourController.getAllTour);

router
    .route('/tour-stats')
    .get(tourController.getTourStats);


router
    .route('/tour-monthly-plan/:year')
    .get(tourController.getMonthlyPlan);
   

router
    .route('/')
    .get(tourController.getAllTour)
    .post(tourController.addTour); 

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;