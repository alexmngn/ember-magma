import Ember from 'ember';
import AnimationSupportMixin from 'ember-magma/mixins/animation-support';
import { module, test } from 'qunit';

module('Unit | Mixin | animation support');

// Replace this with your real tests.
test('it works', function(assert) {
  var AnimationSupportObject = Ember.Object.extend(AnimationSupportMixin);
  var subject = AnimationSupportObject.create();
  assert.ok(subject);
});
