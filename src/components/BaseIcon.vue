<template>
	<button
		class="icon-button"
		:aria-label="name"
		:title="name"
		:disabled="disabled"
		@click="$emit('click')"
	>
		<svg class="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
			<path :class="['path', icon]" :d="pathData[icon]"/>
		</svg>
	</button>
</template>

<script>
export default {
	name: 'BaseIcon',
	props: ['name', 'icon', 'disabled'],
	data() {
		return {
			pathData: {
				penalty: 'M13,14H11V7h2Zm0,1H11v2h2Zm8-3a9,9,0,1,1-9-9A9,9,0,0,1,21,12Zm-2,0a7,7,0,1,0-7,7A7,7,0,0,0,19,12Z',
				remove: 'M13.4142,12l5.6568,5.6569L17.6569,19.071,12,13.4142,6.3431,19.071,4.929,17.6569,10.5858,12,4.929,6.3431,6.3431,4.9289,12,10.5858l5.6569-5.6569L19.071,6.3431Z',
				rename: 'M14.61,6.56,5.18,16,4,17.18V20H6.82L8,18.82l9.44-9.43ZM5,19V17H6v1H7v1ZM15.3137,5.8579l1.4142-1.4142,2.8284,2.8284L18.1421,8.6863Z',
				expand: 'M20,4v7H18V7.42L13.42,12,12,10.58,16.58,6H13V4Zm-8,9.42L10.58,12,6,16.58V13H4v7h7V18H7.42Z',
				collapse: 'M20,11H13V4h2V7.58L19.58,3,21,4.42,16.42,9H20ZM4,13v2H7.58L3,19.58,4.42,21,9,16.42V20h2V13Z',
			},
		};
	},
};
</script>

<style scoped>
.icon-button {
	width: 1.5rem;
	height: 1.5rem;
	vertical-align: middle;
	cursor: pointer;
}

.icon-button:disabled {
	cursor: not-allowed;
}

.icon-button .svg {
	width: 1.5rem;
	height: 1.5rem;
}

.icon-button .svg .path {
	fill: var(--color-smoke);
	transition: fill 100ms ease;
}

.icon-button:disabled .svg .path {
	fill: var(--color-secondary);
}

.icon-button:not(:disabled):hover .svg .path.penalty {fill: var(--color-cube-orange)}
.icon-button:not(:disabled):hover .svg .path.remove  {fill: var(--color-cube-red)}
.icon-button:not(:disabled):hover .svg .path.rename  {fill: var(--color-cube-yellow)}
.icon-button:not(:disabled):hover .svg .path.expand  {fill: var(--color-cube-white)}
.icon-button:not(:disabled):hover .svg .path.collapse  {fill: var(--color-cube-white)}
</style>
