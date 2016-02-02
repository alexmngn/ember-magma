/**
 * Creates a tab list item for the Magma.Component.TabsList
 *
 * @class Magma.Component.TabsListItem
 * @constructor
 * @uses Magma.Mixin.DisabledSupport
 * @uses Magma.Mixin.SelectedSupport
 * @extends Ember.Component
 * @example
 * ```
 * {{magma-tabs-list}}
 * ```
 */

import Ember from 'ember';

import DisabledSupport from 'ember-magma/mixins/disabled-support';
import SelectedSupport from 'ember-magma/mixins/selected-support';

const { computed, on } = Ember;

export default Ember.Component.extend(
	DisabledSupport,
	SelectedSupport, {

	attributeBindings: [
		'ariaControls:aria-controls',
		'role'
	],

	classNames: ['magma-tabs-list-item'],

	role: 'tab',

	tagName: 'li',

	ariaControls: computed('attrs.for', function () {
		return this.getAttr('for');
	}),

	isActive: computed('attrs.active', 'attrs.activePanel', 'attrs.for', function () {
		if (!this.getAttr('activePanel') || !this.getAttr('for')) {
			return this.getAttr('active') || false;
		}
		return this.getAttr('activePanel') === this.getAttr('for') || false;
	}),

	selected: computed.alias('isActive'),

	attrs: {

		/**
		 * Id of the currently active panel
		 * @property attrs.activePanel {String}
		 * @public
		 */
		activePanel: void 0,

		/**
		 * This is the action that will be called whenever the user click on the tab.
		 * @property attrs.on-click {Function}
		 * @public
		 */
		'on-click': void 0,

		/**
		 * It corresponds to the id of the element that will trigger the popover to be displayed or hidden.
		 * @property attrs.for {String}
		 * @public
		 */
		for: void 0,

		/**
		 * When set to true, the current tab will be active
		 * @property attrs.active {Boolean}
		 * @public
		 */
		active: void 0
	},

	tabsListItemDidInsertElement: on('didInsertElement', function () {
		let onDidInsertAction = this.getAttr('on-did-insert');
		if (onDidInsertAction) {
			onDidInsertAction(this.get('elementId'), this.getAttr('for'));
		}

		if (this.get('active')) {
			this.tabsListItemClick();
		}
	}),

	tabsListItemClick: on('click', function () {
		let onClickAction = this.getAttr('on-click');
		if (onClickAction) {
			onClickAction(this.getAttr('for'));
		}
	})

});
