/* 
Routing script for airport pages
2017; last clean 2018 01 12
*/
//Modules from NPM
var express = require('express');

//Local Modules
var airport_controller = require('../controllers/airportController');
var runway_controller = require('../controllers/runwayController');
var config = require('../config.js');
var localConfig = require('../localConfig.js');
//Routing controllers
var router = express.Router();

/*
Document routes
*/
//GET home
router.get('/', airport_controller.index);
if (config.form == true) {
    //GET create airport
    router.get('/create', airport_controller.airport_create_get);
    //PST create airport
    router.post('/create', airport_controller.airport_create_post);
}
//GET list airport
router.get('/airportList', airport_controller.airport_list);
//GET list runway
router.get('/runwayList', runway_controller.runway_list);
/* NI
//GET delete airport
router.get('/:id/delete', airport_controller.airport_delete_get);
//PST delete airport
router.post('/:id/delete', airport_controller.airport_delete_post);
*/
/* NI
//GET update airport
router.get('/:id/update', airport_controller.airport_update_get);
//PST update airport
router.post('/:id/update', airport_controller.airport_update_post);
*/
//GET detail airport page
router.get('/:id', airport_controller.airport_detail);

/// runway ROUTES ///
if (config.form == true) {
    //GET create runway
    router.get('/runway/create', runway_controller.runway_create_get);
    //PST create runway
    router.post('/runway/create', runway_controller.runway_create_post);
}
/* NI
//GET delete runway
router.get('/runway/:id/delete', runway_controller.runway_delete_get);
//PST delete runway
router.post('/runway/:id/delete', runway_controller.runway_delete_post);
*/

/* NI
//GET update runway
router.get('/runway/:id/update', runway_controller.runway_update_get);
//PST update runway
router.post('/runway/:id/update', runway_controller.runway_update_post);
*/

//GET detail runway page
router.get('/runway/:id', runway_controller.runway_detail);

//Express export routes
module.exports = router;
