import Ember from 'ember';
import SelectedSupportMixin from 'ember-magma/mixins/selected-support';
import { module, test } from 'qunit';

module('Unit | Mixin | selected support');

test('selected', function(assert) {
	let SelectedSupportObject = Ember.Object.extend(SelectedSupportMixin);
	let subject = SelectedSupportObject.create();
	subject.getAttr = function (attr) {
		return this.get('attrs.'+attr);
	};

	Ember.run(() => {
		subject.set('attrs.selected', true);
	});

	assert.ok(subject.get('selected') === true, 'Selected is properly set');
	assert.ok(subject.get('ariaSelected') === 'true', 'Aria selected is properly set');
});
