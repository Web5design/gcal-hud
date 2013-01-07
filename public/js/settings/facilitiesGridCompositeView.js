define(['jquery', 'underscore', 'marionette', 'vent', 'navigationView'],

function($, _, Marionette, vent, NavigationView, api) {
  var FacilitiesGridRowItemView = Marionette.ItemView.extend({
    template: '#facilities-results-grid-row-template',
    tagName: 'tr',

    events: {
      'click': 'onRowClick'
    },

    onRowClick: function() {
      var selfLink = _.find(this.model.get('_actions'), function(a) { return a === 'facility'; });
      if (selfLink) {
        vent.trigger('navigate:settings:facilities:edit', this.model.get('id'));
      }
    }
  });

  var FacilitiesGridCompositeView = Marionette.CompositeView.extend({
    template: '#facilities-results-grid-template',
    className: 'frame container results-frame',
    itemView: FacilitiesGridRowItemView,

    appendHtml: function(collectionView, itemView){
      collectionView.$('tbody').append(itemView.el);
    }
  });

  return FacilitiesGridCompositeView;
});
