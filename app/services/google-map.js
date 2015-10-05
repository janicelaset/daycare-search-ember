import Ember from 'ember';

export default Ember.Service.extend({
  googleMaps: window.google.maps,

  findMap(container, options) {
    return new this.googleMaps.Map(container, options);
  },
  center(latitude, longitude) {
    return new this.googleMaps.LatLng(latitude, longitude);
  },
  codeZip(map, zip) {
    debugger;
    var geocoder = new this.googleMaps.Geocoder();
    geocoder.geocode( {'address': '6141 SW CrossCreek Dr, Aloha, OR'}, function(results, status) {
      debugger;
      if(status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        return results[0].geometry.location;
      }
      else {
        alert("It didn't work because" + status);
      }
    });
  }
});
