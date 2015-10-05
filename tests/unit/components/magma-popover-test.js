import { moduleForComponent, test } from 'ember-qunit';

var component;

moduleForComponent('magma-popover', 'Unit | Component | magma popover', {
	unit: true,
	setup() {
		component = this.subject({for: '.magma-button'});
	},

	teardown() {
		component = null;
	}
});

test('Component has correct initial value', function (assert) {
	assert.expect(1);
	assert.ok(component.get('isVisible') === false);
});
