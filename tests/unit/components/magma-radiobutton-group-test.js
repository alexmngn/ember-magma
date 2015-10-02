import { moduleForComponent, test } from 'ember-qunit';

var component;

moduleForComponent('magma-radiobutton-group', 'Unit | Component | magma radiobutton group', {
	unit: true,
	needs: ['service:magma-event'],
	setup() {
		component = this.subject({name: 'radiobuttonGroup', value: 'radiobutton1'});
	},

	teardown() {
		component = null;
	}
});

test('Component has correct initial value', function (assert) {
	assert.expect(2);
	assert.ok(component.get('name') !== null);
	assert.ok(component.get('value') !== null);
});
