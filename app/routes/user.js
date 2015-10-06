import Ember from 'ember';

export default Ember.Route.extend({
  beforeModel: function() {
    return this.get("session").fetch().catch(function() {});
  },
  model(params) {
    return this.store.findRecord('user', params.user_id);
  },
  // actions: {
  //   uploadFile(user, base64Img){
  //     debugger;
  //     user.set('avatar', base64Img);
  //     user.save();
  //     debugger;
  //     this.transitionTo('index');
  //   }
  // }
});
