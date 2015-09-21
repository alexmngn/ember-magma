import Ember from 'ember';
import BusySupportMixin from 'ember-magma/mixins/busy-support';
import { module, test } from 'qunit';

module('Unit | Mixin | busy support');

// Replace this with your real tests.
test('it works', function(assert) {
  var BusySupportObject = Ember.Object.extend(BusySupportMixin);
  var subject = BusySupportObject.create();
  assert.ok(subject);
});
