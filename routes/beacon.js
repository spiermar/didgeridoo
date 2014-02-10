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
	var ua = req.headers['user-agent'];
	var r = require('ua-parser').parse(ua);
	db.insert({ 'timestamp': new Date().getTime(), 
				'view': req.params.view, 
				'ip': req.connection.remoteAddress, 
				'ua': { 'family': r.ua.family, 'major': r.ua.major, 'minor': r.ua.minor, 'patch': r.ua.patch },
				'os': { 'family': r.os.family, 'major': r.os.major, 'minor': r.os.minor, 'patch': r.os.patch },
				'device': { 'family': r.device.family },
				'boomerang': req.query }, function(err, body, header) {
		if (err) {
			console.log('[db.insert] ', err.message);
			return;
		}
	});
	res.send();
};