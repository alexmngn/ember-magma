import Ember from 'ember';
export default Ember.Controller.extend({
	exampleFirstName: 'Alex',
	exampleLastName: '',
	exampleLastNameIsInvalid: Ember.computed.empty('exampleLastName'),
	exampleCityOptions: [{
		name:'Mississauga',
		value: 'Mississauga',
		group: 'Ontario'
	}, {
		name:'Montreal',
		value: 'Montreal',
		group: 'Quebec'
	},{
		name:'Ottawa',
		value: 'Ottawa',
		group: 'Ontario'
	},{
		name:'Quebec City',
		value: 'Quebec City',
		group: 'Quebec'
	},{
		name:'Sherbrooke',
		value: 'Sherbrooke',
		group: 'Quebec'
	},{
		name:'Toronto',
		value: 'Toronto',
		group: 'Ontario',
	}],

	exampleCity: Ember.computed('exampleCityOptions', function () {
		return this.get('exampleCityOptions')[5];
	}),

	exampleTerms: false,

	checkboxIsChecked: false,

	textboxIsInvalid: true,

	indexInit: Ember.on('init', function () {
		Ember.run.schedule('afterRender', this, function () {
			$('.stickem-wrapper').stickem();
		});
	}),

	actions: {
		scrollToAnchor(anchor) {
			$('html, body').animate({
				scrollTop: $('[data-anchor="'+anchor+'"]').offset().top - 30 //offset if required
			}, 400);
		}
	}
});
