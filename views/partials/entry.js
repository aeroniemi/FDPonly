const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
app.post('/:icao/entry', genre_controller.genre_create_post);

var formValiator = function () {

    body('name', 'Genre name required').isLength({ min: 1 }).trim(),

        // Sanitize (trim and escape) the name field.
        sanitizeBody('name').trim().escape(),

        // Process request after validation and sanitization.
        (req, res, next) => {

            // Extract the validation errors from a request.
            const errors = validationResult(req);

            // Create a genre object with escaped and trimmed data.
            var genre = new Genre(
                { name: req.body.name }
            );


            if (!errors.isEmpty()) {
                // There are errors. Render the form again with sanitized values/error messages.
                res.render('genre_form', { title: 'Create Genre', genre: genre, errors: errors.array() });
                return;
            }
            else {
                // Data from form is valid.
                // Check if Genre with same name already exists.
                Genre.findOne({ 'name': req.body.name })
                    .exec(function (err, found_genre) {
                        if (err) { return next(err); }

                        if (found_genre) {
                            //Genre exists, redirect to its detail page
                            res.redirect(found_genre.url);
                        }
                        else {

                            genre.save(function (err) {
                                if (err) { return next(err); }
                                //Genre saved. Redirect to genre detail page
                                res.redirect(genre.url);
                            });

                        }

                    });
            }
        }
}
