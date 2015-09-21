/**
 * The button is something very important in a web page. You can use the classes magma-small or magma-large to change the size of the component.
 *
 * @class Magma.Component.Button
 * @constructor
 * @uses Magma.Mixin.DisabledSupport
 * @uses Magma.Mixin.PressedSupport
 * @extends Ember.Component
 * @example
 * ```
 * {{#magma-button-group name="buttonGroupHello" value=buttonGroupLangValue}}
 *   {{#magma-button name="buttonGroupHello" value="Bonjour" pressed=true}} Bonjour {{/magma-button}}
 *	 {{#magma-button name="buttonGroupHello" value="Hola"}} Hola {{/magma-button}}
 *	 {{#magma-button name="buttonGroupHello" value="Hello"}} Hello {{/magma-button}}
 * {{/magma-button-group}}
 * ```
 */

import Ember from 'ember';
import DisabledSupport from 'magma/mixins/disabled-support';
import PressedSupport from 'magma/mixins/pressed-support';

export default Ember.Component.extend(DisabledSupport,
	PressedSupport, {


	attributeBindings: [
		'disabled',
		'style',
		'tabindex',
		'title'
	],

	classNames: ['magma-button'],

	tagName: 'button',

	magmaEvent: Ember.inject.service('magma-event'),

	/**
	 * This is the name of the action that will be called whenever the user click on the button.
	 * @property action {String}
	 * @public
	 */
	action: void 0,

	/**
	 * The name is used to share events between the button and the button-group. Only used when part of a button-group.
	 * @property name {String}
	 * @public
	 */
	name: void 0,

	/**
	 * Type of button, can be `button`, `submit` or `reset` as per HTML..
	 * @property type {String}
	 * @public
	 */
	type: 'button',

	/**
	 * Value to send with the action.
	 * @property value {Object}
	 * @public
	 */
	value: void 0,

	/**
	 * On init, initialize the event between the button and the button group if needed.
	 * If the button as the pressed state set to true, the method `buttonClick` will be called after render.
	 * @method buttonInit
	 * @private
	 */
	buttonInit: Ember.on('init', function () {
		let name = this.get('name');
		if (name) {
			this.get('magmaEvent').subscribe(name+'ButtonGroup', this, 'buttonGroupDidChange');
			if (this.get('pressed')) {
				Ember.run.schedule('afterRender', this, this.buttonClick);
			}
		}
	}),

	/**
	 * On willDestroyElement, teardown the event between the button and the button group if needed.
	 * @method buttonWillDestroyElement
	 * @private
	 */
	buttonWillDestroyElement: Ember.on('willDestroyElement', function () {
		let name = this.get('name');
		if (name) {
			this.get('magmaEvent').unsubscribe(name+'ButtonGroup');
		}
	}),

	/**
	 * Fired when the button group state changes. It sets the `pressed` and `disabled` states.
	 * @param {Object} event Event
	 * @event buttonGroupDidChange
	 * @private
	 */
	buttonGroupDidChange(event) {
		this.set('pressed', (event.value === this.get('value')));
		this.set('disabled', event.disabled || false);
	},

	/**
	 * On click, will send the action set in `action` with the `value`.
	 * If part of a group, will send an event to the associated group.
	 * @method buttonClick
	 * @private
	 */
	buttonClick: Ember.on('click', function (event) {
		let name = this.get('name');
		let action = this.get('action');
		let value = this.get('value');

		if (this.get('disabled')) {
			return false;
		}

		if (event && event.preventDefault && event.stopPropagation) {
			event.preventDefault();
			event.stopPropagation();
		}

		if (action) {
			this.sendAction('action', value);
		} else if (name) {
			this.get('magmaEvent').publish(name+'Button', {value: value});
		}
	})
});
