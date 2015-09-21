/**
 * An alert box with different style and color, based on your need.
 * You can also create your own, it will add the class magma-alert-{alert} to the component, and you can style it the way you want.
 *
 * @class Magma.Component.Alert
 * @constructor
 * @extends Ember.Component
 * @example
 * ```
 * {{#magma-alert alert="error"}}
 *   Please enter your firstname
 * {{/magma-alert}}
 * ```
 */

 import Ember from 'ember';

 export default Ember.Component.extend({

	classNames: ['magma-alert'],

	classNameBindings: ['alertClassName'],

	/**
	 * Type of alert your want to display
	 * @property alert {String}
	 * @public
	 */
	alert: void 0,

	/**
	 * Class name of the alert box, based on `alert` property. It returns `magma-alert-{alert}`
	 * @property alertClassName {String}
	 * @private
	 */
	alertClassName: Ember.computed('alert', function () {
		const alert = this.get('alert');
		return alert ? 'magma-alert-'+alert : void 0;
	})

});
