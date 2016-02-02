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

	tabs: Ember.A(),

	actions: {
		tabRegister(tabId, panelId) {
			let tab = [];
			tab[panelId] = tabId;
			this.get('tabs').push(tab);
		},

		tabChange(id) {
			if (id) {
				this.set('activePanel', id);
			}
		}
	}

});
