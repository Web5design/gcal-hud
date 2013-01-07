/*global $*/
define(
  ['jquery', 'marionette', 'root/appStateModel'],
  function($, Marionette, AppStateModel){
    "use strict";

    var app = new Marionette.Application();
    app.appState = new AppStateModel();
    return app;
  }
);
