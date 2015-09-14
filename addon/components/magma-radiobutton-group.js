/**
 * Radiobutton Group
 *
 * @class Magma.Component.RadiobuttonGroup
 *
 */

import Ember from 'ember';
import DisabledSupport from 'magma/mixins/disabled-support';

export default Ember.Component.extend(DisabledSupport, {

	classNames: ['magma-radiobutton-group'],

	magmaEvent: Ember.inject.service('magma-event'),

	name: void 0,

	value: void 0,

	initialize: Ember.on('init', function () {
		let name = this.get('name');
		if (name) {
			this.get('magmaEvent').subscribe(name+'Radiobutton', this, 'radiobuttonDidChange');
		}
	}),

	insert: Ember.on('didInsertElement', function () {
		this.triggerEvent();
	}),

	teardown: Ember.on('willDestroyElement', function () {
		let name = this.get('name');
		if (name) {
			this.get('magmaEvent').unsubscribe(name+'Radiobutton');
		}
	}),

	triggerEvent: Ember.observer('name', 'value', 'disabled', function () {
		this.get('magmaEvent').publish(this.get('name')+'RadiobuttonGroup', {
			value: this.get('value'),
			disabled: this.get('disabled')
		});
	}),

	radiobuttonDidChange(event) {
		this.set('value', event.value);
	}
});