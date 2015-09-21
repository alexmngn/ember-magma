import Ember from 'ember';
import RequiredSupportMixin from 'ember-magma/mixins/required-support';
import { module, test } from 'qunit';

module('Unit | Mixin | required support');

// Replace this with your real tests.
test('it works', function(assert) {
  var RequiredSupportObject = Ember.Object.extend(RequiredSupportMixin);
  var subject = RequiredSupportObject.create();
  assert.ok(subject);
});
