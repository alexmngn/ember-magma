/**
 * Adds support of the dynamic positioning to a component
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

	classNameBindings: [
		'alignmentClassName',
		'placementClassName'
	],

	/**
	 * @property absoluteElement {Object}
	 * @private
	 */
	absoluteElement: Ember.computed(function () {
		return this.$();
	}),

	/**
	 * @property absoluteElementRect {Object}
	 * @private
	 */
	absoluteElementRect: Ember.computed('absoluteElement', function () {
		return boundingClientRect(this.get('absoluteElement'));
	}),

	/**
	 * @property absoluteElementMargins {Object}
	 * @private
	 */
	absoluteElementMargins: Ember.computed('absoluteElement', function () {
		return marginsClient(this.get('absoluteElement'));
	}),

	/**
	 * Class name corresponding to the alignment `magma-position-alignment-{alignment}`
	 * @property alignmentClassName {String}
	 * @private
	 */
	alignmentClassName: Ember.computed('alignment', function () {
		const alignment = this.get('alignment');
		const placement = this.get('placement');
		let returnValue = 'magma-position-alignment-';
		if (['top','bottom'].indexOf(placement) >= 0 && ['left', 'center', 'right'].indexOf(alignment) >= 0 ||
			['left','right'].indexOf(placement) >= 0 && ['top', 'center', 'bottom'].indexOf(alignment) >= 0) {
			return returnValue+alignment;
		}
		return returnValue+'center';
	}),

	/**
	 * You can align the component to a side of the `relatedElement`. When the placement is set to top or bottom, you can align it on the left, the right or center. When the placement is set to left or right, you can align it at the top, the bottom or center.
	 * @property alignment {String}
	 * @default top
	 * @private
	 */
	alignment: 'center',

	/**
	 * Class name corresponding to the placement `magma-position-alignment-{alignment}`
	 * @property alignmentClassName {String}
	 * @private
	 */
	placementClassName: Ember.computed('placement', function () {
		const placement = this.get('placement');
		let returnValue = 'magma-position-placement-';
		if (['top', 'right', 'bottom', 'left'].indexOf(placement) >= 0) {
			return returnValue+placement;
		}
		return returnValue+'top';
	}),

	/**
	 * You decide if you want the component to be display on top, on the left, on the right or at the bottom of the `relatedElement`.
	 * @property placement {String}
	 * @default center
	 * @public
	 */
	placement: 'top',

	/**
	 * @property relatedElement {Object}
	 * @protected
	 */
	relatedElement: void 0,

	/**
	 * @property relativeElementRect {Object}
	 * @private
	 */
	relativeElementRect: Ember.computed('relativeElement', function () {
		const relativeElement = this.get('relativeElement');
		return relativeElement.length > 0 ? boundingClientRect(relativeElement) : void 0;
	}),

	/**
	 * @method calculateAlignment
	 * @return {Number} Position `left` or `top` of the component, based on the placement and alignment.
	 */
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

	/**
	 * @method calculatePlacement
	 * @return {Number} Position `left` or `top` of the component, based on the placement
	 */
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

		return placements[placement] ? placements[placement]() : placements.top();
	},

	/**
	 * @method getPosition
	 * @return {Object} Position of the component
	 */
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
