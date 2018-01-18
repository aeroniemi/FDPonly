var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ATCoTrainerSchema = new Schema(
    {
        icao: { type: String, required: true, max: 4 },
        deicing: { type: String, required: true, max: 30000 },
        lowVis: { type: String, required: true, max: 30000 },
        procedural: { type: String, required: true, max: 30000 },
        atis: { type: String, required: true, max: 30000 },
        parking: { type: String, required: true, max: 30000 },
        transponder: { type: String, required: true, max: 30000 },
        departure: { type: String, required: true, max: 30000 },
        arrival: { type: String, required: true, max: 30000 },
        night: { type: String, required: true, max: 30000 },
        noise: { type: String, required: true, max: 30000 },
        restrictions: { type: String, required: true, max: 30000 },
        terminalAssignments: { type: String, required: true, max: 30000 },
        approaches: { type: String, required: true, max: 30000 },
        rwyPreferences: { type: String, required: true, max: 30000 },

    }
);

//Export model
module.exports = mongoose.model('ATCoTrainerDB', ATCoTrainerSchema);
