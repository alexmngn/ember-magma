import Ember from 'ember';
import PressedSupportMixin from 'ember-magma/mixins/pressed-support';
import { module, test } from 'qunit';

module('Unit | Mixin | pressed support');

test('pressed', function(assert) {
	let PressedSupportObject = Ember.Object.extend(PressedSupportMixin);
	let subject = PressedSupportObject.create();
	subject.getAttr = function (attr) {
		return this.get('attrs.'+attr);
	};

	Ember.run(() => {
		subject.set('attrs.pressed', true);
	});

	assert.ok(subject.get('pressed') === true, 'Pressed is properly set');
	assert.ok(subject.get('ariaPressed') === 'true', 'Aria pressed is properly set');
});
