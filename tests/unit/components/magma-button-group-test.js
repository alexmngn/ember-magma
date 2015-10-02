import { moduleForComponent, test } from 'ember-qunit';

var component;

moduleForComponent('magma-button-group', 'Unit | Component | magma button group', {
	unit: true,
	needs: ['service:magma-event'],
	setup() {
		component = this.subject({name: 'buttonGroup', value: 'button1'});
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
