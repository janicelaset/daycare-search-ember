import Ember from 'ember';

export default Ember.Component.extend({
  map: Ember.inject.service('google-map'),
  initMap: null,

  didInsertElement: function() {
      this.$('.search-daycare').hide();
  },

  actions: {
    showMap() {
      var container = this.$('.map-display')[0];
      var options = {
        center: this.get('map').center(39.8282, -98.5795),
        zoom: 4
      };
      this.get('map').findMap(container, options);

      this.$('.search-daycare').show();
      this.$('.display-map').hide();
    },
    search(daycare) {
      var container = this.$('.map-display')[0];
      var options = {
        center: this.get('map').center(39.8282, -98.5795),
        zoom: 4
      };
      var newMap = this.get('map').findMap(container, options);

      var zipInput = this.get('zipCode');

      var addresses = [];
      var address;
      var addressSplit;
      var zipCode
      daycare.forEach(function(daycare) {
        address = daycare.get('address');
        addressSplit = address.split(' ');
        zipCode = addressSplit[addressSplit.length - 1];
        if (zipCode === zipInput) {
          addresses.push(address);
        }
      });

      this.get('map').codeZip(newMap, zipInput);
      this.get('map').setMarkers(newMap, addresses);
    }
  }
});
