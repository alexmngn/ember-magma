/**
 * Adds support of the busy state to a component
 *
 * @class Magma.Mixin.BusySupport
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

const { computed } = Ember;

export default Ember.Mixin.create({

	attributeBindings: ['ariaBusy:aria-busy'],

	classNameBindings: ['busy:magma-busy'],

	/**
	 * @property busy {Boolean}
	 * @default false
	 * @private
	 */
	busy: computed('attrs.busy', function () {
		return this.getAttr('busy') || false;
	}),

	/**
	 * @property ariaBusy {String}
	 * @private
	 */
	ariaBusy: computed('busy', function () {
		const busy = this.get('busy');
		return busy ? String(busy) : void 0;
	}),

	attrs: {
		/**
		 * When set to true, the component will have a busy state and the class magma-busy will be set to it.
		 * @property busy {Boolean}
		 * @default false
		 * @public
		 */
		busy: void 0
	}
});
