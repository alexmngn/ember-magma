import { moduleForComponent, test } from 'ember-qunit';

var component;

moduleForComponent('magma-button', 'Unit | Component | magma button', {
	unit: true,
	setup() {
		component = this.subject({name: 'buttons', value: 'button1'});
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
