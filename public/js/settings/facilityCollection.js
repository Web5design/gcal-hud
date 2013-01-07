define(['baseCollection', 'settings/facilityModel'], function(BaseCollection, Facility) {

  var FacilityCollection = BaseCollection.extend({
    model: Facility // this Collection has items of type Facility
  });
  return FacilityCollection;
});