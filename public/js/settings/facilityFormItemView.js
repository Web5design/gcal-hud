define(['jquery', 'underscore', 'marionette', 'vent'],

function($, _, Marionette, vent) {
  var FacilityFormItemView = Marionette.ItemView.extend({
    template: '#facility-form-template',
    className: 'frame container facility-form',

    events: {
      'click img': function() {
        vent.trigger('navigate:settings:facilities:index');
      },
      'click button': 'onSaveClick'
    },

    modelEvents: {
      'change': 'render'
    },

    onSaveClick: function(ev) {
      ev.preventDefault();

      $('body').addClass('busy');
      $('.busy-box').fadeIn(400).delay(400).fadeOut(200, function(){
        $('body').removeClass('busy');
        vent.trigger('navigate:settings:facilities:index');
      });
    }
  });

  return FacilityFormItemView;
});
