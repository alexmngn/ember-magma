import Ember from 'ember';
import PositionSupportMixin from 'ember-magma/mixins/position-support';
import { module, test } from 'qunit';

module('Unit | Mixin | position support');

// Replace this with your real tests.
test('it works', function(assert) {
  var PositionSupportObject = Ember.Object.extend(PositionSupportMixin);
  var subject = PositionSupportObject.create();
  assert.ok(subject);
});
