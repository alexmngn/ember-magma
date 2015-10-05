/**
 * Adds support of the invalid state to a component
 *
 * @class Magma.Mixin.InvalidSupport
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

const { computed } = Ember;

export default Ember.Mixin.create({

	attributeBindings: ['ariaInvalid:aria-invalid'],

	classNameBindings: ['invalid:magma-invalid'],

	/**
	 * @property invalid {Boolean}
	 * @default false
	 * @private
	 */
	invalid: computed('attrs.invalid', function () {
		return this.getAttr('invalid') || false;
	}),

	/**
	 * @property ariaDisabled {String}
	 * @private
	 */
	ariaInvalid: computed('invalid', function () {
		const invalid = this.get('invalid');
		return invalid && this.get('attributeBindings').indexOf('invalid') === -1 ? String(invalid) : void 0;
	}),

	attrs: {

		/**
		 * When set to true, the component will have a invalid state and the class magma-invalid will be set to it.
		 * @property invalid {Boolean}
		 * @default false
		 * @public
		 */
		invalid: void 0
	}
});
