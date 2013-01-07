define(['jquery', 'underscore', 'marionette', 'vent'],

function($, _, Marionette, vent) {
  var HomeLayout = Marionette.Layout.extend({
    template: '#root-home-template',
    className: 'container root-home',

    events: {
      'click .module-main-menu-link': 'onCompassClick'
    },

    onCompassClick: function(ev) {
      ev.preventDefault();
    }
  });

  return HomeLayout;
});
