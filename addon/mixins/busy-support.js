/**
 * Adds support of the busy state to a component
 *
 * @class Magma.Mixin.BusySupport
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

export default Ember.Mixin.create({

	attributeBindings: ['ariaBusy:aria-busy'],

	classNameBindings: ['busy:magma-busy'],

	/**
	 * When set to true, the component will have a busy state and the class magma-busy will be set to it.
	 * @property busy {Boolean}
	 * @default false
	 * @public
	 */
	busy: false,

	/**
	 * @property ariaBusy {String}
	 * @private
	 */
	ariaBusy: Ember.computed('busy', function () {
		return this.get('busy') ? String(this.get('busy')) : void 0;
	})
});
