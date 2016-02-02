/**
 * Creates a tab list for the Magma.Component.Tabs
 *
 * @class Magma.Component.TabsList
 * @constructor
 * @extends Ember.Component
 */

import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({

	'aria-multiselectable': false,

	attributeBindings: [
		'aria-multiselectable',
		'role'
	],

	classNames: ['magma-tabs-list'],

	role: 'tablist',

	tagName: 'ul',

	magmaTabs: computed.alias('parentView'),

	attrs: {

		/**
		 * Id of the currently active panel
		 * @property attrs.activePanel {String}
		 * @public
		 */
		activePanel: void 0
	},

	actions: {
		tabDidInsert(tabId, panelId) {
			let onTabDidInsertAction = this.getAttr('on-tab-did-insert');
			if (onTabDidInsertAction) {
				onTabDidInsertAction(tabId, panelId);
			}
		},

		tabClick(id) {
			let onTabChangeAction = this.getAttr('on-tab-change');
			if (onTabChangeAction) {
				onTabChangeAction(id);
			}
		}
	}

});
