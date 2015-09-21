/**
 * Adds support of the required state to a component
 *
 * @class Magma.Mixin.RequiredSupport
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

export default Ember.Mixin.create({

	attributeBindings: ['ariaRequired:aria-required'],

	classNameBindings: ['required:magma-required'],

	/**
	 * When set to true, the component will have a required state and the class magma-required will be set to it.
	 * @property required {Boolean}
	 * @default false
	 * @public
	 */
	required: false,

	/**
	 * @property ariaRequired {String}
	 * @private
	 */
	ariaRequired: Ember.computed('required', function () {
		return this.get('required') ? String(this.get('required')) : void 0;
	})
});
