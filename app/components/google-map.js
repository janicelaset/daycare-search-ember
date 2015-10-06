import Ember from 'ember';

export default Ember.Component.extend({
  map: Ember.inject.service('google-map'),
  initMap: null,

  selectedRadius: 5,
  radius: ["5", "10", "20", "30", "50"],

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

      var addressInput = this.get('address');
      var radius = this.get('selectedRadius');
      radius = radius * 1609.34;

      var addresses = [];
      var address;
      var addressSplit;
      var state;
      var stateInput;

      addressSplit = addressInput.split(' ');
      stateInput = addressSplit[addressSplit.length - 2];

      //only get addresses in the state
      daycare.forEach(function(daycare) {
        address = daycare.get('address');
        addressSplit = address.split(' ');
        state = addressSplit[addressSplit.length - 2];
        if (state === stateInput) {
          addresses.push(address);
        }
      });

      var withinRadius = this.get('map').codeAddress(newMap, addressInput, addresses, radius);

      this.get('map').setMarkers(newMap, addresses);
    }
  }
});
