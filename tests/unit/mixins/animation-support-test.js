import Ember from 'ember';
import AnimationSupportMixin from 'ember-magma/mixins/animation-support';
import { module, test } from 'qunit';

module('Unit | Mixin | animation support');

// Replace this with your real tests.
test('it works', function (assert) {
	var AnimationSupportObject = Ember.Object.extend(AnimationSupportMixin);
	var subject = AnimationSupportObject.create();
	assert.ok(subject);
});

test('animate', function (assert) {
	let AnimationSupportObject = Ember.Object.extend(AnimationSupportMixin);
	let subject = AnimationSupportObject.create();
	subject.$ = $;

	Ember.run(() => {
		subject.animate('fadeIn');
	});

	let animation1 = subject.get('animations').objectAt(0);
	assert.ok(animation1.animation === 'fadeIn', 'Animation is loaded');
	assert.ok(animation1.target === '', 'Target is valid');

	Ember.run(() => {
		subject.animate('fadeOut', '.target');
	});

	let animation2 = subject.get('animations').objectAt(1);
	assert.ok(animation2.animation === 'fadeOut', 'Animation is loaded');
	assert.ok(animation2.target === '.target', 'Target is valid');
});


test('stopAnimation', function (assert) {
	var AnimationSupportObject = Ember.Object.extend(AnimationSupportMixin);
	var subject = AnimationSupportObject.create();
	subject.$ = $;

	Ember.run(() => {
		subject.animate('fadeIn');
		subject.stopAnimation();
	});

	assert.ok(subject.get('animations.length') === 0, 'Animation has been removed');
});
