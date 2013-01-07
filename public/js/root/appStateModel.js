define(['jquery', 'backbone'], function($, Backbone) {
  var AppStateModel = Backbone.Model.extend({
    apiRoot: 'http://dev.pyxisweb.com/api',
    loggedIn: false,
    currentModule: ''
  });
  return AppStateModel;
});