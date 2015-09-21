/**
 * It's not always easy to bind a label to form field with Ember, especially with auto-generated IDs. This will allow you to create a label and to bind it to your input element. You can also create your own label
 *
 * @class Magma.Component.FormElement
 * @constructor
 * @extends Ember.Component
 * @example
 * ```
 * {{#magma-form-element label="Name:"}}
 *   {{magma-textbox value="Alex"}}
 * {{/magma-form-element}}
 *
 * {{#magma-form-element}}
	 {{magma-checkbox}} <label>I accept the terms and conditions</label>
 * {{/magma-form-element}}
 * ```
 */

import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['magma-form-element'],

	/**
	 * The label to be displayed
	 * @property label {String}
	 * @public
	 */
	label: void 0,

	/**
	 * On didInsertElement, create the attribute "for" to the label, based on the first input element in the {{yield}}
	 * @method formElementDidInsertElement
	 * @private
	 */
	formElementDidInsertElement: Ember.on('didInsertElement', function () {
		this.$('label').attr('for', this.$('input, textarea, select').first().attr('id'));
	})
});
