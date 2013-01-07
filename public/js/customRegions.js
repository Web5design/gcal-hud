
define(['jquery', 'marionette'], function($, Marionette) {
  var CustomRegions = {
    FadeRegion: Marionette.Region.extend({
      open: function(view){
        var that = this;
        this.$el.html(view.$el.hide());
        view.$el.fadeIn(500);
      }
    }),

    SlideRegion: Marionette.Region.extend({
      open: function(view){
        var that = this;
        this.$el.html(view.$el.hide());
        view.$el.slideToggle(200);
      }
    })
  };

  return CustomRegions;
});