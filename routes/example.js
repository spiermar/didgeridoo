/*
 * GET boomerang example.
 */

exports.get = function(req, res){
  res.render('example', { remoteAddress: req.connection.remoteAddress });
};