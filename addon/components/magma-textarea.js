/**
 * Textarea
 *
 * @class Magma.Component.Textarea
 *
 */

import Ember from 'ember';
import DisabledSupport from 'magma/mixins/disabled-support';
import InvalidSupport from 'magma/mixins/invalid-support';
import RequiredSupport from 'magma/mixins/required-support';

export default Ember.TextArea.extend(
	DisabledSupport,
	InvalidSupport,
	RequiredSupport, {

	attributeBindings: [
		'aria-describedby',
		'aria-label',
		'aria-labelledby'
	],

	classNames: ['magma-textarea']
});