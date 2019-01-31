<template>
	<transition name="modal">
		<div class="modal-mask" @click.self="$emit('close')">
			<div class="modal-container">
				<slot></slot>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'BaseModal',
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
.modal-mask {
	position: fixed;
	z-index: 1000;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, .5);
	transition: opacity 250ms ease;
}

.modal-container {
	width: 20rem;
	padding: 1.5rem;
	background-color: var(--color-gray-9);
	border-radius: .25rem;
	box-shadow: 0 .75rem 1.5rem 0 rgba(0, 0, 0, .5);
	transition: all .3s ease;
}

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	transform: translateY(1.5rem);
}
</style>
