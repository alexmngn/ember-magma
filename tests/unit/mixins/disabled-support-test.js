import Ember from 'ember';
import DisabledSupportMixin from 'ember-magma/mixins/disabled-support';
import { module, test } from 'qunit';

module('Unit | Mixin | disabled support');


test('disabled', function(assert) {
	let DisabledSupportObject = Ember.Object.extend(DisabledSupportMixin);
	let subject = DisabledSupportObject.create();
	subject.getAttr = function (attr) {
		return this.get('attrs.'+attr);
	};

	Ember.run(() => {
		subject.set('attrs.disabled', true);
	});

	assert.ok(subject.get('disabled') === true, 'Disabled is properly set');
	assert.ok(subject.get('ariaDisabled') === 'true', 'Aria disabled is properly set');
});
