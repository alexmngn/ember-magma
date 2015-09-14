/**
 * Disabled
 *
 * @class Magma.Mixin.DisabledSupport
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

export default Ember.Mixin.create({

	attributeBindings: ['ariaDisabled:aria-disabled'],

	classNameBindings: ['disabled:magma-disabled'],

	/**
	 * @property disabled {Boolean}
	 * @default false
	 */
	disabled: false,

	/**
	 * @property ariaDisabled {String}
	 * @private
	 */
	ariaDisabled: Ember.computed('disabled', function () {
		return this.get('disabled') &&
			this.get('attributeBindings').indexOf('disabled') === -1 ?
			String(this.get('disabled')) : void 0;
	})
});
