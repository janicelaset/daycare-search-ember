import Ember from 'ember';

export default Ember.Component.extend({

  actions: {
    saveChanges(daycare) {
      var params = {
        name: this.get('name'),
        address: this.get('address'),
        email: this.get('email'),
        phone: this.get('phone'),
        waitlist: this.get('waitlist'),
        ratio: this.get('ratio'),
        certifications: this.get('certifications'),
        hours: this.get('hours'),
        mission: this.get('mission'),
        description: this.get('description'),
        image1: this.get('image1'),
        image2: this.get('image2'),
        image3: this.get('image3'),
        image4: this.get('image4'),
        image5: this.get('image5'),
        user: this.get('daycare.user')
      }
      this.sendAction('saveChanges', daycare, params);
    }
  }
});
