define(['jquery', 'marionette', 'vent', 'navigate'], function($, Marionette, vent, navigate) {
    var Router = Marionette.AppRouter.extend({
      proxyRoute: function(action) {
        var args = $.makeArray(arguments).slice(1);
        require(['settings/controller'], function(controller) {

          // this doesn't really belong here but for the sake of demo...
          $('body').addClass('settings-theme');

          controller[action].apply(controller, args);
        });
      }
    });

    var router = new Router();

    // how do we clean this up? we don't want to write these 2 blocks for every single controller/action

    router.route('settings/facilities', 'settings:facilities', function() {
      router.proxyRoute('index');
    });

    vent.bind('navigate:settings:facilities:index', navigate('/settings/facilities', function() {
      router.proxyRoute('index');
    }), router);

    router.route('settings/facilities/:id', 'settings:facilities:id', function(id) {
      router.proxyRoute('edit', id);
    });

    vent.bind('navigate:settings:facilities:edit', navigate(
      function(id) { return '/settings/facilities/' + id; },
      function(id, apiLink) { router.proxyRoute('edit', id, apiLink); }), router);

    return router;
  }
);
