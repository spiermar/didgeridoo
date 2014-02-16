/*
 * GET new beacon.
 */

// Load configurations
// Set the node enviornment variable if not set before
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('../config/config');

var Queue, app, nano, queue, _;

_ = require('underscore');

nano = require('nano')(config.db.url);

Queue = (function() {
	function Queue() {
		_.bindAll(this, 'flush');
		this.docs = [];
		this.db = nano.use(config.db.name);
		setInterval(this.flush, 30000);
	}

	Queue.prototype.push = function(doc) {
		return this.docs.push(doc);
	};

	Queue.prototype.flush = function() {
		if (this.docs && this.docs.length) {
			this.db.bulk({ docs: this.docs }, function(err, body, header) {
				if (err) {
					console.log('[flush] ', err.message);
					return this.docs;
				}
			});
			return this.docs = [];
		}
	};

	return Queue;
})();

queue = new Queue();

exports.get = function(req, res){
	res.header('Cache-Control', 'private, no-cache, proxy-revalidate');
	res.set('Content-Type', 'image/gif');
	res.send();
	var ua = req.headers['user-agent'];
	var r = require('ua-parser').parse(ua);
	var doc = { 'timestamp': new Date().getTime(), 
				'view': req.params.view, 
				'ip': req.connection.remoteAddress, 
				'ua': { 'family': r.ua.family, 'major': r.ua.major, 'minor': r.ua.minor, 'patch': r.ua.patch },
				'os': { 'family': r.os.family, 'major': r.os.major, 'minor': r.os.minor, 'patch': r.os.patch },
				'device': { 'family': r.device.family },
				'boomerang': req.query }
	queue.push(doc);
	return;
};

