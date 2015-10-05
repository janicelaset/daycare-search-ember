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
    var geocoder = new this.googleMaps.Geocoder();
    geocoder.geocode( {'address': zip}, function(results, status) {
      if(status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.bounds)
        return results[0].geometry.location;
      }
      else {
        alert("It didn't work because" + status);
      }
    });
  }
});
