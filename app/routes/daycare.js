import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    debugger;
    return this.store.findRecord('daycare', params.daycare_id);
  }
});
