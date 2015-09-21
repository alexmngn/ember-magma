/**
 * Creates a multi-line text input using the textarea tag.
 *
 * @class Magma.Component.Textarea
 * @constructor
 * @uses Magma.Mixin.DisabledSupport
 * @uses Magma.Mixin.InvalidSupport
 * @uses Magma.Mixin.RequiredSupport
 * @extends Ember.Component
 * @example
 * ```
 * {{magma-textarea value="I love to play with fire!"}}
 * ```
 */

import Ember from 'ember';
import DisabledSupport from 'ember-magma/mixins/disabled-support';
import InvalidSupport from 'ember-magma/mixins/invalid-support';
import RequiredSupport from 'ember-magma/mixins/required-support';

export default Ember.TextArea.extend(
	DisabledSupport,
	InvalidSupport,
	RequiredSupport, {

	attributeBindings: [
		'aria-describedby',
		'aria-label',
		'aria-labelledby',
		'disabled',
		'maxlength',
		'readonly',
		'required'
	],

	classNames: ['magma-textarea']
});
