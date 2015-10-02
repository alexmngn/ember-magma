import { moduleForComponent, test } from 'ember-qunit';

var component;

moduleForComponent('magma-checkbox', 'Unit | Component | magma checkbox', {
	unit: true,
	setup() {
		component = this.subject({name: 'buttonGroup', checked: true});
	},

	teardown() {
		component = null;
	}
});

test('Component has correct initial value', function (assert) {
	assert.expect(2);
	assert.ok(component.get('name') !== null);
	assert.ok(component.get('checked') !== null);
});
