import Ember from 'ember';
import RequiredSupportMixin from 'ember-magma/mixins/required-support';
import { module, test } from 'qunit';

module('Unit | Mixin | required support');

test('required', function(assert) {
	let RequiredSupportObject = Ember.Object.extend(RequiredSupportMixin);
	let subject = RequiredSupportObject.create();
	subject.getAttr = function (attr) {
		return this.get('attrs.'+attr);
	};

	Ember.run(() => {
		subject.set('attrs.required', true);
	});

	assert.ok(subject.get('required') === true, 'Required is properly set');
	assert.ok(subject.get('ariaRequired') === 'true', 'Aria required is properly set');
});
