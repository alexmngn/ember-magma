import { moduleForComponent, test } from 'ember-qunit';

var component;

moduleForComponent('magma-textarea', 'Unit | Component | magma textarea', {
	unit: true,
	setup() {
		component = this.subject({name: 'textarea'});
	},

	teardown() {
		component = null;
	}
});

test('Component has correct initial value', function (assert) {
	assert.expect(1);
	assert.ok(component.get('name') !== null);
});
