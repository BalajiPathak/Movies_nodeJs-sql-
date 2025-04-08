const Customer = require('../models/customer');
const MembershipType = require('../models/membershipType');

exports.getCustomers = (req, res) => {
    Customer.findAll({
        include: [MembershipType]
    })
    .then(customers => {
        res.render('customers/index', {
            pageTitle: 'Customers',
            path: '/customers',
            customers: customers
        });
    })
    .catch(err => console.log(err));
};

exports.getNewCustomer = (req, res) => {
    MembershipType.findAll()
        .then(membershipTypes => {
            res.render('customers/new', {
                pageTitle: 'New Customer',
                path: '/customers/new',
                membershipTypes: membershipTypes,
                errorMessage: null
            });
        })
        .catch(err => console.log(err));
};

exports.postNewCustomer = (req, res) => {
    const { name, membershipTypeId, dateOfBirth } = req.body;
    const isSubscribedToNewsletter = req.body.isSubscribedToNewsletter === 'on';

    let age = 0;  
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    age = today.getFullYear() - birthDate.getFullYear();  
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18) {
        MembershipType.findAll()
            .then(membershipTypes => {
                res.render('customers/new', {
                    pageTitle: 'New Customer',
                    path: '/customers/new',
                    membershipTypes: membershipTypes,
                    errorMessage: 'Customer must be 18 years or older'
                });
            });
        return;
    }

    Customer.create({
        name: name,
        membershipTypeId: membershipTypeId,
        dateOfBirth: dateOfBirth,
        isSubscribedToNewsletter: isSubscribedToNewsletter
    })
    .then(result => {
        res.redirect('/customers');
    })
    .catch(err => console.log(err));
};

exports.deleteCustomer = (req, res) => {
    const customerId = req.params.customerId;
    Customer.destroy({
        where: {
            id: customerId
        }
    })
    .then(() => {
        res.redirect('/customers');
    })
    .catch(err => console.log(err));
};