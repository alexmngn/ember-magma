/**
 * Pressed
 *
 * @class Magma.Mixin.Pressed
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

export default Ember.Mixin.create({

	attributeBindings: ['ariaPressed:aria-pressed'],

	classNameBindings: ['pressed:magma-pressed'],

	/**
	 * @property pressed {Boolean}
	 * @default false
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
