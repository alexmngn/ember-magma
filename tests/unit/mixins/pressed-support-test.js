import Ember from 'ember';
import PressedSupportMixin from 'ember-magma/mixins/pressed-support';
import { module, test } from 'qunit';

module('Unit | Mixin | pressed support');

// Replace this with your real tests.
test('it works', function(assert) {
  var PressedSupportObject = Ember.Object.extend(PressedSupportMixin);
  var subject = PressedSupportObject.create();
  assert.ok(subject);
});
