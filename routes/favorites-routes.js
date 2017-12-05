let db = require('../models');

module.exports = function(app) {
    // gets all da Artists on the menu
    app.get('/favorites', (req, res) => {
        db.Artist.findAll().then(artists => {
            db.Selection.findAll({
                'where': {
                    'selected': 0
                },
                'include': [ db.Artist ]
            }).then(selections => {
                res.render('favorites-page', { artists, selections });
            });
        });
    });

    // posts a new artist to selections
    app.post('/selection/:artistId', (req, res) => {
        db.Selection.create({
            'selected': 0,
            'ArtistId': req.params.artistId
        }).then(() => res.redirect('/favorites'));
    });

    // posts a new artist to the menu
    app.post('/new', (req, res) => {
        db.Artist.create(req.body).then(() => res.redirect('/favorites'));
    });

    // removes a artist from the favorites panel - OR - removes a artist from the selection
    app.delete('/:table/:id', function(req, res) {
        let table = req.params.table;

        if (table === 'selections') {
            db.Selection.destroy({
                'where': {
                    'id': req.params.id
                }
            }).then(() => res.redirect('/playlist'));
        } else if (table === 'artists') {
            db.Artist.destroy({
                'where': {
                    'id': req.params.id
                }
            }).then(() => res.redirect('/favorites'));
        }
    });
}
