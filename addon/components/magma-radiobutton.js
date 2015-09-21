/**
 * A simple radiobutton. You can disable it, make it required or even have an invalid state set on it.
 *
 * @class Magma.Component.Radiobutton
 * @constructor
 * @uses Magma.Mixin.DisabledSupport
 * @uses Magma.Mixin.InvalidSupport
 * @uses Magma.Mixin.RequiredSupport
 * @extends Ember.Component
 * @example
 * ```
 * {{magma-radiobutton name="radiobuttonGroup" value="Hello"}}
 * ```
 */

import Ember from 'ember';
import DisabledSupport from 'ember-magma/mixins/disabled-support';
import InvalidSupport from 'ember-magma/mixins/invalid-support';
import RequiredSupport from 'ember-magma/mixins/required-support';

export default Ember.Component.extend(DisabledSupport,
	InvalidSupport,
	RequiredSupport, {

	attributeBindings: [
		'checked',
		'disabled',
		'name',
		'tabindex',
		'title',
		'type',
		'value'
	],

	classNames: ['magma-radiobutton'],

	magmaEvent: Ember.inject.service('magma-event'),

	tagName: 'input',

	type: 'radio',

	/**
	 * Value of the radiobutton
	 * @property value {String}
	 * @public
	 */
	value: void 0,

	/**
	 * On init, initialize the event between the radiobutton and the radiobutton group if needed.
	 * @method radiobuttonInit
	 * @private
	 */
	radiobuttonInit: Ember.on('init', function () {
		let name = this.get('name');
		if (name) {
			this.get('magmaEvent').subscribe(name+'RadiobuttonGroup', this, 'radiobuttonGroupDidChange');
		}
	}),

	/**
	 * On willDestroyElement, teardown the event between the radiobutton and the radiobutton group.
	 * @method radiobuttonWillDestroyElement
	 * @private
	 */
	radiobuttonWillDestroyElement: Ember.on('willDestroyElement', function () {
		let name = this.get('name');
		if (name) {
			this.get('magmaEvent').unsubscribe(name+'RadiobuttonGroup');
		}
	}),

	/**
	 * Fired when one radiobutton group state changes. It sets the `checked` and `disabled` states.
	 * @event radiobuttonGroupDidChange
	 * @private
	 */
	radiobuttonGroupDidChange(event) {
		this.set('checked', (event.value === this.get('value')));
		this.set('disabled', event.disabled || false);
	},

	/**
	 * On change, will send an event to the associated group.
	 * @method radiobuttonChange
	 * @private
	 */
	radiobuttonChange: Ember.on('change', function () {
		let name = this.get('name');

		if (this.get('disabled') || !name) {
			return false;
		}

		this.get('magmaEvent').publish(name+'Radiobutton', {value: this.get('value')});
	})
});
