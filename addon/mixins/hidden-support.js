/**
 * Adds support of the hidden state to a component
 *
 * @class Magma.Mixin.HiddenSupport
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

const { computed } = Ember;

export default Ember.Mixin.create({

	attributeBindings: ['ariaHidden:aria-hidden'],

	classNameBindings: ['hidden:magma-hidden'],

	/**
	 * @property hidden {Boolean}
	 * @default false
	 * @private
	 */
	hidden: computed('attrs.hidden', function () {
		return this.getAttr('hidden') || false;
	}),

	/**
	 * @property ariaHidden {String}
	 * @private
	 */
	ariaHidden: computed('hidden', function () {
		const hidden = this.get('hidden');
		return hidden ? String(hidden) : void 0;
	}),

	attrs: {
		/**
		 * When set to true, the component will have a hidden state and the class magma-hidden will be set to it.
		 * @property hidden {Boolean}
		 * @default false
		 * @public
		 */
		hidden: void 0
	}
});
