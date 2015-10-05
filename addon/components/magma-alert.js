/**
 * An alert box with different style and color, based on your need.
 * You can also create your own, it will add the class magma-alert-{alert} to the component, and you can style it the way you want.
 *
 * @class Magma.Component.Alert
 * @constructor
 * @extends Ember.Component
 * @example
 * ```
 * {{#magma-alert alert="error"}}
 *   Please enter your firstname
 * {{/magma-alert}}
 * ```
 */

 import Ember from 'ember';
 import AnimationSupport from 'ember-magma/mixins/animation-support';

 const { computed, isNone, observer, on } = Ember;

 export default Ember.Component.extend(AnimationSupport, {

 	attributeBindings: [
 		'role',
 		'style',
 		'tabindex',
 		'title'
 	],

	classNames: ['magma-alert'],

	classNameBindings: ['alertClassName'],

	role: 'alert',

	/**
	 * @property animationIn {String}
	 * @private
	 */
	animationIn: 'fadeIn',

	/**
	 * @property animationOut {String}
	 * @private
	 */
	animationOut: 'fadeOut',

	/**
	 * @property isDisplayed {Boolean}
	 * @private
	 */
	isDisplayed: computed('attrs.isDisplayed', function () {
		const isDisplayed = this.getAttr('isDisplayed');
		return isNone(isDisplayed) ? true : isDisplayed;
	}),

	attrs: {

		/**
		 * Type of alert your want to display
		 * @property attrs.alert {String}
		 * @public
		 */
		alert: void 0,

		/**
		 * Animation when the component appears
		 * @property attrs.animationIn
		 * @default fadeIn
		 * @public
		 */
		animationIn: void 0,

		/**
		 * Animation when the component disappears
		 * @property attrs.animationOut
		 * @default fadeOut
		 * @public
		 */
		animationOut: void 0,

		/**
		 * When set to true, the alert is visible.
		 * @property attrs.visible {Boolean}
		 * @public
		 */
		isDisplayed: void 0
	},

	/**
	 * On didInsertElement, refresh the animation
	 * @method alertDidInsertElement
	 * @private
	 */
	alertDidInsertElement: on('didInsertElement', function () {
		this.refreshAnimation();
	}),

	/**
	 * Class name of the alert box, based on `alert` property. It returns `magma-alert-{alert}`
	 * @property alertClassName {String}
	 * @private
	 */
	alertClassName: computed('alert', function () {
		const alert = this.getAttr('alert');
		return alert ? 'magma-alert-'+alert : void 0;
	}),

	/**
	 * Observes the attrs.visible attribute. Will animate and show/hide the component when the value changes.
	 * @property alertClassName {String}
	 * @private
	 */
	refreshAnimation: observer('isDisplayed', function () {
		if (this.get('isDisplayed') === true) {
			this.set('isVisible', this.get('isDisplayed'));
			this.animate(this.get('animationIn'));
		} else {
			this.animate(this.get('animationOut')).then(() => {
				this.set('isVisible', this.get('isDisplayed'));
			});
		}
	})

});
