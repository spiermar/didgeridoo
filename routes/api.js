// Load configurations
// Set the node enviornment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('../config/config');
var nano = require('nano')(config.db.url);
var db = nano.use(config.db.name);

/*
 * GET t_done view.
 */
exports.t_done = function(req, res) {
	db.view('t_done', 'byDate', { group: true }, function(err, body) {
		var t_done = [];
  		if (!err) {
			body.rows.forEach( function(doc) {
				t_done.push([Date.UTC(doc.key[0],doc.key[1],doc.key[2],doc.key[3]), Math.round(doc.value.sum/doc.value.count)]);
			});
		}
		res.header('Access-Control-Allow-Origin', '*');
		res.send(t_done);
	});
};