const Rental = require('../models/rental');
const Customer = require('../models/customer');
const Movie = require('../models/movie');

exports.getNewRental = async (req, res) => {
    try {
        const customers = await Customer.findAll();
        const movies = await Movie.findAll();
        
        res.render('rentals/new', {
            pageTitle: 'New Rental',
            path: '/newRental',
            customers,
            movies
        });
    } catch (err) {
        console.log(err);
    }
};

exports.postNewRental = async (req, res) => {
    try {
        await Rental.create({
            customerId: req.body.customerId,
            movieId: req.body.movieId
        });
        res.redirect('/customers');
    } catch (err) {
        console.log(err);
        res.redirect('/newRental');
    }
};