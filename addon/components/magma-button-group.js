/**
 * You can assemble multiple buttons within a group. They will behave about the same way a radiobutton will work. This is very useful if you want to create a navigation bar, or a multi-panel with tabs for example.
 *
 * @class Magma.Component.ButtonGroup
 * @constructor
 * @uses Magma.Mixin.DisabledSupport
 * @extends Ember.Component
 * @example
 * ```
 * {{#magma-button-group name="buttonGroupHello" value=buttonGroupLangValue}}
 *   {{#magma-button name="buttonGroupHello" value="Bonjour" pressed=true}} Bonjour {{/magma-button}}
 *   {{#magma-button name="buttonGroupHello" value="Hola"}} Hola {{/magma-button}}
 *   {{#magma-button name="buttonGroupHello" value="Hello"}} Hello {{/magma-button}}
 * {{/magma-button-group}}
 * ```
 */

import Ember from 'ember';
import DisabledSupport from 'ember-magma/mixins/disabled-support';

export default Ember.Component.extend(DisabledSupport, {

	attributeBindings: ['style'],

	classNames: ['magma-button-group'],

	magmaEvent: Ember.inject.service('magma-event'),

	/**
	 * This name is mandatory and should be the same in the group and the button itself. It allows to share the events between the two components.
	 * @property name {String}
	 * @public
	 */
	name: void 0,

	/**
	 * You can get the value of the current pressed button within this attribute. You can also set the default value.
	 * @property value {String}
	 * @public
	 */
	value: void 0,

	/**
	 * On init, initialize the event between the button and the button group.
	 * The method `triggerEvent` will be called after render.
	 * @method buttonInit
	 * @private
	 */
	buttonGroupInit: Ember.on('init', function () {
		let name = this.get('name');
		if (name) {
			this.get('magmaEvent').subscribe(name+'Button', this, 'buttonDidChange');
		}
		Ember.run.schedule('afterRender', this, this.triggerEvent);
	}),

	/**
	 * On willDestroyElement, teardown the event between the button and the button group.
	 * @method buttonGroupWillDestroyElement
	 * @private
	 */
	buttonGroupWillDestroyElement: Ember.on('willDestroyElement', function () {
		let name = this.get('name');
		if (name) {
			this.get('magmaEvent').unsubscribe(name+'Button');
		}
	}),

	/**
	 * Will send an event to the buttons when `name`, `value` or `disabled` change.
	 * @method triggerEvent
	 * @private
	 */
	triggerEvent: Ember.observer('name', 'value', 'disabled', function () {
		this.get('magmaEvent').publish(this.get('name')+'ButtonGroup', {
			value: this.get('value'),
			disabled: this.get('disabled')
		});
	}),

	/**
	 * Fired when one button state did change. It sets the `value` to the new value.
	 * @event buttonDidChange
	 * @private
	 */
	buttonDidChange(event) {
		this.set('value', event.value);
	}
});
