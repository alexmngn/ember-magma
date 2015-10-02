/**
 * This creates a progress bar, very useful to display the state of something loading. You can display the value of the progression as well.
 *
 * @class Magma.Component.Progress
 * @constructor
 * @extends Ember.Component
 * @example
 * ```
 * {{#magma-progress value=75 as |progress|}}
 *   {{progress.indicatorValue}}%
 * {{/magma-popover}}
 * ```
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

	role: 'progressbar',

	/**
	 * The percentage of progress
	 * @param indicatorValue {Number}
	 * @private
	 */
	indicatorValue: Ember.computed('value', 'max', function () {
		return parseFloat(this.get('value')*100/this.get('max')) || 0;
	}),

	/**
	 * The current value
	 * @param value {Number}
	 * @public
	 */
	value: 0,

	/**
	 * The maximum value the progress bar can reach
	 * @param valueMax {Number}
	 * @public
	 */
	max: 100
});
