const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// param is a router's middleware which is used to set/check param values for the application
// router.param('id',(req, res, next, val) => {
//     console.log(`Value of Id is: ${val}`);
//     next();
// });

// here, if id is not in the req.url then it will just return to the next otherwise it will call checkId
router.param('id', tourController.checkId);

router
    .route('/')
    .get(tourController.getAllTour)
    .post(tourController.checkBody, tourController.addTour); // calling for middleware check first using middleware chaining.

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour);

module.exports = router;