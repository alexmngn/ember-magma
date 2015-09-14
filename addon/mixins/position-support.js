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

export default Ember.Mixin.create({

	autoPosition: true,

	alignment: 'top',

	placement: 'right',

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

		console.log(relativeElementRect, absoluteElementRect);

		let alignments;

		if (['top','bottom'].indexOf(placement) > 0) {
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
		var placements = {
			top: () => {
				return relativeElementRect.top - absoluteElementRect.height;
			},
			bottom: () => {
				return relativeElementRect.top + relativeElementRect.height;
			},
			left: () => {
				return relativeElementRect.left - absoluteElementRect.width;
			},
			right: () => {
				return relativeElementRect.left + relativeElementRect.width;
			}
		};

		return placements[placement] ? placements[placement]() : placements.right();
	},

	getPosition() {
		const alignment = this.get('alignment');
		const placement = this.get('placement');

		if (['top','bottom'].indexOf(placement) > 0) {
			return {
				left: this.calculateAlignment(alignment),
				top: this.calculatePlacement(placement)
			};
		} else {
			return {
				left: this.calculatePlacement(placement),
				top: this.calculateAlignment(alignment)
			};
		}
	}

});
