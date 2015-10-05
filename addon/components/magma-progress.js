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

const { computed, isNone, observer, on } = Ember;

export default Ember.Component.extend({

	attributeBindings: [
		'ariaValuemin:aria-valuemin',
		'ariaValuemax:aria-valuemax',
		'ariaValuenow:aria-valuenow',
		'style',
		'role',
		'title'
	],

	classNames: ['magma-progress'],

	classNameBindings: ['indicatorAnimation:magma-progress-indicator-animate'],

	role: 'progressbar',

	ariaValuemin: 0,

	ariaValuemax: computed.alias('valueMax'),

	ariaValuenow: computed.alias('value'),

	indicatorAnimation: computed('attrs.indicatorAnimation', function () {
		const indicatorAnimation = this.getAttr('indicatorAnimation');
		return isNone(indicatorAnimation) ? true : indicatorAnimation;
	}),

	indicatorAnimationDuration: computed('attrs.indicatorAnimationDuration', function () {
		return this.getAttr('indicatorAnimationDuration') || 400;
	}),

	max: computed('attrs.max', function () {
		return this.getAttr('max') || 100;
	}),

	value: computed('attrs.value', function () {
		return this.getAttr('value') || 0;
	}),

	attrs: {
		/**
		 * When set to true, the indicator number will be animated
		 * @param indicatorAnimation {Boolean}
		 * @default true
		 * @public
		 */
		indicatorAnimation: void 0,

		/**
		 * When animate is set to true, this will set the speed of the animation in miliseconds
		 * @param indicatorAnimationDuration {Number}
		 * @default 400
		 * @public
		 */
		indicatorAnimationDuration: void 0,

		/**
		 * The maximum value the progress bar can reach
		 * @param max {Number}
		 * @public
		 */
		max: void 0,

		/**
		 * The current value
		 * @param value {Number}
		 * @public
		 */
		value: void 0
	},

	valueDidChange: observer('value', 'max', function () {
		this.set('progress', parseFloat(this.get('value')*100/this.get('max')) || 0);
		if (this.get('indicatorAnimation') === true) {
			this.animateIndicatorValue();
		} else {
			this.set('indicatorValue', this.get('progress'));
		}
	}),

	progressDidInsertElement: on('didInsertElement', function () {
		this.valueDidChange();
	}),

	progress: 0,

	/**
	 * The percentage of progress
	 * @param indicatorValue {Number}
	 * @private
	 */
	indicatorValue: computed(function () {
		return this.get('progress');
	}),

	animateIndicatorValue() {
		const { progress, indicatorValue, animationDuration } =
			this.getProperties('progress', 'indicatorValue', 'indicatorAnimationDuration');

		this.$().prop('indicatorValue', indicatorValue).animate({
			indicatorValue: progress
		}, {
			duration: animationDuration,
			step: (now) => {
				this.set('indicatorValue', Math.ceil(now));
			}
		});
	}
});
