define(['jquery', 'underscore'], function($, _) {
  var NavigationView = function(container){
    this.$el = container;
    this.subViews = [];

    /*
     * Pushes a new view on to the view stack. Makes the given view visible.
     * @param {object} view: View to push onto the stack
     * @param {boolean} clearStack: (optional) True to indicates whether to start a new stack or
     *    push the view onto the stack.
     */
    this.pushView = function(view, clearStack) {
      var currentView = _.last(this.subViews);

      if (clearStack){
        this.subViews.length = 0;
        _.each(this.subViews, function(view) {
          view.close();
        });
        this.$el.empty();
      }

      view.render();
      this.$el.append(view.el);
      this.subViews.push(view);

      if (currentView) {
        var margin = -1 * currentView.$el.width();
        currentView.$el.animate({ 'margin-left': margin + 'px'}, 400);
      }
    };

    /*
     * Pops a view from the list. If there is nothing to pop, returns false.
     * @return: False if nothing was popped from the stack
     */
    this.popView = function() {
      var self, currentView, nextView;
      self = this;

      if(this.subViews.length <= 1) {
        // there's nothing else to pop. don't pop.
        return false;
      }

      currentView = this.subViews.pop();
      nextView = _.last(this.subViews);

      nextView.$el.animate({ 'margin-left': '0px'}, 400, function() {
        currentView.close();

        if(nextView.onReappear)
          nextView.onReappear();

      });
    };

    this.close = function() {
      _.each(this.subViews, function(view) {
        view.close();
      });
    };
  };

  return NavigationView;
});
