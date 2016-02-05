/**
 * You can assemble multiple buttons within a group. They will behave about the same way a radiobutton will work. This is very useful if you want to create a navigation bar for example.
 *
 * @class Magma.Component.Buttons
 * @constructor
 * @uses Magma.Mixin.DisabledSupport
 * @extends Ember.Component
 * @example
 * ```
 * {{magma-buttons on-value-change=(action 'buttonsValueDidChange') as |buttons|}}
 *   {{#buttons.button value="Bonjour"}} Bonjour {{/buttons.button}}
 *   {{#buttons.button value="Hola"}} Hola {{/buttons.button}}
 *   {{#buttons.button value="Hello"}} Hello {{/buttons.button}}
 * {{/magma-buttons}}
 * ```
 */

import Ember from 'ember';
import DisabledSupport from 'ember-magma/mixins/disabled-support';

const { computed, run } = Ember;

export default Ember.Component.extend(
	DisabledSupport, {

	attributeBindings: ['style'],

	classNames: ['magma-buttons'],

	/**
	 * @property value {String}
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
		 * You can set the value of the current pressed button with this attribute
		 * @property value {String}
		 * @public
		 */
		value: void 0
	},

	actions: {

		/**
		 * Fired when one button gets clicked. It calls the action set on `on-value-change`
		 * @event buttonClick
		 * @private
		 */
		buttonClick(value) {
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
