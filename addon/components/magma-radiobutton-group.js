/**
 * A radiobutton doesn't work alone, they work in group. With this component, you can get the value of the current selected radiobutton.
 *
 * @class Magma.Component.RadiobuttonGroup
 * @constructor
 * @uses Magma.Mixin.DisabledSupport
 * @extends Ember.Component
 * @example
 * ```
 * {{magma-radiobutton-group name="radiobuttonHelloGroup" value=radiobuttonHelloGroupValue}}
 *   {{magma-radiobutton name="radiobuttonHelloGroup" value="Bonjour"}}
 *   {{magma-radiobutton name="radiobuttonHelloGroup" value="Hola"}}
 *   {{magma-radiobutton name="radiobuttonHelloGroup" value="Hello"}}
 * {{/magma-radiobutton-group}}
 * ```
 */


import Ember from 'ember';
import DisabledSupport from 'ember-magma/mixins/disabled-support';

export default Ember.Component.extend(DisabledSupport, {

	classNames: ['magma-radiobutton-group'],

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
	 * On init, initialize the event between the radiobutton and the radiobutton group.
	 * The method `triggerEvent` will be called after render.
	 * @method radiobuttonGroupInit
	 * @private
	 */
	radiobuttonGroupInit: Ember.on('init', function () {
		let name = this.get('name');
		if (name) {
			this.get('magmaEvent').subscribe(name+'Radiobutton', this, 'radiobuttonDidChange');
		}
		Ember.run.schedule('afterRender', this, this.triggerEvent);
	}),

	/**
	 * On willDestroyElement, teardown the event between the radiobutton and the radiobutton group.
	 * @method radiobuttonWillDestroyElement
	 * @private
	 */
	radiobuttonGroupWillDestroyElement: Ember.on('willDestroyElement', function () {
		let name = this.get('name');
		if (name) {
			this.get('magmaEvent').unsubscribe(name+'Radiobutton');
		}
	}),

	/**
	 * Will send an event to the radiobuttons when `name`, `value` or `disabled` change.
	 * @method triggerEvent
	 * @private
	 */
	triggerEvent: Ember.observer('name', 'value', 'disabled', function () {
		this.get('magmaEvent').publish(this.get('name')+'RadiobuttonGroup', {
			value: this.get('value'),
			disabled: this.get('disabled')
		});
	}),

	/**
	 * Fired when one radiobutton state did change. It sets the `value` to the new value.
	 * @event radiobuttonDidChange
	 * @private
	 */
	radiobuttonDidChange(event) {
		this.set('value', event.value);
	}
});
