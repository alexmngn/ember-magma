/**
 * Creates a drop-down list using the select tag.
 *
 * @class Magma.Component.Selectbox
 * @constructor
 * @uses Magma.Mixin.DisabledSupport
 * @uses Magma.Mixin.InvalidSupport
 * @uses Magma.Mixin.RequiredSupport
 * @extends Ember.Component
 * @example
 * ```
 * {{magma-selectbox content=cityOptions optionLabelPath="name" optionValuePath="value"}}
 * ```
 */

import Ember from 'ember';
import DisabledSupport from 'ember-magma/mixins/disabled-support';
import InvalidSupport from 'ember-magma/mixins/invalid-support';
import RequiredSupport from 'ember-magma/mixins/required-support';

export default Ember.Component.extend(
	DisabledSupport,
	InvalidSupport,
	RequiredSupport, {

	attributeBindings: [
		'autofocus',
		'aria-describedby',
		'aria-label',
		'aria-labelledby',
		'disabled',
		'readonly',
		'required'
	],

	classNames: ['magma-selectbox'],

	tagName: 'select',

	/**
	 * You can call an action when the drop-down did change. It will have the `selection` in parameter
	 * @property action {String}
	 * @public
	 */
	action: void 0,

	/**
	 * An array containing objects to be displayed in the drop-down.
	 * @property content {Array}
	 * @public
	 */
	content: null,

	/**
	 * You can define a first item to be displayed when there is no selection.
	 * @property promt {String}
	 * @public
	 */
	prompt: null,

	/**
	 * It specifies the path on each object to the desired property for the element's text.
	 * @property optionValuePath {String}
	 * @default id
	 * @public
	 */
	optionValuePath: 'id',

	/**
	 * Option is used to specify the path on each object to the desired property for the value attribute.
	 * @property optionLabelPath {String}
	 * @default title
	 * @public
	 */
	optionLabelPath: 'title',

	/**
	 * This contains the currently selected object in the drop-down. It can be set with the item to display.
	 * @property selection {Object}
	 * @public
	 */
	selection: void 0,

	/**
	 * On init, will set the `content` to an empty array if not defined.
	 * If not defined, the `selection` will be set by default to the first value of the content after render.
	 * @method selectboxInit
	 * @private
	 */
	selectboxInit: Ember.on('init', function () {
		if (!this.get('content')) {
			this.set('content', []);
		}
		Ember.run.schedule('afterRender', this, () => {
			if (!this.get('selection') && !this.get('prompt') && this.get('content.length') > 0) {
				this.set('selection', this.get('content')[0]);
			}
		});
	}),

	/**
	 * On change, the `selection` is set to the selected item.
	 * If `action` is defined, will send the action with `selection` in parameter.
	 * @method selectionChange
	 * @private
	 */
	selectionChange: Ember.on('change', function () {
		const selectedIndex = this.$()[0].selectedIndex;
		const selection = this.get('content')[!!this.get('prompt') ? selectedIndex - 1 : selectedIndex];
		const action = this.get('action');
		this.set('selection', selection);
		if (action) {
			this.sendAction(action, selection);
		}
	})
});
