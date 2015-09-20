/**
 * Progress
 *
 * @class Magma.Component.Progress
 *
 */

import Ember from 'ember';

export default Ember.Component.extend({

	attributeBindings: [
		'ariaValuemin:aria-valuemin',
		'ariaValuemax:aria-valuemax',
		'ariaValuenow:aria-valuenow',
		'style',
		'role',
		'title'
	],

	ariaValuemin: 0,

	ariaValuemax: Ember.computed.alias('valueMax'),

	ariaValuenow: Ember.computed.alias('value'),

	classNames: ['magma-progress'],

	indicatorValue: Ember.computed('value', 'valueMax', function () {
		return parseFloat(this.get('value')*100/this.get('valueMax')) || 0;
	}),

	role: 'progressbar',

	title: void 0,

	value: 0,

	valueMax: 100
});
