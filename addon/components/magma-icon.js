/**
 * Icon
 *
 * @class Magma.Component.Icon
 *
 */

import Ember from 'ember';

export default Ember.Component.extend({
	
	attributeBindings: [
		'style',
		'title'
	],

	classNames: ['magma-icon'],

	classNameBindings:['iconClassName'],

	icon: void 0,

	iconClassName: Ember.computed('icon', function () {
		const icon = this.get('icon');
		return icon ? 'magma-icon-'+icon : void 0;
	}),

	tagName: 'span',

	title: void 0
});