define(['backbone', 'underscore'],
  function(Backbone, _) {

    /*
     * Curries the call through to the controller action, passing arguments through
     * Navigates to the given url first.
     */
    return function(url, action) {
      return function() {
        var navigateUrl = _.isFunction(url) ? url.apply(this, arguments) : url;
        Backbone.history.navigate(navigateUrl);
        action.apply(this, arguments);
      };
    };
  }
);