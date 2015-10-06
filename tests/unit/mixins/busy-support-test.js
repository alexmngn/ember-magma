import Ember from 'ember';
import BusySupportMixin from 'ember-magma/mixins/busy-support';
import { module, test } from 'qunit';

module('Unit | Mixin | busy support');

test('busy', function(assert) {
	let BusySupportObject = Ember.Object.extend(BusySupportMixin);
	let subject = BusySupportObject.create();
	subject.getAttr = function (attr) {
		return this.get('attrs.'+attr);
	};

	Ember.run(() => {
		subject.set('attrs.busy', true);
	});

	assert.ok(subject.get('busy') === true, 'Busy is properly set');
	assert.ok(subject.get('ariaBusy') === 'true', 'Aria busy is properly set');
});
