
/*
 * GET t_done view.
 */

// Load configurations
// Set the node enviornment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('../config/config');
var nano = require('nano')(config.db.url);
var db = nano.use(config.db.name);

exports.get = function(req, res) {
	db.view('t_done', 'byDate', { group: true }, function(err, body) {
		var t_done = [];
  		if (!err) {
			body.rows.forEach( function(doc) {
				t_done.push([doc.key, doc.value.sum / doc.value.count]);
			});
		}
		res.send(t_done);
	});
};