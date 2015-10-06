import Ember from 'ember';

export default Ember.Service.extend({
  googleMaps: window.google.maps,

  findMap(container, options) {
    return new this.googleMaps.Map(container, options);
  },
  center(latitude, longitude) {
    return new this.googleMaps.LatLng(latitude, longitude);
  },
  codeAddress(map, origin, addresses, radius) {
    console.log(map);
    console.log(origin);
    console.log(addresses);
    console.log(radius);
    // var geocoder = new this.googleMaps.Geocoder();
    //
    // geocoder.geocode( {'address': address}, function(results, status) {
    //   if(status == google.maps.GeocoderStatus.OK) {
    //     map.setCenter(results[0].geometry.location);
    //     map.fitBounds(results[0].geometry.bounds)
    //   }
    //   else {
    //     alert("It didn't work because" + status);
    //   }
    //
    // });
    var withinRadius = [];
    var service = new google.maps.DistanceMatrixService();
    console.log('created service distance matrix');
    service.getDistanceMatrix(
    {
      origins: [origin],
      destinations: addresses,
      travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {

      if (status == google.maps.DistanceMatrixStatus.OK) {
        // var origins = response.originAdddresses;
        var destinations = response.destinationAddresses;

        // for(var i = 0; i < origins.length; i) {
          var results = response.rows[0].elements;
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            var distance = element.distance.value;
            // var duration = element.duration.value;
            // var from = origins[i];
            console.log(distance);
            var to = destinations[j];
            if (distance <= radius) {
              withinRadius.push(to);
              console.log(withinRadius);
            }
          }
        // }
    return withinRadius;

      }
    });
  },
  setMarkers(map, addresses) {
    var geocoder = new this.googleMaps.Geocoder();

    addresses.forEach(function(address) {
      geocoder.geocode( {'address': address}, function(results, status) {
        if(status == google.maps.GeocoderStatus.OK) {
          var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
          });
        }
        else {
          alert("It didn't work because" + status);
        }
      })
    });
  }
});
