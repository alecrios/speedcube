export default {
	methods: {
		$_isInert(element) {
			return Boolean(element.closest('[inert]'));
		},
		$_togglePageInert(inert) {
			document.querySelector('.head').inert = inert;
			document.querySelector('.body').inert = inert;
		},
	},
};
