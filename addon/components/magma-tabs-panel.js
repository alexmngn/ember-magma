/**
 * Creates a tab panel for the Magma.Component.Tabs
 *
 * @class Magma.Component.TabsPanel
 * @constructor
 * @uses Magma.Mixin.HiddenSupport
 * @extends Ember.Component
 */

import Ember from 'ember';

import HiddenSupport from 'ember-magma/mixins/hidden-support';

const { computed, observer, on, run } = Ember;

export default Ember.Component.extend(
	HiddenSupport, {

	attributeBindings: [
		'ariaLabelledBy:aria-labelledBy',
		'role'
	],

	classNames: ['magma-tabs-panel'],

	classNameBindings: ['isActive:magma-tabs-active'],

	role: 'tabpanel',

	ariaLabelledBy: void 0,

	hidden: computed.not('isActive'),

	/**
	 * Id of the currently active panel
	 * @property attrs.activePanel {String}
	 * @public
	 */
	isActive: computed('attrs.activePanel', function () {
		return this.getAttr('activePanel') === this.get('elementId');
	}),

	attrs: {

		/**
		 * Id of the currently active panel
		 * @property attrs.activePanel {String}
		 * @public
		 */
		activePanel: void 0,

		/**
		 * @property attrs.tabs {Array}
		 * @private
		 */
		tabs: void 0
	},

	tabsDidChange: on('init', observer('attrs.tabs', function () {
		run.scheduleOnce('afterRender', this, () => {
			this.getAttr('tabs').forEach((tab) => {
				if (!this.get('ariaLabelledBy') && tab[this.get('elementId')]) {
					this.set('ariaLabelledBy', tab[this.get('elementId')]);
				}
			});
		});
	}))
});
