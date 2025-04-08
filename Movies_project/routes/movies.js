const express = require('express');
const router = express.Router();
const moviesController = require('../controllers/movies');

router.get('/', moviesController.getMovies);
router.get('/new', moviesController.getNewMovie);
router.post('/', moviesController.postNewMovie);
router.post('/delete/:movieId', moviesController.deleteMovie);

module.exports = router;