define(['marionette', 'root/controller'],function(Marionette, controller) {
  var Router = Marionette.AppRouter.extend({
    appRoutes:{
      '': 'index'
    }
  });

  return new Router({ controller: controller });

});
