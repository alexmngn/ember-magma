/**
 * Checkbox
 *
 * @class Magma.Component.Checkbox
 *
 */

import Ember from 'ember';
import DisabledSupport from 'magma/mixins/disabled-support';
import InvalidSupport from 'magma/mixins/invalid-support';
import RequiredSupport from 'magma/mixins/required-support';

export default Ember.Checkbox.extend(DisabledSupport,
	InvalidSupport,
	RequiredSupport, {

	action: void 0,

	attributeBindings: [
		'checked',
		'disabled',
		'name',
		'style',
		'tabindex',
		'title',
		'value'
	],

	classNames: ['magma-checkbox'],

	tabindex: void 0,

	value: void 0
});