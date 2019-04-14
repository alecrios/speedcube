<template>
	<transition name="modal">
		<div class="backdrop" @click.self="$emit('close')">
			<div class="container">
				<BaseForm ref="form">
					<slot></slot>
				</BaseForm>
			</div>
		</div>
	</transition>
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
		keydownHandler(event) {
			if (event.key !== 'Escape') return;

			this.$emit('close');
			event.stopPropagation();
		},
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
	},
	mounted() {
		// Add listening for the escape key
		this.$refs.form.$el.addEventListener('keydown', this.keydownHandler);

		// Grab a reference to the element that was focused before modal opened
		this.previouslyFocusedElement = document.activeElement;

		// Focus the first focusable element in the modal
		this.focusFirstFocusableElement();

		// Make the rest of the page inert to trap the user's focus
		this.$_togglePageInert(true);
	},
	beforeDestroy() {
		// Remove listening for the escape key
		this.$refs.form.$el.removeEventListener('keydown', this.keydownHandler);

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
	transition: opacity 250ms ease;
}

.container {
	width: 100%;
	max-width: 20rem;
	background-color: var(--color-slate);
	border-top: .125rem solid var(--color-slate-lighter);
	border-bottom: .125rem solid var(--color-slate-darker);
	border-radius: .25rem;
	box-shadow: var(--box-shadow-large);
	transition: transform 250ms ease;
}

.modal-enter,
.modal-leave-active {
	opacity: 0;
}

.modal-enter .container,
.modal-leave-active .container {
	transform: translateY(-1.5rem);
}
</style>
