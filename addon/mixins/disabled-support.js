/**
 * Adds support of the disabled state to a component
 *
 * @class Magma.Mixin.DisabledSupport
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

const { computed } = Ember;

export default Ember.Mixin.create({

	attributeBindings: ['ariaDisabled:aria-disabled'],

	classNameBindings: ['disabled:magma-disabled'],

	/**
	 * @property disabled {Boolean}
	 * @default false
	 * @private
	 */
	disabled: computed('attrs.disabled', function () {
		return this.getAttr('disabled') || false;
	}),

	/**
	 * @property ariaDisabled {String}
	 * @private
	 */
	ariaDisabled: computed('disabled', function () {
		const disabled = this.get('disabled');
		return disabled && this.get('attributeBindings').indexOf('disabled') === -1 ? String(disabled) : void 0;
	}),

	attrs: {

		/**
		 * When set to true, the component will have a disabled state and the class magma-disabled will be set to it.
		 * @property disabled {Boolean}
		 * @default false
		 * @public
		 */
		disabled: void 0
	}
});
