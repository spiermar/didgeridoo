/*
 * GET new beacon.
 */

exports.get = function(req, res){
  console.log( require('util').inspect( req.query ) );
  res.send("OK");
};