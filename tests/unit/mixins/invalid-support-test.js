import Ember from 'ember';
import InvalidSupportMixin from 'ember-magma/mixins/invalid-support';
import { module, test } from 'qunit';

module('Unit | Mixin | invalid support');

// Replace this with your real tests.
test('it works', function(assert) {
  var InvalidSupportObject = Ember.Object.extend(InvalidSupportMixin);
  var subject = InvalidSupportObject.create();
  assert.ok(subject);
});
