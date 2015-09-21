/**
 * You can create a popover that will appear on top of any element. It can be a tooltip, to display additional information, or you can even use this component to display a list of items (such as a dropdown), or to display a calendar, bound a textbox for example.
 *
 * @class Magma.Component.Popover
 * @constructor
 * @uses Magma.Mixin.ModalSupport
 * @uses Magma.Mixin.PositionSupport
 * @extends Ember.Component
 * @example
 * ```
 * {{#magma-button class="popover-button"}}
 *   Roll over to display the tooltip
 * {{/magma-button}}
 *
 * {{#magma-popover for=".popover-button" placement="right" alignment="center"}}
 *   This appears on mouse over
 * {{/magma-popover}}
 * ```
 */

import Ember from 'ember';
import ModalSupport from 'ember-magma/mixins/modal-support';
import PositionSupport from 'ember-magma/mixins/position-support';

export default Ember.Component.extend(ModalSupport, PositionSupport, {

	classNames: ['magma-popover'],

	attributeBindings: [
		'style',
		'tabindex'
	],

	isVisible: false,

	/**
	 * It corresponds to the selector of the element that will trigger the popover to be displayed or hidden.
	 * @property for {String}
	 * @public
	 */
	for: void 0,

	/**
	 * The popover will appear on hover the for element, but you can also display it on click.
	 * @property on {String}
	 * @default hover
	 * @public
	 */
	on: 'hover',

	/**
	 * On didInsertElement, verify the `for` attribute is set and creates the event on the element.
	 * @method popoverDidInsertElement
	 * @private
	 */
	popoverDidInsertElement: Ember.on('didInsertElement', function () {
		//Attach events on the 'for' element
		let forjQueryElement = Ember.$(this.get('for'));
		if (forjQueryElement.length) {
			let on = this.get('on');
			this.set('relativeElement', forjQueryElement);

			if (on === 'click') {
				forjQueryElement.on('click', () => {
					this.togglePopover();
				});
			} else if (on === 'hover') {
				forjQueryElement.on('mouseenter', () => {
					this.showPopover();
				}).on('mouseleave', () => {
					this.hidePopover();
				});
			}
		}
	}),

	/**
	 * On willDestroyElement,teardown the event on the element.
	 * @method popoverWillDestroyElement
	 * @private
	 */
	popoverWillDestroyElement: Ember.on('willDestroyElement', function () {
		//Detach events on the 'for' element
		let forjQueryElement = Ember.$(this.get('for'));
		if (forjQueryElement.length) {
			let on = this.get('on');
			if (on === 'click') {
				forjQueryElement.off('click');
			} else if (on === 'hover') {
				forjQueryElement.off('mouseenter mouseleave');
			}
		}
	}),

	/**
	 * Toggle the popover visibility
	 * @method togglePopover
	 * @private
	 */
	togglePopover() {
		return this.get('isVisible') ? this.hidePopover() : this.showPopover();
	},

	/**
	 * Shows the popover
	 * @method showPopover
	 * @private
	 */
	showPopover() {
		this.set('isVisible', true);
		Ember.run.schedule('afterRender', this, function () {
			this.$().offset(this.getPosition());
		});
	},

	/**
	 * Hides the popover
	 * @method hidePopover
	 * @private
	 */
	hidePopover() {
		this.set('isVisible', false);
	}

});
