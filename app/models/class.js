import DS from 'ember-data';

export default DS.Model.extend({
  ages: DS.attr(),
  description: DS.attr(),
  image: DS.attr(),
  schedule: DS.attr(),
  daycare: DS.belongsTo('daycare', {async: true})

});
