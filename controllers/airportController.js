var Airport = require('../models/airportAct');
var Runway = require('../models/runwayAct');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');
var async = require('async');

exports.index = function (req, res) {

    async.parallel({
        runway_count: function (callback) {
            Runway.count(callback);
        },
        airport_count: function (callback) {
            Airport.count(callback);
        },
    }, function (err, results) {
        res.render('homeZX', { error: err, data: results });
    });
};
// Display list of all airports
// Display list of all Books
exports.airport_list = function (req, res, next) {

    Airport.find({}, 'icao city name')
        .sort([['icao', 'ascending']])
        .exec(function (err, list_airports) {
            if (err) { return next(err); }
            //Successful, so render
            res.render('airport_listZX', { airport_list: list_airports });
        });

};
// Display detail page for a specific airport
exports.airport_detail = function (req, res, next) {
    var icao = req.params.id.toUpperCase();
    async.parallel({
        airportMS: function (callback) {

            Airport.find({ 'icao': icao })
                .exec(callback)
        },

        airport_runways: function (callback) {
            Runway.find({ 'icao': icao })
                .exec(callback);
        },

    }, function (err, results) {
        if (err) { return next(err); }
        if (results.airportMS == null) { // No results.
            var err = new Error('Airport not found');
            err.status = 404;
            return next(err);
        }
        console.log(results)
        // Successful, so render
        res.render('airport_detailZX', { airport: results.airportMS[0], airport_runways: results.airport_runways });
    });

};

// Display airport create form on GET
exports.airport_create_get = function (req, res, next) {
    res.render('airport_formZX', { title: 'Create Airport' });
};


// Handle airport create on POST
exports.airport_create_post = [
    body('icao').isLength({ min: 4, max: 4 }).trim().withMessage('ICAO code must be specified.')
        .isAlpha().withMessage('ICAO code has non-alpha characters.'),
    body('type').isLength({ min: 1, max: 1 }).trim().withMessage('Airport type must be specified.')
        .isNumeric().withMessage('Incorrect code'),
    body('name').isLength({ min: 2, max: 100 }).trim().withMessage('Check your length'),
    body('lat').isLength({ min: 1, max: 12 }).trim().withMessage('Woah, we only need max 10 decimal places!')
        .isNumeric().withMessage('Ensure decimal degree is used'),
    body('lon').isLength({ min: 1, max: 12 }).trim().withMessage('Woah, we only need max 10 decimal places!')
        .isNumeric().withMessage('Ensure decimal degree is used'),
    body('iata').isLength({ max: 3 }).trim().withMessage('IATA code are only 3 letters long.'),
    //.isAlpha().withMessage('IATA code has non-alpha characters.'),
    body('faa').isLength({ max: 3 }).trim().withMessage('FAA codes are only 3 letters long.'),
    //.isAlpha().withMessage('FAA code has non-alpha characters.'),
    body('ele').isLength({ min: 1, max: 6 }).trim().withMessage('That airport is at a strange elevation! check units are feet (ft)')
        .isNumeric().withMessage('Remember not to include any units'),
    sanitizeBody('icao').trim().escape(),
    sanitizeBody('type').trim().escape(),
    sanitizeBody('ele').trim().escape(),
    sanitizeBody('variation').trim().escape(),
    sanitizeBody('iata').trim().escape(),
    sanitizeBody('faa').trim().escape(),
    sanitizeBody('city').trim().escape(),
    sanitizeBody('name').trim().escape(),
    sanitizeBody('lat').trim().escape(),
    sanitizeBody('lon').trim().escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {
        //console.log(req.body);
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        var icaoMX = req.body.icao.toUpperCase();
        // Create a genre object with escaped and trimmed data.
        var airport = new Airport({
            icao: icaoMX,
            type: req.body.type,
            ele: req.body.ele,
            variation: req.body.variation,
            faa: req.body.faa,
            city: req.body.city,
            name: req.body.name,
            lat: req.body.lat,
            lon: req.body.lon
        });


        if (!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            res.render('airport_formZX', { title: 'Create Airport', icao: icaoMX, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.
            // Check if Genre with same name already exists.
            Airport.findOne({ 'icao': icaoMX })
                .exec(function (err, found_airport) {
                    //console.log(found_airport)
                    if (err) { return next(err); }

                    if (found_airport) {
                        //Genre exists, redirect to its detail page
                        var url = "/airports/" + found_airport.icao;
                        res.redirect(url);
                    } else {
                        airport.save(function (err) {
                            if (err) { return next(err); }
                            // Successful - redirect to new author record.
                            res.redirect("/airports/" + icaoMX);
                        });

                    }

                });
        }
    }
];


// Display airport delete form on GET
exports.airport_delete_get = function (req, res) {
    res.send('NOT IMPLEMENTED: airport delete GET');
};

// Handle airport delete on POST
exports.airport_delete_post = function (req, res) {
    res.send('NOT IMPLEMENTED: airport delete POST');
};

// Display airport update form on GET
exports.airport_update_get = function (req, res) {
    res.send('NOT IMPLEMENTED: airport update GET');
};

// Handle airport update on POST
exports.airport_update_post = function (req, res) {
    res.send('NOT IMPLEMENTED: airport update POST');
};