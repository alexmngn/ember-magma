/**
 * Textbox
 *
 * @class Magma.Component.Textbox
 *
 */

import Ember from 'ember';
import DisabledSupport from 'magma/mixins/disabled-support';
import InvalidSupport from 'magma/mixins/invalid-support';
import RequiredSupport from 'magma/mixins/required-support';

export default Ember.TextField.extend(
	DisabledSupport,
	InvalidSupport,
	RequiredSupport, {

	attributeBindings: [
		'aria-describedby',
		'aria-label',
		'aria-labelledby',
		'type'
	],

	classNames: ['magma-textbox'],

	type: 'text'
});
