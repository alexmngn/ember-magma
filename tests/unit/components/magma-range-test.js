import { moduleForComponent, test } from 'ember-qunit';

var component;

moduleForComponent('magma-range', 'Unit | Component | magma range', {
	unit: true,
	setup() {
		component = this.subject();
	},

	teardown() {
		component = null;
	}
});

test('Component has correct initial value', function (assert) {
	assert.expect(4);
	assert.ok(component.get('max') === 100);
	assert.ok(component.get('min') === 0);
	assert.ok(component.get('step') === 1);
	assert.ok(component.get('value') === 0);
});
