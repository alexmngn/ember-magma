import { moduleForComponent, test } from 'ember-qunit';

var component;

moduleForComponent('magma-textbox', 'Unit | Component | magma textbox', {
	unit: true,
	setup() {
		component = this.subject({name: 'textbox'});
	},

	teardown() {
		component = null;
	}
});

test('Component has correct initial value', function (assert) {
	assert.expect(1);
	assert.ok(component.get('name') !== null);
});
