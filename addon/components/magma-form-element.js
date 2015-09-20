/**
 * Form Element
 *
 * @class Magma.Component.FormElement
 *
 */

import Ember from 'ember';

export default Ember.Component.extend({
	classNames: ['magma-form-element'],

	label: void 0,

	didInsertElement() {
		this.$('label').attr('for', this.$('input, textarea, select').first().attr('id'));
	}
});
