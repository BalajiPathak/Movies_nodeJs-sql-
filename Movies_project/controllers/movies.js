const Movie = require('../models/movie');
const Genre = require('../models/genre');

exports.getMovies = (req, res) => {
    Movie.findAll({
        include: [Genre]
    })
    .then(movies => {
        res.render('movies/index', {
            pageTitle: 'Movies',
            path: '/movies',
            movies: movies
        });
    })
    .catch(err => console.log(err));
};

exports.getNewMovie = (req, res) => {
    Genre.findAll()
        .then(genres => {
            res.render('movies/new', {
                pageTitle: 'New Movie',
                path: '/movies/new',
                genres: genres
            });
        })
        .catch(err => console.log(err));
};

exports.postNewMovie = (req, res) => {
    const { name, genreId } = req.body;
    Movie.create({
        name: name,
        genreId: genreId
    })
    .then(result => {
        res.redirect('/movies');
    })
    .catch(err => console.log(err));
};

exports.deleteMovie = (req, res) => {
    const movieId = req.params.movieId;
    Movie.destroy({
        where: {
            id: movieId
        }
    })
    .then(() => {
        res.redirect('/movies');
    })
    .catch(err => console.log(err));
};