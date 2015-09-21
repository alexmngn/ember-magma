/**
 * Adds support of the disabled state to a component
 *
 * @class Magma.Mixin.DisabledSupport
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

export default Ember.Mixin.create({

	attributeBindings: ['ariaDisabled:aria-disabled'],

	classNameBindings: ['disabled:magma-disabled'],

	/**
	 * When set to true, the component will have a disabled state and the class magma-disabled will be set to it.
	 * @property disabled {Boolean}
	 * @default false
	 * @public
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
