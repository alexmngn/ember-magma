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

	animations: computed(function () {
		return Ember.A();
	}),

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

	stopAnimation(target = '') {
		let animations = this.get('animations');
		const animationObject = animations.findBy('target', target);

		if (animationObject) {
			animations.removeObject(animationObject);
			animationObject.deferred.resolve();
			this.$(animationObject.target).removeClass('animated ' + animationObject.animation);
		}
	}

});
