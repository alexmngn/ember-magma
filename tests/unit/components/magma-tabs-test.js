import { moduleForComponent, test } from 'ember-qunit';

var component;

moduleForComponent('magma-tabs', 'Unit | Component | magma tabs', {
	unit: true,
	setup() {
		component = this.subject();
	},

	teardown() {
		component = null;
	}
});

test('Component has correct initial value', function (assert) {
	assert.expect(0);
});
