import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr(),
  education: DS.attr(),
  experience: DS.attr(),
  image: DS.attr(),
  about: DS.attr(),
  certifications: DS.attr(),
  years: DS.attr(),
  daycare: DS.belongsTo('daycare', {async: true})
});
