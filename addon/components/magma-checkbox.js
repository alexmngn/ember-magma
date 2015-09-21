/**
 * A simple checkbox. You can disable it, make it required or even have an invalid state set on it.
 *
 * @class Magma.Component.Checkbox
 * @constructor
 * @uses Magma.Mixin.DisabledSupport
 * @uses Magma.Mixin.InvalidSupport
 * @uses Magma.Mixin.RequiredSupport
 * @extends Ember.Component
 * @example
 * ```
 * {{magma-checkbox name="checkbox" checked=true}}
 * ```
 */

import Ember from 'ember';
import DisabledSupport from 'ember-magma/mixins/disabled-support';
import InvalidSupport from 'ember-magma/mixins/invalid-support';
import RequiredSupport from 'ember-magma/mixins/required-support';

export default Ember.Checkbox.extend(DisabledSupport,
	InvalidSupport,
	RequiredSupport, {

	attributeBindings: [
		'checked',
		'disabled',
		'name',
		'style',
		'tabindex',
		'title'
	],

	classNames: ['magma-checkbox'],

	/**
	 * When set to true, the checkbox is ticked
	 * @property checked {Boolean}
	 */
	checked: void 0
});
