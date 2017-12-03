let db = require('../models');

module.exports = function(app) {

    // get all artists from your selection - both selected and not selected
    app.get('/playlist', (req, res) => {
        // first findAll gets all artists from selection that are NOT selected
        db.Selection.findAll({
            'where': {
                'selected': 0
            },
            // include the Artist model that is associated with each Selection
            'include': [ db.Artist ]
        }).then(notSelected => {
            // second findAll gets all artists from selection that ARE selected
            db.Selection.findAll({
                'where': {
                    'selected': 1,
                },
                'include': [ db.Artist ]
            }).then(selected => res.render('playlist', { notSelected, selected }));
        });
    });

    // update a artist from your selection (devour a artist)
    app.put('/playlist/:selectionId?', (req, res) => {
        let selectionId = req.params.selectionId;

        db.Selection.update({
            'selected': 1
        }, {
            'where': {
                'id': selectionId
            }
        }).then(updates => {
            res.redirect('/playlist');
        });
    });
}
