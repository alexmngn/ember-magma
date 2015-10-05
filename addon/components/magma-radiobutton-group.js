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

const { computed, inject, observer, on } = Ember;

export default Ember.Component.extend(DisabledSupport, {

	attributeBindings: ['style'],

	classNames: ['magma-radiobutton-group'],

	magmaEvent: inject.service('magma-event'),

	name: computed.alias('attrs.name', function () {
		return this.getAttr('name');
	}),

	value: computed.alias('attrs.value', function () {
		return this.getAttr('value');
	}),

	attrs: {

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

	/**
	 * On init, initialize the event between the radiobutton and the radiobutton group.
	 * The method `triggerEvent` will be called after render.
	 * @method radiobuttonGroupInit
	 * @private
	 */
	radiobuttonGroupInit: on('init', function () {
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
	radiobuttonGroupWillDestroyElement: on('willDestroyElement', function () {
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
	triggerEvent: observer('name', 'value', 'disabled', function () {
		this.get('magmaEvent').publish(this.get('name')+'RadiobuttonGroup', Ember.getProperties('value', 'disabled'));
	}),

	/**
	 * Fired when one radiobutton state did change. It calls the action set on `on-value-change`
	 * @event radiobuttonDidChange
	 * @private
	 */
	radiobuttonDidChange(event) {
		const onValueChangeAction = this.getAttr('on-value-change');
		if (onValueChangeAction) {
			onValueChangeAction(event.value);
		}
		this.set('value', event.value);
	}
});
