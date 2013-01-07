define(['api', 'backbone'], function(api, Backbone) {

  var BaseCollection = Backbone.Collection.extend({
    
    total: undefined,
    pageSize: undefined,
    page: undefined,
    rels: undefined,

    parse: function(response) {
      this.total = response.meta.total;
      this.pageSize = response.meta.pageSize;
      this.page = response.meta.page;
      this.rels = response.meta.rels;

      return response.body;
    },

    fetch: function(options) {
      options = options ? _.clone(options) : {};
      options.accepts = { 'jsonp': api.mediaType };
      options.crossDomain = true;
      options.dataType = 'jsonp';
      
      return Backbone.Collection.prototype.fetch.call(this, options);
    }
  });
  return BaseCollection;
});