define(['app', 'vent', 'backbone', 'root/mainMenuItemView', 'root/homeLayout', 'navigate'],
  function(app, vent, Backbone, MainMenuItemView, HomeLayout, navigate) {
    
    var controller = {
      index: function() {
        console.log('RootController#index');

        // this isn't supposed to be here but for the sake of demo...
        $('body').removeClass();

        app.appState.set({currentModule: ''});
        app.menuRegion.show(new MainMenuItemView({ model: app.appState }));
        app.mainRegion.show(new HomeLayout());
      },

      compass: function() {
        console.log('RootController#compass:' + app.appState.get('currentModule'));

        var menuView = new MainMenuItemView({ model: app.appState });
        app.menuRegion.show(menuView);
      },

      escape: function() {
        app.menuRegion.close();
      }
    };

    vent.bind('navigate:root:index', navigate('', controller.index), controller);
    vent.bind('modal:mainMenu:hide', controller.escape, controller);
    vent.bind('modal:mainMenu', controller.compass, controller);

    return controller;
  }
);
