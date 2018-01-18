var Airport = require('../models/airportAct');
var Runway = require('../models/runwayAct');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


// Display list of all runways
exports.runway_list = function (req, res, next) {

    Runway.find({}, 'icao name1 name2')
        .exec(function (err, list_runways) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('runway_listZX', { runway_list: list_runways });
        });

};

// Display detail page for a specific runway
exports.runway_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: runway detail: ' + req.params.id);
};

// Display runway create form on GET
exports.runway_create_get = function (req, res, next) {
    res.render('runway_formZX', { title: 'Create Runway' });
};

// Handle runway create on POST
exports.runway_create_post = [

    body("icao", "Check your ICAO code").trim().matches(/^[A-Z]{4}$/i),
    body('type').isLength({ min: 1, max: 1 }).trim().withMessage('Airport type must be specified.')
        .isNumeric().withMessage('Incorrect code'),
    body('heading1').isLength({ min: 3, max: 3 }).trim().withMessage('Leading zeros are required')
        .isNumeric().withMessage('Remember not to include any units'),
    body('heading2').isLength({ min: 3, max: 3 }).trim().withMessage('Leading zeros are required')
        .isNumeric().withMessage('Remember not to include any units'),
    body('name1').isLength({ min: 2, max: 3 }).trim().withMessage('Runway name needs to be 1-3 chars long. ensure leading zero is included')
        .isAlphanumeric().withMessage('Airport name has non-alpha characters.'),
    body('name2').isLength({ min: 2, max: 3 }).trim().withMessage('Runway name needs to be 1-3 chars long. ensure leading zero is included')
        .isAlphanumeric().withMessage('Airport name has non-alpha characters.'),
    body("lat", "Check your latitude").trim().matches(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)/),
    body("lon", "Check your longitude").trim().matches(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)/),
    body("length", "Check your length").trim().matches(/^([1-9][0-9]{0,4})$/),
    body("width", "Check your runway width is in metres").trim().matches(/^([1-9][0-9]{0,1})$/),
    sanitizeBody('icao').trim().escape(),
    sanitizeBody('type').trim().escape(),
    sanitizeBody('heading1').trim().escape(),
    sanitizeBody('heading2').trim().escape(),
    sanitizeBody('name1').trim().escape(),
    sanitizeBody('name2').trim().escape(),
    sanitizeBody('lat').trim().escape(),
    sanitizeBody('lon').trim().escape(),
    sanitizeBody('length').trim().escape(),
    sanitizeBody('width').trim().escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {
        //console.log(req.body);
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        var icaoMX = req.body.icao.toUpperCase();
        // Create a genre object with escaped and trimmed data.
        var runway = new Runway({
            icao: icaoMX,
            type: req.body.type,
            name1: req.body.name1,
            name2: req.body.name2,
            lat: req.body.lat,
            lon: req.body.lon,
            length: req.body.length,
            width: req.body.width
        });


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('runway_formZX', { title: 'Create Runway', icao: icaoMX, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            Runway.findOne({ 'icao': icaoMX, 'name1': req.body.name1 })
                .exec(function (err, found_runway) {
                    console.log(found_runway)
                    if (err) { return next(err); }

                    if (found_runway) {
                        //Genre exists, redirect to its detail page
                        var url = "/airports/" + found_runway.icao;
                        res.redirect(url);
                    } else {
                        runway.save(function (err) {
                            if (err) { return next(err); }
                            // Successful - redirect to new author record.
                            res.redirect("/airports/" + icaoMX);
                        });

                    }

                });
        }
    }
];

// Display runway delete form on GET
exports.runway_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: runway delete GET');
};

// Handle runway delete on POST
exports.runway_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: runway delete POST');
};

// Display runway update form on GET
exports.runway_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: runway update GET');
};

// Handle runway update on POST
exports.runway_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: runway update POST');
};




