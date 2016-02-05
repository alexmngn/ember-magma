import { moduleForComponent, test } from 'ember-qunit';

var component;

moduleForComponent('magma-radiobutton', 'Unit | Component | magma radiobutton', {
	unit: true,
	setup() {
		component = this.subject({name: 'radiobuttons', value: 'radiobutton1'});
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
