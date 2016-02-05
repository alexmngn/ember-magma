/**
 * A radiobutton doesn't work alone, they work in group. With this component, you can get the value of the current selected radiobutton.
 *
 * @class Magma.Component.Radiobuttons
 * @constructor
 * @uses Magma.Mixin.DisabledSupport
 * @extends Ember.Component
 * @example
 * ```
 * {{magma-radiobuttons name="radiobuttonsHello" on-value-change=(action 'radiobuttonsValueDidChange') as |radiobuttons|}}
 *   {{radiobuttons.button value="Bonjour"}}
 *   {{radiobuttons.button value="Hola"}}
 *   {{radiobuttons.button value="Hello"}}
 * {{/magma-radiobuttons}}
 * ```
 */

import Ember from 'ember';
import DisabledSupport from 'ember-magma/mixins/disabled-support';

const { computed, run } = Ember;

export default Ember.Component.extend(
	DisabledSupport, {

	attributeBindings: ['style'],

	classNames: ['magma-radiobuttons'],

	/**
	 * @property name
	 * @private
	 */
	name: computed.oneWay('attrs.name', function () {
		return this.getAttr('name');
	}),

	/**
	 * @property value
	 * @private
	 */
	value: computed.oneWay('attrs.value', function () {
		return this.getAttr('value');
	}),

	attrs: {

		/**
		 * This is the action that will be called whenever the value of the group changes. The action will receive the value as a parameter.
		 * @property on-value-change {Function}
		 * @public
		 */
		'on-value-change': void 0,

		/**
		 * This name is mandatory and should be the same in the group and the radiobutton itself. It allows to share the events between the two components.
		 * @property name {String}
		 * @public
		 */
		name: void 0,

		/**
		 * You can set the value of the current ticked radiobutton with this attribute.
		 * @property value {String}
		 * @public
		 */
		value: void 0
	},

	actions: {

		/**
		 * Fired when one radiobutton state did change. It calls the action set on `on-value-change`
		 * @event radiobuttonDidChange
		 * @private
		 */
		radiobuttonChange(value) {
			const onValueChangeAction = this.getAttr('on-value-change');
			if (onValueChangeAction) {
				onValueChangeAction(value);
			}
			run.schedule('render', this, () => {
				this.set('value', value);
			});
		}
	}
});
