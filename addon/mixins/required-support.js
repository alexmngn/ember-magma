/**
 * Required
 *
 * @class Magma.Mixin.RequiredSupport
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

export default Ember.Mixin.create({

	attributeBindings: ['ariaRequired:aria-required'],

	classNameBindings: ['required:magma-required'],

	/**
	 * @property required {Boolean}
	 * @default false
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
