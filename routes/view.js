
/*
 * Show view page.
 */

exports.show = function(req, res){
  res.render('view/show', { title: 'Show View', view: req.params.view });
};