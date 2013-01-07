require.config({
  paths: {
    jquery: 'vendor/jquery',
    underscore: 'vendor/underscore',
    backbone: 'vendor/backbone',
    bootstrap: 'vendor/bootstrap',
    eventbinder: 'vendor/backbone.eventbinder',
    wreqr: 'vendor/backbone.wreqr',
    marionette: 'vendor/backbone.marionette'
  },
  shim: {
    'jquery': { exports: '$' },
    'bootstrap': ['jquery'],
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone',
      init: function($, _) {
        _.templateSettings = {
          interpolate: /\{\{=(.+?)\}\}/g,
          evaluate: /\{\{(.+?)\}\}/g
        };
        return Backbone;
      }
    },
    'eventbinder': ['backbone'],
    'wreqr': ['eventbinder'],
    'marionette': ['wreqr']
  }
});

require([
  'jquery',
  'app',
  'api',
  'backbone',
  'routers/rootRouter',
  'routers/formularyRouter',
  'routers/settingsRouter',
  'root/userToolsLayout',
  'customRegions'],
  function($, app, api, Backbone, rootRouter, formularyRouter, settingsRouter, UserToolsLayout, CustomRegions) {

    app.addRegions({
      userToolsRegion: '.user-tools',
      mainRegion: CustomRegions.FadeRegion.extend({el: '.main-region'}),
      menuRegion: CustomRegions.FadeRegion.extend({el: '.menu-region'})
    });

    $(document).ready(function() {
      app.start();
    });

    app.addInitializer(function() {
      Backbone.history.start({pushState: true});
      app.userToolsRegion.show(new UserToolsLayout({
        model: app.appState,
        collection: new Backbone.Collection([{text: 'This is an example of a notification.'}])
      }));
    });
  }
);
