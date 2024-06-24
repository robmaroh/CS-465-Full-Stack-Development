const express = require('express'); // Express app
const router = express.Router();    // Router logic
const jwt = require('express-jwt');
const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

// This is where we import the controllers we will route
const authController = require('..k/controllers/authentication');
const tripsController = require('../controllers/trips');

// Define route for our login endpoint
router
    .route('/login')
    .post(authController.login);

// Define route for our register endpoint
router
    .route('/register')
    .post(authController.register);    
   
// Define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.getAlltrips)
    .post(auth, tripsController.tripsAddTrip);

// GET Method routes tripsFindByCode - requires parameter
// PUT Method routes tripsUpdateTrip - requires parameter
router
    .route('/trips/:tripCode')    
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

module.exports = router;