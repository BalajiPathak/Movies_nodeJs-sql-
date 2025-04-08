const express = require('express');
const router = express.Router();
const rentalsController = require('../controllers/rentals');

router.get('/newRental', rentalsController.getNewRental);
router.post('/newRental', rentalsController.postNewRental);

module.exports = router;