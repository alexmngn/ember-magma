/**
 * Radiobutton
 *
 * @class Magma.Component.Radiobutton
 *
 */

import Ember from 'ember';
import DisabledSupport from 'magma/mixins/disabled-support';
import InvalidSupport from 'magma/mixins/invalid-support';
import RequiredSupport from 'magma/mixins/required-support';

export default Ember.Component.extend(DisabledSupport,
	InvalidSupport,
	RequiredSupport, {

	action: void 0,

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

	tabindex: void 0,

	tagName: 'input',

	type: 'radio',

	value: void 0,

	initialize: Ember.on('init', function () {
		let name = this.get('name');
		if (name) {
			this.get('magmaEvent').subscribe(name+'RadiobuttonGroup', this, 'radiobuttonGroupDidChange');
		}
	}),

	teardown: Ember.on('willDestroyElement', function () {
		let name = this.get('name');
		if (name) {
			this.get('magmaEvent').unsubscribe(name+'RadiobuttonGroup');
		}
	}),

	radiobuttonGroupDidChange(event) {
		this.set('checked', (event.value === this.get('value')));
		this.set('disabled', event.disabled || false);
	},

	didChange: Ember.on('change', function () {
		let name = this.get('name');

		if (this.get('disabled') || !name) {
			return false;
		}

		this.get('magmaEvent').publish(name+'Radiobutton', {value: this.get('value')});
	})
});