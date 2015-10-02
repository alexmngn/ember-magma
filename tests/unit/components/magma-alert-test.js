import { moduleForComponent, test } from 'ember-qunit';

var component;

moduleForComponent('magma-alert', 'Unit | Component | magma alert', {
	unit: true,
	setup() {
		component = this.subject({alert: 'error'});
	},

	teardown() {
		component = null;
	}
});

test('Component has correct initial value', function (assert) {
	assert.expect(3);
	assert.ok(component.get('role') === 'alert');
	assert.ok(component.get('alert') !== null);
    assert.ok(this.$().hasClass('magma-alert-error'), 'Class name is valid');
});
