const fs = require('fs');
const express = require('express');
const morgan = require('morgan');
app = express();
app.use(express.json()); // middleware to make use of json features in the app using express
app.use(morgan('dev')); // morgan is a middleware, used to log in different available environments
/**
 * morgan('dev') => GET /api/v1/tours/1 200 9.673 ms - 1068 => {method route statusCode timeTOExecute Process_id}
 * morgan('short') => ::ffff:127.0.0.1 - GET /api/v1/tours/1 HTTP/1.1 200 1068 - 10.391 ms
 * morgan('combined') => ::ffff:127.0.0.1 - - [20/Oct/2024:16:43:22 +0000] "GET /api/v1/tours/1 HTTP/1.1" 200 1068 "-" "PostmanRuntime/7.41.0"
 * morgan('tiny') => GET /api/v1/tours/1 200 1068 - 10.049 ms
 *  morgan('common') => ::ffff:127.0.0.1 - - [20/Oct/2024:16:46:38 +0000] "GET /api/v1/tours/1 HTTP/1.1" 200 1068
 */
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
// console.log(tours);

// app.use((req, res, next) => {
//     console.log("In Middleware ⚠️");
//     next();
// });

app.use((req, res, next) => {
    console.log("In Middleware ⚠️");
    req.requestedAt = new Date().toISOString();
    next();
});

// Getting all the entries present in the tour package
const getAllTour =  (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        data: {
            tours: tours,
        },
    });
}



// Getting a tour entry via it's id
const getTour = (req, res) => {
    // console.log(req.params);
    console.log(req.requestedAt);
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
}   

// Update Tour
const updateTour = (req, res) => {
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
const deleteTour = (req, res) => {
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
const addTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
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

};



// refactoring code to maintain the code
// app.post('/api/v1/tours', addTour);
// app.get('/api/v1/tours', getAllTour)
// app.get('/api/v1/tours/:id', getTour)/

// setting priorities for same route
app.route('/api/v1/tours').get(getAllTour).post(addTour);

// This will only executes whencode in line 147 will be executed...
app.use((req, res, next) => {
    console.log("In Middleware 2 ⚠️⚠️");
    next();
});

app.route('/api/v1/tours/:id').get(getTour).patch(updateTour).delete(deleteTour)

port = 8000
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})