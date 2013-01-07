define(
  ['jquery', 'underscore', 'backbone'],
  function($, _, Backbone){
    "use strict";

    var api = {

      mediaType: 'application/vnd.cfn.pyxserver',
      rootUrl: 'http://dev.pyxisweb.com/api',
      rootResources: undefined,

      start: function() {
        var jqxhr = $.ajax({
          url: this.rootUrl,
          crossDomain: true,
          dataType: 'jsonp',
          accepts: { 'jsonp': this.mediaType },
          context: this
        }).done(function(response){
          console.log('API root loaded (' + this.rootUrl + ')');
          this.rootResources = response;
        }).fail(function(){
          console.log('Problem getting root of API');
        });

        return jqxhr;
      },

      getRel: function(name, rels) {
        if (!rels) {
          rels = this.rootResources.meta.rels;
        }

        if (rels && rels.length) {
          return (_.find(rels, function(r) { return r.name === name }) || {}).href;
        }

        return null;
      }
    };

    api.start();

    return api;
  }
);
