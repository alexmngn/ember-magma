/**
 * The slider allows you to select a value between a range of two values
 *
 * @class Magma.Component.Slider
 * @constructor
 * @uses Magma.Mixin.DisabledSupport
 * @extends Ember.Component
 * @example
 * ```
 * {{magma-slider value=10}}
 * ```
 */

import Ember from 'ember';
import DisabledSupport from 'ember-magma/mixins/disabled-support';

const { observer, on } = Ember;

export default Ember.Component.extend(DisabledSupport, {

	attributeBindings: [
		'disabled',
		'max',
		'min',
		'name',
		'style',
		'tabindex',
		'type',
		'title'
	],

	classNames: ['magma-range'],

	tagName: 'input',

	type: 'range',

	/**
	 * Indicate the minimum value of the allowed range of values for the element.
	 * @param min {Number}
	 * @default 0
	 * @public
	 */
	min: 0,

	/**
	 * Indicate the maximum value of the allowed range of values for the element.
	 * @param max {Number}
	 * @default 100
	 * @public
	 */
	max: 100,

	/**
	 * Specifies the value granularity of the element’s value.
	 * @param value {Number}
	 * @default 1
	 * @public
	 */
	step: 1,

	/**
	 * Current value
	 * @param value {Number}
	 * @default 0
	 * @public
	 */
	value: 0,

	/**
	 * On init, will set the `value` to the element value
	 * @method rangeDidInsertElement
	 * @private
	 */
	rangeDidInsertElement: on('didInsertElement', function () {
		this.set('element.value', this.get('value'));
	}),

	/**
	 * On input, the `value` is set to the element value.
	 * @method rangeInput
	 * @private
	 */
	rangeInput: on('input', function () {
		this.set('value', Number(this.get('element.value')).valueOf());
	}),

	/**
	 * On value change, will update the element.value with the new value
	 * @method rangeValueDidChange
	 * @private
	 */
	rangeValueDidChange: observer('value', function () {
		const value = this.get('value');
		const elementValue = Number(this.get('element.value')).valueOf();
		if (elementValue !== value) {
			this.set('element.value', value);
		}
	})
});
