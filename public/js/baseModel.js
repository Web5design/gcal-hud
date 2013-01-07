define(['api', 'backbone'], function(api, Backbone) {

  var BaseModel = Backbone.Model.extend({

    isProxy: false,
    rels: undefined,

    parse: function(response) {
      if (response.body) {
        // Not a Collection-element
        this.isProxy = true;
        this.rels = response.meta.rels;
        return response.body[0];
      }

      return response;
    },

    fetch: function(options) {
      options = options ? _.clone(options) : {};
      options.accepts = { 'jsonp': api.mediaType };
      options.crossDomain = true;
      options.dataType = 'jsonp';
      
      return Backbone.Model.prototype.fetch.call(this, options);
    }

  });
  return BaseModel;
});