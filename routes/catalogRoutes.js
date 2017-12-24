var express = require('express');
var router = express.Router();

// Require controller modules
var airport_controller = require('../controllers/airportController');
var runway_controller = require('../controllers/runwayController');

/// airport ROUTES ///

/* GET catalog home page. */
router.get('/', airport_controller.index);

/* GET request for creating a airport. NOTE This must come before routes that display airport (uses id) */
router.get('/create', airport_controller.airport_create_get);

/* POST request for creating airport. */
router.post('/create', airport_controller.airport_create_post);
/* GET request for list of all airport items. */
router.get('/airportList', airport_controller.airport_list);

/* GET request for list of all runway items. out of line due to issues */
router.get('/runwayList', runway_controller.runway_list);

/* GET request to delete airport. */
router.get('/:id/delete', airport_controller.airport_delete_get);

// POST request to delete airport
router.post('/:id/delete', airport_controller.airport_delete_post);

/* GET request to update airport. */
router.get('/:id/update', airport_controller.airport_update_get);

// POST request to update airport
router.post('/:id/update', airport_controller.airport_update_post);

/* GET request for one airport. */
router.get('/:id', airport_controller.airport_detail);


/// runway ROUTES ///

/* GET request for creating runway. NOTE This must come before route for id (i.e. display runway) */
router.get('/runway/create', runway_controller.runway_create_get);

/* POST request for creating runway. */
router.post('/runway/create', runway_controller.runway_create_post);

/* GET request to delete runway. */
router.get('/runway/:id/delete', runway_controller.runway_delete_get);

// POST request to delete runway
router.post('/runway/:id/delete', runway_controller.runway_delete_post);

/* GET request to update runway. */
router.get('/runway/:id/update', runway_controller.runway_update_get);

// POST request to update runway
router.post('/runway/:id/update', runway_controller.runway_update_post);

/* GET request for one runway. */
router.get('/runway/:id', runway_controller.runway_detail);

/* GET request for list of all runways. */
router.get('/runways', runway_controller.runway_list);

module.exports = router;