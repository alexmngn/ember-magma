/**
 * Animation
 *
 * @class Magma.Mixin.AnimationSupport
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

export default Ember.Mixin.create({

	animationIn: 'fade',

	animationOut: 'fade',

	classNameBindings: ['animationInClassName', 'animationOutClassName'],

	animationInClassName: Ember.computed('animationIn', function () {
		return 'magma-animation-in-'+this.get('animationIn');
	}),

	animationOutClassName: Ember.computed('animationIn', function () {
		return 'magma-animation-out-'+this.get('animationOut');
	})
});
