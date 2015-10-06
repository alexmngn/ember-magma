/**
 * Adds support of the animations to a component
 *
 * @class Magma.Mixin.AnimationSupport
 * @constructor Ember.Mixin
 */

import Ember from 'ember';

const { computed, run, RSVP } = Ember;
const transitionEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

export default Ember.Mixin.create({

	/**
	 * @property animations
	 * @private
	 */
	animations: computed(function () {
		return Ember.A();
	}),

	/**
	 * Animate an element
	 * @method animate
	 * @param animation Type of animation (see animate.css documentation)
	 * @param target jQuery selector of the element you want to animate. By default, will target the current component.
	 * @protected
	 */
  	animate(animation, target) {
		const deferred = RSVP.defer();
		this.stopAnimation(target);

		this.get('animations').addObject({
			animation: animation,
			target: target || '',
			deferred: deferred
		});

		run.scheduleOnce('afterRender', this, function () {
			let classes = 'animated ' + animation;

			this.$(target)
				.one(transitionEnd, run.bind(this, () => {
					this.stopAnimation(target);
				}))
				.addClass(classes);
		});

		return deferred.promise;
	},

	/**
	 * Stop the animation of an element
	 * @method stopAnimation
	 * @param target jQuery selector of the element you want to stop the animation. By default, will target the current component.
	 * @protected
	 */
	stopAnimation(target = '') {
		let animations = this.get('animations');
		const animationObject = animations.findBy('target', target);

		if (animationObject) {
			run.scheduleOnce('render', this, function () {
				animations.removeObject(animationObject);
				animationObject.deferred.resolve();
				this.$(animationObject.target).removeClass('animated ' + animationObject.animation);
			});
		}
	}

});
