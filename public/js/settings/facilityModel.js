define(['baseModel'], function(BaseModel) {

  var FacilityModel = BaseModel.extend({
    defaults: {
      id: '',
      code: '',
      name: '',
      description: '',
    },

    initialize: function() {
      if (!this.get('id')) {
        this.set('id', this.defaults.id);
      }

      if (!this.get('code')) {
        this.set('code', this.defaults.code);
      }

      if (!this.get('name')) {
        this.set('name', this.defaults.name);
      }

      if (!this.get('description')) {
        this.set('description', this.defaults.description);
      }
    }
    
  });
  return FacilityModel;
});