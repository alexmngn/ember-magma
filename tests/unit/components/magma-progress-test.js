import { moduleForComponent, test } from 'ember-qunit';

var component;

moduleForComponent('magma-progress', 'Unit | Component | magma progress', {
	unit: true,
	setup() {
		component = this.subject();
	},

	teardown() {
		component = null;
	}
});

test('Component has correct initial value', function (assert) {
	assert.expect(3);
	assert.ok(component.get('role') === 'progressbar');
	assert.ok(component.get('value') === 0);
	assert.ok(component.get('valueMax') === 100);
});
