/**
 * Adds support of the invalid state to a component
 *
 * @class Magma.Mixin.InvalidSupport
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

export default Ember.Mixin.create({

	attributeBindings: ['ariaInvalid:aria-invalid'],

	classNameBindings: ['invalid:magma-invalid'],

	/**
	 * When set to true, the component will have a invalid state and the class magma-invalid will be set to it.
	 * @property invalid {Boolean}
	 * @default false
	 * @public
	 */
	invalid: false,

	/**
	 * @property ariaInvalid {String}
	 * @private
	 */
	ariaInvalid: Ember.computed('invalid', function () {
		return this.get('invalid') &&
			this.get('attributeBindings').indexOf('invalid') === -1 ?
			String(this.get('invalid')) : void 0;
	})
});
