/**
 * Adds support of the pressed state to a component
 *
 * @class Magma.Mixin.PressedSupport
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

export default Ember.Mixin.create({

	attributeBindings: ['ariaPressed:aria-pressed'],

	classNameBindings: ['pressed:magma-pressed'],

	/**
	 * When set to true, the component will have a pressed state and the class magma-pressed will be set to it.
	 * @property pressed {Boolean}
	 * @default false
	 * @public
	 */
	pressed: false,

	/**
	 * @property ariaPressed {String}
	 * @private
	 */
	ariaPressed: Ember.computed('pressed', function () {
		return this.get('pressed') ? String(this.get('pressed')) : void 0;
	})
});
