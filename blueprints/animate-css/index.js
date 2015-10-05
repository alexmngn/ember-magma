/* global module */

module.exports = {
	normalizeEntityName: function() {},

	afterInstall: function() {
		return this.addBowerPackageToProject('animate.css');
	}
};
