define(['jquery', 'underscore', 'marionette', 'vent', 'navigationView'],

function($, _, Marionette, vent, NavigationView) {
  var HomeLayout = Marionette.Layout.extend({
    template: '#settings-home-template',
    className: 'container settings-home',

    events: {
      'click .module-main-menu-link': 'onCompassClick'
    },

    onRender: function() {
      this.navigationView = new NavigationView(this.$el.find('.frames'));
    },

    onClose: function() {
      this.navigationView.close();
    },

    onCompassClick: function(ev) {
      ev.preventDefault();
      vent.trigger($(ev.currentTarget).data('eventName'));
    }

  });

  return HomeLayout;
});
