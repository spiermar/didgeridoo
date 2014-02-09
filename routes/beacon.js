/*
 * GET new beacon.
 */

// Load configurations
// Set the node enviornment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('../config/config');

var nano = require('nano')(config.db.url);
var db = nano.use(config.db.name);

exports.get = function(req, res){
	
	db.insert(req.query, function(err, body, header) {
		if (err) {
			console.log('[db.insert] ', err.message);
			return;
		}
    });
	res.send();
};