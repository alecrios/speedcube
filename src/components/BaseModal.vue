<template>
	<transition name="modal">
		<div class="backdrop" @click.self="$emit('close')">
			<div class="container">
				<BaseForm>
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
	},
	mounted() {
		document.addEventListener('keydown', this.keydownHandler);
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
	align-items: center;
	justify-content: center;
	padding: 1.5rem;
	background-color: rgba(0, 0, 0, .75);
	transition: opacity 250ms ease;
}

.container {
	width: 100%;
	max-width: 20rem;
	background-color: var(--color-background);
	border-top: .125rem solid var(--color-background-lighter);
	border-bottom: .125rem solid var(--color-background-darker);
	border-radius: .25rem;
	box-shadow: 0 .75rem 1.5rem 0 rgba(0, 0, 0, .5);
	transition: transform 250ms ease;
}

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .container,
.modal-leave-active .container {
	transform: translateY(1.5rem);
}
</style>
