exports.index = function(req, res){
  res.render('index', { title: 'Home' });
};

exports.hud = function(req, res){
  res.render('hud', { title: 'HUD' });
};