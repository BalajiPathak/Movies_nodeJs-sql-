const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./utils/database');
const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customers');
const movieRoutes = require('./routes/movies');
const Customer = require('./models/customer');
const MembershipType = require('./models/membershipType');
const errorController = require('./controllers/error');
const Genre = require('./models/genre');
const Movie = require('./models/movie');
const rentalRoutes = require('./routes/rentals');
const Rental = require('./models/rental');  

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoutes);
app.use('/customers', customerRoutes);
app.use('/movies', movieRoutes);
app.use(rentalRoutes);

app.use(errorController.get404);

sequelize
    .sync()
    .then(result => {
        return Genre.findAll();
    })
    .then(genres => {
        if (genres.length === 0) {
            return Genre.bulkCreate([
                { name: 'Action' },
                { name: 'Comedy' },
                { name: 'Family' },
                { name: 'Thriller' },
                { name: 'Romance' }
            ]);
        }
        return genres;
    })
    .then(() => {
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(err => {
        console.log(err);
    });

Customer.belongsTo(MembershipType);
MembershipType.hasMany(Customer);

Movie.belongsTo(Genre);
Genre.hasMany(Movie);

Customer.hasMany(Rental);
Rental.belongsTo(Customer);
Movie.hasMany(Rental);
Rental.belongsTo(Movie);