import Ember from 'ember';

export default Ember.Route.extend({
  actions: {

    addDaycare(params) {
      debugger;
      var newDaycare = this.store.createRecord('daycare', params);
      newDaycare.save();
      this.transitionTo('index');
    }
  }
});
