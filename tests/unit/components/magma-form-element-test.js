import { moduleForComponent, test } from 'ember-qunit';

var component;

moduleForComponent('magma-form-element', 'Unit | Component | magma form-element', {
	unit: true,
	setup() {
		component = this.subject({label: 'Label'});
	},

	teardown() {
		component = null;
	}
});

test('Component has correct initial value', function (assert) {
	assert.expect(1);
	assert.ok(component.get('label') !== null);
});
