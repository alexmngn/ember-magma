/**
 * Selectbox
 *
 * @class Magma.Component.Selectbox
 *
 */

import Ember from 'ember';
import DisabledSupport from 'magma/mixins/disabled-support';
import InvalidSupport from 'magma/mixins/invalid-support';
import RequiredSupport from 'magma/mixins/required-support';

export default Ember.Select.extend(
	DisabledSupport,
	InvalidSupport,
	RequiredSupport, {

	attributeBindings: [
		'aria-describedby',
		'aria-label',
		'aria-labelledby'
	],

	classNames: ['magma-selectbox']
});