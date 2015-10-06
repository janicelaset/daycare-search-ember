import Ember from 'ember';

export default Ember.Service.extend({
  googleMaps: window.google.maps,

  findMap(container, options) {
    return new this.googleMaps.Map(container, options);
  },
  center(latitude, longitude) {
    return new this.googleMaps.LatLng(latitude, longitude);
  },
  getMap(map, address) {
    var geocoder = new this.googleMaps.Geocoder();

    geocoder.geocode( {'address': address}, function(results, status) {
      if(status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        map.fitBounds(results[0].geometry.bounds)
      }
      else {
        alert("It didn't work because" + status);
      }

    });
  },
  codeAddress(map, origin, addresses, radius) {
    var withinRadius = [];
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: addresses,
      travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {

      if (status == google.maps.DistanceMatrixStatus.OK) {
        var destinations = response.destinationAddresses;

          var results = response.rows[0].elements;
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            var distance = element.distance.value;
            var to = destinations[j];
            if (distance <= radius) {
              withinRadius.push(to);
            }
          }
        return withinRadius;
      }
    });
  },
  setMarkers(map, addresses) {
    var geocoder = new this.googleMaps.Geocoder();
    var bounds = new google.maps.LatLngBounds();
    addresses.forEach(function(address) {
      geocoder.geocode( {'address': address}, function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
          var marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: results[0].geometry.location
          });
          bounds.extend(marker.position);
          map.fitBounds(bounds);
        }
        else {
          alert("It didn't work because" + status);
        }
      })
    });
  }
});
