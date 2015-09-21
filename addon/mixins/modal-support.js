/**
 * Adds support of the modal to a component
 *
 * @class Magma.Mixin.ModalSupport
 * @constructor Ember.Mixin
 */

/* global document */

import Ember from 'ember';

export default Ember.Mixin.create({

	attributeBindings: ['tabindex'],

	/**
	 * When set to true, the tab will be constrained to the component
	 * @property isConstrained {Boolean}
	 * @default true
	 * @public
	 */
	isConstrained: true,

	/**
	 * When set to true, the tab will be stopped.
	 * @property isTrapped {Boolean}
	 * @default false
	 * @public
	 */
	isTrapped: false,

	/**
	 * @property modalElement {Object}
	 * @private
	 */
	modalElement: Ember.computed(function () {
		return this;
	}),

	/**
	 * @property tabindex
	 * @protected
	 */
	tabindex: Ember.computed('isConstrained', function () {
		return this.get('isConstrained') ? 0 : void 0;
	}),

	/**
	 * On keydown, on the tab key, constrain the tab to the component.
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
	 * On keydown, on the tab key, stop the tab.
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
