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
import DisabledSupport from 'ember-magma/mixins/disabled-support';
import PressedSupport from 'ember-magma/mixins/pressed-support';

const { inject, on } = Ember;

export default Ember.Component.extend(DisabledSupport,
	PressedSupport, {

	attributeBindings: [
		'disabled',
		'style',
		'tabindex',
		'title',
		'type'
	],

	classNames: ['magma-button'],

	tagName: 'button',

	magmaEvent: inject.service('magma-event'),

	/**
	 * Type of button, can be `button`, `submit` or `reset` as per HTML.
	 * @property type {String}
	 * @default button
	 * @public
	 */
	type: 'button',

	attrs: {

		/**
		 * This is the action that will be called whenever the user click on the button.
		 * @property on-click {Function}
		 * @public
		 */
		'on-click': void 0,

		/**
		 * The name is used to share events between the button and the button-group. Only used when part of a button-group.
		 * @property name {String}
		 * @public
		 */
		name: void 0,

		/**
		 * The value is used to share events between the button and the button-group. Only used when part of a button-group.
		 * @property value {String}
		 * @public
		 */
		value: void 0
	},

	/**
	 * On init, initialize the event between the button and the button group if needed.
	 * If the button as the pressed state set to true, the method `buttonClick` will be called after render.
	 * @method buttonInit
	 * @private
	 */
	buttonInit: on('init', function () {
		let name = this.getAttr('name');
		if (name) {
			this.get('magmaEvent').subscribe(name+'ButtonGroup', this, 'buttonGroupDidChange');
			if (this.getAttr('pressed')) {
				Ember.run.schedule('afterRender', this, this.get('buttonClick'));
			}
		}
	}),

	/**
	 * On willDestroyElement, teardown the event between the button and the button group if needed.
	 * @method buttonWillDestroyElement
	 * @private
	 */
	buttonWillDestroyElement: on('willDestroyElement', function () {
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
		this.setProperties({
			pressed: (event.value === this.getAttr('value')),
			disabled: event.disabled || false
		});
	},

	/**
	 * On click, will send the action set in `action` with the `value`.
	 * If part of a group, will send an event to the associated group.
	 * @method buttonClick
	 * @private
	 */
	buttonClick: on('click', function (event) {
		let name = this.getAttr('name');
		let onClickAction = this.getAttr('on-click');
		let value = this.getAttr('value');

		if (this.getAttr('disabled')) {
			return false;
		}

		if (event && event.preventDefault && event.stopPropagation) {
			event.preventDefault();
			event.stopPropagation();
		}

		if (onClickAction) {
			onClickAction();
		} else if (name) {
			this.get('magmaEvent').publish(name+'Button', {value: value});
		}
	})
});
