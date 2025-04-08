exports.get404 = (req, res) => {
    res.status(404).render('error', {
        pageTitle: 'Page Not Found',
        path: '/404'
    });
};