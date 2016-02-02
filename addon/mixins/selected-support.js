/**
 * Adds support of the selected state to a component
 *
 * @class Magma.Mixin.SelectedSupport
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

const { computed } = Ember;

export default Ember.Mixin.create({

	attributeBindings: ['ariaSelected:aria-selected'],

	classNameBindings: ['selected:magma-selected'],

	/**
	 * @property selected {Boolean}
	 * @default false
	 * @private
	 */
	selected: computed('attrs.selected', function () {
		return this.getAttr('selected') || false;
	}),

	/**
	 * @property ariaSelected {String}
	 * @private
	 */
	ariaSelected: computed('selected', function () {
		const selected = this.get('selected');
		return selected ? String(selected) : void 0;
	}),

	attrs: {
		/**
		 * When set to true, the component will have a selected state and the class magma-selected will be set to it.
		 * @property selected {Boolean}
		 * @default false
		 * @public
		 */
		selected: void 0
	}
});
