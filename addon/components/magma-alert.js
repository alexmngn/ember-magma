/**
 * Alert
 *
 * @class Magma.Component.Alert
 *
 */

 import Ember from 'ember';

 export default Ember.Component.extend({

	alert: void 0,

	classNames: ['magma-alert'],

	classNameBindings: ['alertClassName'],

	alertClassName: Ember.computed('alert', function () {
		const alert = this.get('alert');
		return alert ? 'magma-alert-'+alert : void 0;
	})

 });