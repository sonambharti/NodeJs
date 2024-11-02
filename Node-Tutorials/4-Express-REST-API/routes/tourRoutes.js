const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');

const router = express.Router();

// router
//     .route('/')
//     .get(tourController.getAllTour)
//     .post(tourController.checkBody, tourController.addTour); // calling for middleware check first using middleware chaining.


router
    .route('/top-5-cheaps')
    .get(authController.protect, tourController.getTopTours, tourController.getAllTour);

router
    .route('/tour-stats')
    .get(authController.protect, authController.restrictTo('admin', 'leadguide', 'manager'), tourController.getTourStats);


router
    .route('/tour-monthly-plan/:year')
    .get(authController.protect, tourController.getMonthlyPlan);
   

router
    .route('/')
    .get(authController.protect, tourController.getAllTour)
    .post(authController.protect, authController.restrictTo('admin', 'leadguide', 'manager'), tourController.addTour); 

router
    .route('/:id')
    .get(authController.protect, tourController.getTour)
    .patch(authController.protect, authController.restrictTo('admin', 'leadguide', 'manager'), tourController.updateTour)
    .delete(authController.protect, authController.restrictTo('admin', 'leadguide', 'manager'), tourController.deleteTour);

module.exports = router;