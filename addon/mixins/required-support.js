/**
 * Adds support of the required state to a component
 *
 * @class Magma.Mixin.PressedSupport
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

const { computed } = Ember;

export default Ember.Mixin.create({

	attributeBindings: ['ariaRequired:aria-required'],

	classNameBindings: ['required:magma-required'],

	/**
	 * @property required {Boolean}
	 * @default false
	 * @private
	 */
	required: computed('attrs.required', function () {
		return this.getAttr('required') || false;
	}),

	/**
	 * @property ariaRequired {String}
	 * @private
	 */
	ariaRequired: computed('required', function () {
		const required = this.get('required');
		return required && this.get('attributeBindings').indexOf('required') === -1 ? String(required) : void 0;
	}),

	attrs: {
		/**
		 * When set to true, the component will have a required state and the class magma-required will be set to it.
		 * @property required {Boolean}
		 * @default false
		 * @public
		 */
		required: void 0
	}
});
