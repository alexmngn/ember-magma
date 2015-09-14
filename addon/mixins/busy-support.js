/**
 * Busy
 *
 * @class Magma.Mixin.BusySupport
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

export default Ember.Mixin.create({

	attributeBindings: ['ariaBusy:aria-busy'],

	classNameBindings: ['busy:magma-busy'],

	/**
	 * @property busy {Boolean}
	 * @default false
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
