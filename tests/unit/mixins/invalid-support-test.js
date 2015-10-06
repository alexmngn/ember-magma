import Ember from 'ember';
import InvalidSupportMixin from 'ember-magma/mixins/invalid-support';
import { module, test } from 'qunit';

module('Unit | Mixin | invalid support');

test('invalid', function(assert) {
	let InvalidSupportObject = Ember.Object.extend(InvalidSupportMixin);
	let subject = InvalidSupportObject.create();
	subject.getAttr = function (attr) {
		return this.get('attrs.'+attr);
	};

	Ember.run(() => {
		subject.set('attrs.invalid', true);
	});

	assert.ok(subject.get('invalid') === true, 'Invalid is properly set');
	assert.ok(subject.get('ariaInvalid') === 'true', 'Aria invalid is properly set');
});
