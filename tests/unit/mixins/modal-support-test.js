import Ember from 'ember';
import ModalSupportMixin from 'ember-magma/mixins/modal-support';
import { module, test } from 'qunit';

module('Unit | Mixin | modal support');

// Replace this with your real tests.
test('it works', function(assert) {
  var ModalSupportObject = Ember.Object.extend(ModalSupportMixin);
  var subject = ModalSupportObject.create();
  assert.ok(subject);
});
