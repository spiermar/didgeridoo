/*
 * GET new beacon.
 */

var config = require('../config');
var nano = require('nano')(config.db);

exports.get = function(req, res){
	var db = nano.use(req.params['view']);
	db.insert(req.query, function(err, body, header) {
		if (err) {
			console.log('[db.insert] ', err.message);
			return;
		}
		console.log(body);
    });
	res.send();
};