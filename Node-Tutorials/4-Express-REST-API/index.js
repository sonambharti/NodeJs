const fs = require('fs');
const express = require('express');
app = express();
app.use(express.json()); // middleware to make use of json features in the app using express


const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
console.log(tours);


// Getting all the entries present in the tour package
app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours,
        },
    });
})


// Getting a tour entry via it's id
app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id*1;
    
    // if (id > tours.length - 1){
    //     return res.status(400).json({
    //         status: 'fail',
    //         message: 'Invalid id',
    //     });
    // }
    
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
})


// Adding new entry in the file 
app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.length - 1].id + 1
    const newTour = Object.assign({id: newId}, req.body); //assigning and concatenating id object to the body object in the request
    tours.push(newTour);

    fs.writeFile(
        `${__dirname}/dev-data/data/tours-simple.json`, 
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

});

// Update Tour
app.patch('/api/v1/tours/:id', (req, res) => {
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
            tour: tour,
        },
    });
})  


// Delete Tour
app.delete('/api/v1/tours/:id', (req, res) => {
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
})

port = 8000
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})