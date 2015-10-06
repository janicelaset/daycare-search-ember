import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    var sessionId = this.get("session").content.uid;
    return this.store.findRecord('user', sessionId);
  },
});
