/**
 * Invalid
 *
 * @class Magma.Mixin.InvalidSupport
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

export default Ember.Mixin.create({

	attributeBindings: ['ariaInvalid:aria-invalid'],

	classNameBindings: ['invalid:magma-invalid'],

	/**
	 * @property invalid {Boolean}
	 * @default false
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
