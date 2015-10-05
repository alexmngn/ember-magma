/**
 * Adds support of the pressed state to a component
 *
 * @class Magma.Mixin.PressedSupport
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

const { computed } = Ember;

export default Ember.Mixin.create({

	attributeBindings: ['ariaPressed:aria-pressed'],

	classNameBindings: ['pressed:magma-pressed'],

	/**
	 * @property pressed {Boolean}
	 * @default false
	 * @private
	 */
	pressed: computed('attrs.pressed', function () {
		return this.getAttr('pressed') || false;
	}),

	/**
	 * @property ariaPressed {String}
	 * @private
	 */
	ariaPressed: computed('pressed', function () {
		const pressed = this.get('pressed');
		return pressed ? String(pressed) : void 0;
	}),

	attrs: {
		/**
		 * When set to true, the component will have a pressed state and the class magma-pressed will be set to it.
		 * @property pressed {Boolean}
		 * @default false
		 * @public
		 */
		pressed: void 0
	}
});
