import Ember from 'ember';
import HiddenSupportMixin from 'ember-magma/mixins/hidden-support';
import { module, test } from 'qunit';

module('Unit | Mixin | hidden support');

test('hidden', function(assert) {
	let HiddenSupportObject = Ember.Object.extend(HiddenSupportMixin);
	let subject = HiddenSupportObject.create();
	subject.getAttr = function (attr) {
		return this.get('attrs.'+attr);
	};

	Ember.run(() => {
		subject.set('attrs.hidden', true);
	});

	assert.ok(subject.get('hidden') === true, 'Hidden is properly set');
	assert.ok(subject.get('ariaHidden') === 'true', 'Aria hidden is properly set');
});
