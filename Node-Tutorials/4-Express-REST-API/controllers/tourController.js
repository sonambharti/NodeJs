const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));


exports.checkId = (req, res, next, val) => {
    const id = req.params.id*1;
    if (id > tours.length - 1){
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid id',
        });
    }
    next();
};


// user-defined middleware to check if particular details are missing in request body or not...
exports.checkBody = (req, res, next) => {
    if (!req.body.name || !req.body.price) {
        return res.status(404).json({
            status: 'fail',
            message: 'Missing name or price in request body',
        });
    }
    next();
}


// Getting all the entries present in the tour package
exports.getAllTour =  (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours,
        },
    });
}



// Getting a tour entry via it's id
exports.getTour = (req, res) => {
    // console.log(req.params);
    console.log(req.requestedAt);
    const id = req.params.id*1;
    
    const tour = tours.find((el) => el.id === id);

    // if (! tours.find((el) => el.id === id)){
    if (! tour){
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid id',
        });
    }

    res.status(200).json({
        status: 'success',
        data: {
            tour: tour,
        },
    });
}   

// Update Tour
exports.updateTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id*1;
    const tour = tours.find((el) => el.id === id);

    // if (! tours.find((el) => el.id === id)){
    if (! tour){
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid id',
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'Tour updated',
        data: {
            tour: 'Updated',
        },
    });
}   


// Delete Tour
exports.deleteTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id*1;
    const tour = tours.find((el) => el.id === id);

    // if (! tours.find((el) => el.id === id)){
    if (! tour){
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid id',
        });
    }

    res.status(200).json({
        status: 'success',
        message: 'Tour deleted',
        data: null,
    });
} 


// Adding new entry in the file 
exports.addTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body); //assigning and concatenating id object to the body object in the request
    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/../dev-data/data/tours-simple.json`, 
        JSON.stringify(tours),
        (err) => {
            if (err) {
                console.log(err);
            }
            else{
                res.status(201).json({
                    status: 'success',
                    data: {
                        tour: newTour,
                    },
                });
            }
        }
    );

};

