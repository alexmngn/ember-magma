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
 * {{#magma-buttons value=buttonsInitialValue on-value-change=(action "buttonsValueDidChange") as |buttons|}}
 *   {{#buttons.button value="Bonjour" pressed=true}} Bonjour {{/buttons.button}}
 *   {{#buttons.button value="Hola"}} Hola {{/buttons.button}}
 *   {{#buttons.button value="Hello"}} Hello {{/buttons.button}}
 * {{/magma-buttons}}
 * ```
 */

import Ember from 'ember';
import DisabledSupport from 'ember-magma/mixins/disabled-support';
import PressedSupport from 'ember-magma/mixins/pressed-support';

const { computed, observer, on } = Ember;

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

	/**
	 * Type of button, can be `button`, `submit` or `reset` as per HTML.
	 * @property type {String}
	 * @default button
	 * @public
	 */
	type: 'button',

	/**
	 * @property activeValue
	 * @private
	 */
	activeValue: computed.oneWay('attrs.activeValue', function () {
		return this.getAttr('activeValue');
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
		 * This is the action that will be called whenever the user click on the button.
		 * @property on-click {Function}
		 * @public
		 */
		'on-click': void 0,

		/**
		 * Value of the active button, only used with the component `magma-buttons`
		 * @property activeValue {String}
		 * @public
		 */
		activeValue: void 0,

		/**
		 * Value of the button
		 * @property value {String}
		 * @public
		 */
		value: void 0
	},

	/**
	 * On didInsertElement, check the state of the button
	 * @method buttonDidInsertElement
	 * @private
	 */
	buttonDidInsertElement: on('didInsertElement', function () {
		if (this.get('pressed')) {
			this.buttonClick();
		}

		if (this.get('value') && this.get('activeValue')) {
			this.buttonActiveValueDidChange();
		}
	}),

	/**
	 * Observes activeValue, will set the button to pressed if the activeValue is the same as the value of the button
	 * @method buttonActiveValueDidChange
	 * @private
	 */
	buttonActiveValueDidChange: observer('activeValue', function () {
		const value = this.get('value');
		const activeValue = this.get('activeValue');
		if (value && activeValue === value) {
			this.set('pressed', true);
		} else if (activeValue !== value) {
			this.set('pressed', false);
		}
	}),

	/**
	 * On click, will send the action set in `on-click` with the `value` if defined.
	 * @method buttonClick
	 * @private
	 */
	buttonClick: on('click', function (event) {
		const onClickAction = this.getAttr('on-click');

		if (this.getAttr('disabled')) {
			return false;
		}

		if (event && event.preventDefault && event.stopPropagation) {
			event.preventDefault();
			event.stopPropagation();
		}

		if (onClickAction) {
			onClickAction(this.get('value') || null);
		}
	})
});
