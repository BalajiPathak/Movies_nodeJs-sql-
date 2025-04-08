const express = require('express');
const router = express.Router();
const customersController = require('../controllers/customers');

router.get('/', customersController.getCustomers);
router.get('/new', customersController.getNewCustomer);
router.post('/', customersController.postNewCustomer);
router.post('/delete/:customerId', customersController.deleteCustomer);

module.exports = router;