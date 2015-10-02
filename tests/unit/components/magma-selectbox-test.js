import { moduleForComponent, test } from 'ember-qunit';

var component;
var content = [
    {
        name:'Mississauga',
        value: 'Mississauga',
        group: 'Ontario'
    }, {
        name:'Montreal',
        value: 'Montreal',
        group: 'Quebec'
    },{
        name:'Ottawa',
        value: 'Ottawa',
        group: 'Ontario'
    }
];

moduleForComponent('magma-selectbox', 'Unit | Component | magma selectbox', {
	unit: true,
	needs: ['service:magma-event'],
	setup() {
		component = this.subject({content: content});
	},

	teardown() {
		component = null;
	}
});

test('Component has correct initial value', function (assert) {
	assert.expect(3);
	assert.ok(component.get('optionValuePath') === 'id');
	assert.ok(component.get('optionLabelPath') === 'title');
	assert.ok(component.get('selection') === content[0]);
});
