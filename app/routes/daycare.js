import Ember from 'ember';

export default Ember.Route.extend({
   model(params) {
    return this.store.findRecord('daycare', params.daycare_id);
  }


});

// model() {
//   return Ember.RSVP.hash({
//     user: this.get("session").content.uid.then(function(user){
//           return this.store.findRecord('user', sessionId);
//     }),
//
//
//
//     }
