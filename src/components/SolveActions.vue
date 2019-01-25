<template>
	<div class="solve-actions">
		<div class="penalty-action">
			<IconButton
				icon="penalty"
				name="Penalty"
				@click="toggleMenu"
			/>

			<div class="menu" v-if="isActive">
				<button
					:class="['option', {'is-active': solve.p2}]"
					@click="$emit('click-p2')"
					aria-label="+2 Penalty"
				>
					+2 Penalty
				</button>

				<button
					:class="['option', {'is-active': solve.dnf}]"
					@click="$emit('click-dnf')"
					aria-label="DNF Penalty"
				>
					DNF Penalty
				</button>
			</div>
		</div>

		<div class="remove-action">
			<IconButton
				icon="remove"
				name="Remove"
				@click="$emit('click-remove')"
			/>
		</div>
	</div>
</template>

<script>
import IconButton from '@/components/IconButton.vue';

export default {
	name: 'SolveActions',
	components: {
		IconButton,
	},
	data() {
		return {
			isActive: false,
		};
	},
	props: ['solve'],
	methods: {
		toggleMenu() {
			this.isActive = !this.isActive;
		},
		keydownHandler(event) {
			if (event.key !== 27) return;

			if (!this.isActive) return;

			this.isActive = false;

			// what about closing other menus when one opens?
			// listeners at higher level?
		},
	},
	mounted() {
		// document.addEventListener('keydown', keydownHandler);
	},
	beforeDestroy() {
		// document.removeEventListener('keydown', keydownHandler);
	},
};
</script>

<style scoped>
.solve-actions {
	display: flex;
	height: 1.5rem;
}

.penalty-action {
	position: relative;
	margin-right: .75rem;
}

.menu-button {
	cursor: pointer;
}

.menu {
	position: absolute;
	top: 100%;
	right: 0;
	padding: .25rem 0;
	background-color: var(--color-gray-5);
	border-radius: .25rem;
	overflow: hidden;
	box-shadow: 0 .25rem 1rem 0 rgba(0, 0, 0, .25);
	z-index: 1;
}

.option {
	display: flex;
	align-items: center;
	width: 100%;
	text-align: left;
	color: var(--color-white);
	font-size: .75rem;
	line-height: 1.5rem;
	letter-spacing: .0625rem;
	text-transform: uppercase;
	font-weight: 500;
	padding: .25rem 1.5rem .25rem 1rem;
	cursor: pointer;
}

.option:hover {
	background-color: var(--color-gray-4);
}

.option::before {
	content: '';
	width: .5rem;
	height: .5rem;
	margin-right: .5rem;
	border-radius: 50%;
	background-color: var(--color-gray-9);
}

.option.is-active::before {
	border: .09375rem solid var(--color-red);
	background-color: var(--color-red)
}
</style>
