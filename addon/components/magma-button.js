/**
 * Button
 *
 * @class Magma.Component.Button
 *
 */

import Ember from 'ember';
import DisabledSupport from 'magma/mixins/disabled-support';
import PressedSupport from 'magma/mixins/pressed-support';

export default Ember.Component.extend(DisabledSupport,
	PressedSupport, {

	action: void 0,

	attributeBindings: [
		'disabled',
		'style',
		'tabindex',
		'title'
	],

	classNames: ['magma-button'],

	magmaEvent: Ember.inject.service('magma-event'),

	tabindex: void 0,

	tagName: 'button',

	type: 'button',

	value: void 0,

	initialize: Ember.on('init', function () {
		let name = this.get('name');
		if (name) {
			this.get('magmaEvent').subscribe(name+'ButtonGroup', this, 'buttonGroupDidChange');
		}
	}),

	teardown: Ember.on('willDestroyElement', function () {
		let name = this.get('name');
		if (name) {
			this.get('magmaEvent').unsubscribe(name+'ButtonGroup');
		}
	}),

	buttonGroupDidChange(event) {
		this.set('pressed', (event.value === this.get('value')));
		this.set('disabled', event.disabled || false);
	},

	gotClicked: Ember.on('click', function (event) {
		let name = this.get('name');
		let action = this.get('action');
		let value = this.get('value');

		if (this.get('disabled')) {
			return false;
		}

		if (event && event.preventDefault && event.stopPropagation) {
			event.preventDefault();
			event.stopPropagation();
		}

		if (action) {
			this.sendAction('action', value);
		} else if (name) {
			this.get('magmaEvent').publish(name+'Button', {value: value});
		}
	})
});