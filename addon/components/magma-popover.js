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
import AnimationSupport from 'ember-magma/mixins/animation-support';
import ModalSupport from 'ember-magma/mixins/modal-support';
import PositionSupport from 'ember-magma/mixins/position-support';

const { computed, observer, on, run, $ } = Ember;

export default Ember.Component.extend(AnimationSupport, ModalSupport, PositionSupport, {

	classNames: ['magma-popover'],

	attributeBindings: [
		'style',
		'tabindex'
	],

	isVisible: false,

	/**
	 * @property animationIn {String}
	 * @private
	 */
	animationIn: 'fadeIn',

	/**
	 * @property animationOut {String}
	 * @private
	 */
	animationOut: 'fadeOut',

	/**
	 * @property isDisplayed {Boolean}
	 * @private
	 */
	isDisplayed: false,

	on: computed('attrs.on', function () {
		return this.getAttr('on') || 'hover';
	}),

	attrs: {

		/**
		 * Animation when the component appears
		 * @property animationIn
		 * @default fadeIn
		 * @public
		 */
		animationIn: void 0,

		/**
		 * Animation when the component disappears
		 * @property attrs.animationOut
		 * @default fadeOut
		 * @public
		 */
		animationOut: void 0,

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
		on: void 0
	},

	/**
	 * On didInsertElement, verify the `for` attribute is set and create events.
	 * @method popoverDidInsertElement
	 * @private
	 */
	popoverDidInsertElement: on('didInsertElement', function () {
		//Attach events on the 'for' element
		let forjQueryElement = $(this.getAttr('for'));
		if (forjQueryElement.length) {
			let on = this.getAttr('on');
			this.set('relativeElement', forjQueryElement);

			if (on === 'click') {
				forjQueryElement.on('click.magma-popover', () => {
					this.togglePopover();
				});

				//If popover is modal, allows to close the popover when clicking anywhere outside
				if (this.get('isConstrained')) {
					$(document).on('click.magma-popover', () => {
						this.hidePopover();
					});
					this.$().on('click.magma-popover', (event) => {
						event.stopPropagation();
					});
				}

			} else if (on === 'hover') {
				forjQueryElement.on('mouseenter.magma-popover', () => {
					this.showPopover();
				}).on('mouseleave.magma-popover', () => {
					this.hidePopover();
				});
			}
		}
	}),

	/**
	 * On willDestroyElement,teardown the events.
	 * @method popoverWillDestroyElement
	 * @private
	 */
	popoverWillDestroyElement: on('willDestroyElement', function () {
		//Detach events on the 'for' element
		let forjQueryElement = $(this.getAttr('for'));
		if (forjQueryElement.length) {
			let on = this.getAttr('on');
			if (on === 'click') {
				forjQueryElement.off('click.magma-popover');
				$(document).off('click.magma-popover');
				this.$().off('click.magma-popover');
			} else if (on === 'hover') {
				forjQueryElement.off('mouseenter.magma-popover mouseleave.magma-popover');
			}
		}
	}),

	/**
	 * @method popoverSetOffset
	 * @private
	 */
	popoverSetOffset: observer('attrs.alignment', 'attrs.placement', function () {
		this.$().offset(this.getPosition());
	}),

	/**
	 * Toggle the popover visibility
	 * @method togglePopover
	 * @private
	 */
	togglePopover() {
		return this.toggleProperty('isDisplayed');
	},

	/**
	 * Shows the popover
	 * @method showPopover
	 * @private
	 */
	showPopover() {
		this.set('isDisplayed', true);
	},

	/**
	 * Hides the popover
	 * @method hidePopover
	 * @private
	 */
	hidePopover() {
		this.set('isDisplayed', false);
	},

	refreshAnimation: observer('isDisplayed', function () {
		if (this.get('isDisplayed') === true) {
			this.set('isVisible', this.get('isDisplayed'));
			run.schedule('afterRender', this, () => {
				this.popoverSetOffset();
				this.animate(this.get('animationIn'));
			});
		} else {
			this.animate(this.get('animationOut')).then(() => {
				this.set('isVisible', this.get('isDisplayed'));
			});
		}
	})


});
