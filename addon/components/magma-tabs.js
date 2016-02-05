/**
 * Creates a tabs system
 *
 * @class Magma.Component.Tabs
 * @constructor
 * @uses Magma.Mixin.DisabledSupport
 * @extends Ember.Component
 * @example
 * ```
 * {{#magma-tabs as |tabs|}}
 *	{{#tabs.list as |list|}}
 *		{{#list.item for="tabpanel1" active=true}}
 *			Tab 1
 *		{{/list.item}}
 *		{{#list.item for="tabpanel2"}}
 *			Tab 2
 *		{{/list.item}}
 *	{{/tabs.list}}
 *
 *	{{#tabs.panel id="tabpanel1"}}
 *		Panel 1
 *	{{/tabs.panel}}
 *	{{#tabs.panel id="tabpanel2"}}
 *		Panel 2
 *	{{/tabs.panel}}
 *{{/magma-tabs}}
 * ```
 */

import Ember from 'ember';

import DisabledSupport from 'ember-magma/mixins/disabled-support';

export default Ember.Component.extend(
	DisabledSupport, {

	attributeBindings: [
		'role'
	],

	classNames: ['magma-tabs'],

	role: 'tab',

	/**
	 * Array of tabs with the key as the ID of the panel and the value as the ID of the tab.
	 * This array is used to create the relationship between the tab and the panel for ARIA.
	 * @property tabs {Array}
	 * @private
	 */
	tabs: Ember.A(),

	actions: {

		/**
		 * Fired when a tab gets created, this event is called to save the tab ID and the panel ID.
		 * @event tabRegister
		 * @private
		 */
		tabRegister(tabId, panelId) {
			let tab = [];
			tab[panelId] = tabId;
			this.get('tabs').push(tab);
		},

		/**
		 * Fired when the user clicked a tab and a new panel is activated.
		 * @event tabChange
		 * @private
		 */
		tabChange(id) {
			if (id) {
				this.set('activePanel', id);
			}
		}
	}

});
