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
import BaseForm from '@/components/BaseForm.vue';

export default {
	name: 'BaseModal',
	components: {
		BaseForm,
	},
	methods: {
		keydownHandler(event) {
			if (event.key !== 'Escape') return;

			this.$emit('close');
		},
		focusFirstFocusableElement() {
			const focusableElements = this.$refs.form.$el.querySelectorAll('button, input, select');
			focusableElements[0].focus();
		},
	},
	mounted() {
		document.addEventListener('keydown', this.keydownHandler);
		this.focusFirstFocusableElement();
	},
	beforeDestroy() {
		document.removeEventListener('keydown', this.keydownHandler);
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
