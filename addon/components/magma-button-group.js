/**
 * Button Group
 *
 * @class Magma.Component.ButtonGroup
 *
 */

import Ember from 'ember';
import DisabledSupport from 'magma/mixins/disabled-support';

export default Ember.Component.extend(DisabledSupport, {

	classNames: ['magma-button-group'],

	magmaEvent: Ember.inject.service('magma-event'),

	attributeBindings: ['style'],

	name: void 0,

	value: void 0,

	initialize: Ember.on('init', function () {
		let name = this.get('name');
		if (name) {
			this.get('magmaEvent').subscribe(name+'Button', this, 'buttonDidChange');
		}
	}),

	insert: Ember.on('didInsertElement', function () {
		this.triggerEvent();
	}),

	teardown: Ember.on('willDestroyElement', function () {
		let name = this.get('name');
		if (name) {
			this.get('magmaEvent').unsubscribe(name+'Button');
		}
	}),

	triggerEvent: Ember.observer('name', 'value', 'disabled', function () {
		this.get('magmaEvent').publish(this.get('name')+'ButtonGroup', {
			value: this.get('value'),
			disabled: this.get('disabled')
		});
	}),

	buttonDidChange(event) {
		this.set('value', event.value);
	}
});