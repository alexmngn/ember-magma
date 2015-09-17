/**
 * Position
 *
 * @class Magma.Mixin.PositionSupport
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

export function boundingClientRect(jQueryElement) {
	let element = jQueryElement[0];

	return Ember.$.extend({}, (typeof element.getBoundingClientRect === 'function' ? element.getBoundingClientRect() : {
		width: element.offsetWidth || 0,
		height: element.offsetHeight || 0
	}), jQueryElement.offset());
}

export function marginsClient(jQueryElement) {
	return {
		top: parseInt(jQueryElement.css('marginTop'), 10),
		right: parseInt(jQueryElement.css('marginRight'), 10),
		bottom: parseInt(jQueryElement.css('marginBottom'), 10),
		left: parseInt(jQueryElement.css('marginLeft'), 10)
	};
}

export default Ember.Mixin.create({

	autoPosition: true,

	alignment: 'top',

	placement: 'center',

	classNameBindings: [
		'alignmentClassName',
		'placementClassName'
	],

	coordinates: void 0,

	/**
	 * @property absoluteElement {}
	 */
	absoluteElement: Ember.computed(function () {
		return this.$();
	}),

	absoluteElementRect: Ember.computed('absoluteElement', function () {
		return boundingClientRect(this.get('absoluteElement'));
	}),

	absoluteElementMargins: Ember.computed('absoluteElement', function () {
		return marginsClient(this.get('absoluteElement'));
	}),

	/**
	 * @property relatedElement {}
	 */
	relatedElement: void 0,

	relativeElementRect: Ember.computed('relativeElement', function () {
		const relativeElement = this.get('relativeElement');
		return relativeElement.length > 0 ? boundingClientRect(relativeElement) : void 0;
	}),

	alignmentClassName: Ember.computed('alignment', function () {
		const alignment = this.get('alignment');
		return alignment ? 'magma-popover-alignment-'+alignment : void 0;
	}),

	placementClassName: Ember.computed('placement', function () {
		const placement = this.get('placement');
		return placement ? 'magma-popover-placement-'+placement : void 0;
	}),

	calculateAlignment() {
		const placement = this.get('placement');
		const alignment = this.get('alignment');
		const relativeElementRect = this.get('relativeElementRect');
		const absoluteElementRect = this.get('absoluteElementRect');

		let alignments;

		if (['top','bottom'].indexOf(placement) >= 0) {
			alignments = {
				left: () => {
					return relativeElementRect.left;
				},
				right: () => {
					return relativeElementRect.left + relativeElementRect.width - absoluteElementRect.width;
				},
				center: () => {
					return relativeElementRect.left + (relativeElementRect.width / 2) - (absoluteElementRect.width / 2);
				}
			};
		} else {
			alignments = {
				top: () => {
					return relativeElementRect.top;
				},
				bottom: () => {
					return relativeElementRect.top + relativeElementRect.height - absoluteElementRect.height;
				},
				center: () => {
					return relativeElementRect.top + (relativeElementRect.height / 2) - (absoluteElementRect.height / 2);
				}
			};
		}

		return alignments[alignment] ? alignments[alignment]() : alignments.center();
	},

	calculatePlacement() {
		const placement = this.get('placement');
		const relativeElementRect = this.get('relativeElementRect');
		const absoluteElementRect = this.get('absoluteElementRect');
		const absoluteElementMargins = this.get('absoluteElementMargins');

		var placements = {
			top: () => {
				return relativeElementRect.top - absoluteElementRect.height - absoluteElementMargins.bottom;
			},
			bottom: () => {
				return relativeElementRect.top + relativeElementRect.height + absoluteElementMargins.top;
			},
			left: () => {
				return relativeElementRect.left - absoluteElementRect.width - absoluteElementMargins.right;
			},
			right: () => {
				return relativeElementRect.left + relativeElementRect.width + absoluteElementMargins.left;
			}
		};

		return placements[placement] ? placements[placement]() : placements.right();
	},

	getPosition() {
		let position;
		if (['top','bottom'].indexOf(this.get('placement')) >= 0) {
			position = {
				left: this.calculateAlignment(),
				top: this.calculatePlacement()
			};
		} else {
			position = {
				left: this.calculatePlacement(),
				top: this.calculateAlignment()
			};
		}
		return position;
	}

});
