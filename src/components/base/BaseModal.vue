<template>
	<div
		class="backdrop"
		@click.self="onOutsideClick"
		@keydown.esc.stop="$emit('close')"
	>
		<div class="container">
			<BaseForm ref="form">
				<slot></slot>
			</BaseForm>
		</div>
	</div>
</template>

<script>
import inert from '@/mixins/inert';

export default {
	name: 'BaseModal',
	mixins: [inert],
	data() {
		return {
			previouslyFocusedElement: null,
		};
	},
	methods: {
		focusFirstFocusableElement() {
			const focusableElements = this.$refs.form.$el.querySelectorAll('button, input, select');

			let elementToFocus = focusableElements[0];

			// If the element is a radio button, focus the selected item in that group
			if (elementToFocus.matches('input[type="radio"]')) {
				const radioGroupName = elementToFocus.getAttribute('name');
				elementToFocus = this.$refs.form.$el
					.querySelector(`input[type="radio"][name="${radioGroupName}"]:checked`);
			}

			elementToFocus.focus();
		},
		onOutsideClick() {
			// This prevents the modal from closing when you mouseup over the backdrop while
			// overshooting an input field during text selection.
			if (document.activeElement.tagName !== 'BODY') return;

			this.$emit('close');
		},
	},
	mounted() {
		// Grab a reference to the element that was focused before modal opened
		this.previouslyFocusedElement = document.activeElement;

		// Focus the first focusable element in the modal
		this.focusFirstFocusableElement();

		// Make the rest of the page inert to trap the user's focus
		this.$_togglePageInert(true);
	},
	beforeDestroy() {
		// Make the rest of the page usable again
		this.$_togglePageInert(false);

		// Return focus to the element that was focused before the modal opened
		this.previouslyFocusedElement.focus();
	},
};
</script>

<style scoped>
.backdrop {
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: flex-start;
	justify-content: center;
	padding: 1.5rem;
	overflow-y: auto;
	background-color: var(--color-backdrop);
}

.container {
	width: 100%;
	max-width: 20rem;
	background-color: var(--color-slate);
	border-top: .125rem solid var(--color-slate-lighter);
	border-bottom: .125rem solid var(--color-slate-darker);
	border-radius: .25rem;
	box-shadow: var(--box-shadow-large);
}
</style>
