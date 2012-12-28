var controller = require('../controllers/home');

exports.route = function(app) {
  app.get('/', controller.index);
  app.get('/settings', controller.index);
};