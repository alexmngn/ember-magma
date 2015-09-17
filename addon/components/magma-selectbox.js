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

export default Ember.Component.extend(
	DisabledSupport,
	InvalidSupport,
	RequiredSupport, {

	action: void 0,

	attributeBindings: [
		'aria-describedby',
		'aria-label',
		'aria-labelledby'
	],

	classNames: ['magma-selectbox'],

	content: null,

	prompt: null,

	optionValuePath: 'id',

	optionLabelPath: 'title',

	selection: void 0,

	tagName: 'select',

	selectboxInit: Ember.on('init', function () {
		if (!this.get('content')) {
			this.set('content', []);
		}
	}),

	selectionDidChange: Ember.on('change', function () {
		const selectedIndex = this.$()[0].selectedIndex;
		const selection = this.get('content')[!!this.get('prompt') ? selectedIndex - 1 : selectedIndex];
		const action = this.get('action');
		this.set('selection', selection);
		if (action) {
			action(selection);
		}
	})
});
