/**
 * Adds support of the modal to a component
 *
 * @class Magma.Mixin.ModalSupport
 * @constructor Ember.Mixin
 */

/* global document */

import Ember from 'ember';

const { computed, isNone, on } = Ember;

export default Ember.Mixin.create({

	attributeBindings: ['tabindex'],

	isConstrained: computed('attrs.isConstrained', function () {
		const isConstrained = this.getAttr('isConstrained');
		return isNone(isConstrained) ? true : isConstrained;
	}),

	isTrapped: computed('attrs.isTrapped', function () {
		const isTrapped = this.getAttr('isTrapped');
		return isNone(isTrapped) ? false : isTrapped;
	}),

	/**
	 * @property modalElement {Object}
	 * @private
	 */
	modalElement: computed(function () {
		return this;
	}),

	/**
	 * @property tabindex
	 * @protected
	 */
	tabindex: computed('isConstrained', function () {
		return this.get('isConstrained') ? 0 : void 0;
	}),

	attrs: {

		/**
		 * When set to true, the tab will be constrained to the component
		 * @property isConstrained {Boolean}
		 * @default true
		 * @public
		 */
		isConstrained: void 0,

		/**
		 * When set to true, the tab will be stopped.
		 * @property isTrapped {Boolean}
		 * @default false
		 * @public
		 */
		isTrapped: void 0
	},

	/**
	 * On keydown, on the tab key, constrain the tab to the component.
	 * @event modalConstrainKeyDown
	 */
	modalConstrainKeyDown: on('keyDown', function (event) {
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
	modalTrappingKeyDown: on('keyDown', function (event) {
		if (event.which === 9 && this.get('isVisible') &&
			this.get('isConstrained') && this.get('isTrapped')) {
			event.preventDefault();
			return;
		}
	}),
});
