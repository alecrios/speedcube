<template>
	<div class="solve-actions">
		<div class="penalty-action">
			<IconButton
				icon="penalty"
				name="Penalty"
				:is-active="isActive"
				@click="toggleMenu()"
			/>

			<div class="menu" v-if="isActive" v-on-clickaway="closeMenu">
				<button
					:class="['option', {'is-active': solve.p2}]"
					@click="toggleP2()"
					aria-label="+2 Penalty"
				>
					+2 Penalty
				</button>

				<button
					:class="['option', {'is-active': solve.dnf}]"
					@click="toggleDnf()"
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
				@click="removeSolve()"
			/>
		</div>
	</div>
</template>

<script>
import {directive as onClickaway} from 'vue-clickaway';
import IconButton from '@/components/IconButton.vue';

export default {
	name: 'TheSolvesSingleActions',
	components: {
		IconButton,
	},
	directives: {
		onClickaway,
	},
	props: ['solve'],
	data() {
		return {
			isActive: false,
		};
	},
	methods: {
		openMenu() {
			if (this.isActive) return;

			this.isActive = true;
			document.addEventListener('keydown', this.keydownHandler);
		},
		closeMenu() {
			if (!this.isActive) return;

			this.isActive = false;
			document.removeEventListener('keydown', this.keydownHandler);
		},
		toggleMenu() {
			this.isActive ? this.closeMenu() : this.openMenu();
		},
		keydownHandler(event) {
			if (event.key !== 'Escape') return;

			this.isActive = false;
		},
		removeSolve() {
			this.$store.commit('removeSolve', this.solve.id);
		},
		toggleP2() {
			this.$store.commit('toggleP2', this.solve.id);
		},
		toggleDnf() {
			this.$store.commit('toggleDnf', this.solve.id);
		},
	},
	beforeDestroy() {
		this.closeMenu();
	},
};
</script>

<style scoped>
.solve-actions {
	display: flex;
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
	top: calc(100% + .5rem);
	right: -1.5rem;
	padding: .25rem 0;
	background-color: var(--color-gray-5);
	border-radius: .25rem;
	box-shadow: 0 .5rem 1.5rem 0 rgba(0, 0, 0, .25);
	z-index: 1;
}

.menu::before {
	content: '';
	background-color: red;
	background-color: var(--color-gray-5);
	width: .75rem;
	height: .75rem;
	transform: rotate(45deg);
	position: absolute;
	top: -.25rem;
	right: 1.875rem;
}

.option {
	position: relative;
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
