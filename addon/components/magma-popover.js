/**
 * Popover
 *
 * @class Magma.Component.Popover
 *
 */

import Ember from 'ember';
import ModalSupport from 'magma/mixins/modal-support';
import PositionSupport from 'magma/mixins/position-support';

export default Ember.Component.extend(ModalSupport, PositionSupport, {

	classNames: ['magma-popover'],

	attributeBindings: [
		'style',
		'tabindex'
	],

	for: void 0,

	on: 'hover',

	isVisible: false,

	popoverDidInsertElement: Ember.on('didInsertElement', function () {
		//Attach events on the 'for' element
		let forjQueryElement = Ember.$(this.get('for'));
		if (forjQueryElement.length) {
			let on = this.get('on');
			this.set('relativeElement', forjQueryElement);

			if (on === 'click') {
				forjQueryElement.on('click', () => {
					this.showPopover();
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

	showPopover() {
		this.set('isVisible', true);
		Ember.run.schedule('afterRender', this, function () {
			this.$().css('position','absolute').offset(this.getPosition());
		});
	},

	hidePopover() {
		this.set('isVisible', false);
	}

});
