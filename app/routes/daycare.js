import Ember from 'ember';

export default Ember.Route.extend({

   model(params) {
    return this.store.findRecord('daycare', params.daycare_id);
  },

  actions: {
    saveChanges(daycare, params) {
      Object.keys(params).forEach(function(key){
        if(params[key] !== undefined) {
          daycare.set(key, params[key]);
        }
      });
      daycare.save();
      this.transitionTo('daycare');
    }
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
