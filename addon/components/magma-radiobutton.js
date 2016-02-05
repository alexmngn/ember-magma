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

const { computed, observer, on } = Ember;

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

	tagName: 'input',

	type: 'radio',

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
		 * Value of the active radio
		 * @property activeValue {String}
		 * @public
		 */
		activeValue: void 0,

		/**
		 * Value of the radiobutton
		 * @property value {String}
		 * @public
		 */
		value: void 0,
	},

	/**
	 * On didInsertElement, check the state of the radio button
	 * @method radiobuttonDidInsertElement
	 * @private
	 */
	radiobuttonDidInsertElement: on('didInsertElement', function () {
		if (this.get('checked')) {
			this.radiobuttonDidChange();
		}

		if (this.get('value') && this.get('activeValue')) {
			this.radiobuttonActiveValueDidChange();
		}
	}),

	/**
	 * Observes activeValue, will set the radio button to checked if the activeValue is the same as the value of the radio button
	 * @method radiobuttonActiveValueDidChange
	 * @private
	 */
	radiobuttonActiveValueDidChange: observer('activeValue', function () {
		const value = this.get('value');
		const activeValue = this.get('activeValue');
		if (value && activeValue === value) {
			this.set('checked', true);
		} else if (activeValue !== value) {
			this.set('checked', false);
		}
	}),

	/**
	 * On change, will send an event to the associated group.
	 * @method radiobuttonDidChange
	 * @private
	 */
	radiobuttonDidChange: on('change', function() {
		const onChangeAction = this.getAttr('on-change');
		if (onChangeAction) {
			onChangeAction(this.get('value'));
		}
	})
});
