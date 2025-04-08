const sequelize = require('../utils/database');

exports.getLogin = (req, res) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        errorMessage: null
    });
};

exports.postLogin = (req, res) => {
    const { email, password } = req.body;

    sequelize.query(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        {
            replacements: [email, password],
            type: sequelize.QueryTypes.SELECT
        }
    )
    .then(users => {
        if (users.length > 0) {
            res.redirect('/customers');
        } else {
            res.render('auth/login', {
                pageTitle: 'Login',
                path: '/login',
                errorMessage: 'Invalid email or password'
            });
        }
    })
    .catch(err => {
        console.log(err);
        res.redirect('/');
    });
};