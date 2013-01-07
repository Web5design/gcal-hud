define([
  'app',
  'api',
  'vent',
  'settings/homeLayout',
  'settings/facilitiesGridCompositeView',
  'settings/facilityFormItemView',
  'settings/facilityModel',
  'settings/facilityCollection'],

function(app, api, vent, HomeLayout, ResultsGridCompositeView, FormItemView, FacilityModel, FacilityCollection) {
  var controller = {

    index: function() {
      app.appState.set({loggedIn: true, currentModule: 'settings'});

      var currentView = app.mainRegion.currentView;

      // check if the home view was already loaded
      if(currentView && currentView.constructor === HomeLayout) {
        currentView.navigationView.popView();
        return;
      }
      
      currentView = new HomeLayout();
      app.mainRegion.show(currentView);
      app.menuRegion.close();

      var facilities = new FacilityCollection();
      facilities.fetch({ url: api.getRel('facilities') });

      var resultsGrid = new ResultsGridCompositeView({ collection: facilities });
      currentView.navigationView.pushView(resultsGrid);
    },

    edit: function(id) {

      var facility = new FacilityModel();

      facility.fetch({
        url: api.getRel('facility', api.rootResources.meta.rels).replace('{Id}', id),

        // wait for the fetch before binding model to view
        success: function() { 
          var formView = new FormItemView({ model: facility });
          app.mainRegion.currentView.navigationView.pushView(formView);
        }
      });
      
    },
  };

  return controller;
});
