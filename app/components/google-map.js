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
      // this.$('.search-result').hide();

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
      var contents = [];
      var address;
      var addressSplit;
      var state;
      var stateInput;
      var phone;
      var description;
      var id;

      addressSplit = addressInput.split(' ');
      stateInput = addressSplit[addressSplit.length - 2];
      stateInput = stateInput.toLowerCase();

      //only get addresses in the state
      daycare.forEach(function(daycare) {
        id = daycare.get('id')
        address = daycare.get('address');
        name = daycare.get('name');
        phone = daycare.get('phone');
        description = daycare.get('description');
        addressSplit = address.split(' ');
        state = addressSplit[addressSplit.length - 2];
        state = state.toLowerCase();

        if (state === stateInput) {
          addresses.push(address);
          contents.push("<div><strong><a href='/daycare/" + id + "'>" + name + "</a></strong></div>" +
                        "<div class='fa fa-home'> " + address + "</div><br>" +
                        "<div class='fa fa-phone'> " + phone + "</div>"
                        );
        }
      });

      var withinRadius = this.get('map').codeAddress(newMap, addressInput, addresses, radius);
      if (withinRadius === undefined) {
        this.$('.search-result').text("There were no daycares found in this area");
      }
      else {
        this.$('.search-result').text("");
      }

      this.get('map').setMarkers(newMap, addresses, contents);
    }
  }
});
