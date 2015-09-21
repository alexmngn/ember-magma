import Ember from 'ember';
import DisabledSupportMixin from 'ember-magma/mixins/disabled-support';
import { module, test } from 'qunit';

module('Unit | Mixin | disabled support');

// Replace this with your real tests.
test('it works', function(assert) {
  var DisabledSupportObject = Ember.Object.extend(DisabledSupportMixin);
  var subject = DisabledSupportObject.create();
  assert.ok(subject);
});
