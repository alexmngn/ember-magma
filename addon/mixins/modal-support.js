/**
 * Modal
 *
 * @class Magma.Mixin.ModalSupport
 * @constructor Ember.Mixin
 */

/* global document */

import Ember from 'ember';

export default Ember.Mixin.create({

	attributeBindings: ['tabindex'],

	/**
	 * @property isConstrained {Boolean}
	 * @default true
	 */
	isConstrained: true,

	/**
	 * @property isTrapped {Boolean}
	 * @default false
	 */
	isTrapped: false,

	/**
	 * @property modalElement {}
	 */
	modalElement: Ember.computed(function () {
		return this;
	}),

	tabindex: Ember.computed('isConstrained', function () {
		return this.get('isConstrained') ? 0 : void 0;
	}),

	/**
	 * @event modalConstrainKeyDown
	 */
	modalConstrainKeyDown: Ember.on('keyDown', function (event) {
		if (event.which === 9 && this.get('isVisible') &&
			this.get('isConstrained') && !this.get('isTrapped')) {
			const tabbableElements = this.get('modalElement').$(':tabbable');
			const activeElement = document.activeElement;
			let finalTabbable;
			let leavingFinalTabbable;

			if (tabbableElements.length !== 0) {
				finalTabbable = tabbableElements[event.shiftKey && 'first' || 'last']()[0];
				leavingFinalTabbable = finalTabbable === activeElement || this.get('modalElement') === activeElement && event.shiftKey;

				if (leavingFinalTabbable) {
					event.preventDefault();
					tabbableElements[event.shiftKey && 'last' || 'first']()[0].focus();
				}
			}
		}
	}),

	/**
	 * @event modalTrappingKeyDown
	 */
	modalTrappingKeyDown: Ember.on('keyDown', function (event) {
		if (event.which === 9 && this.get('isVisible') &&
			this.get('isConstrained') && this.get('isTrapped')) {
			event.preventDefault();
			return;
		}
	}),
});
