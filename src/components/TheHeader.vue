<template>
	<header class="header">
		<BaseWrapper>
			<div class="bar">
				<RouterLink to="/">
					Logo
				</RouterLink>

				<TheSessionSelect/>
			</div>
		</BaseWrapper>
	</header>
</template>

<script>
import BaseWrapper from '@/components/BaseWrapper.vue';
import TheSessionSelect from '@/components/TheSessionSelect.vue';

export default {
	name: 'TheHeader',
	components: {
		BaseWrapper,
		TheSessionSelect,
	},
};
</script>

<style scoped>
.header {
	background-color: var(--color-gray-5);
}

.bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: .75rem 1.5rem;
}
</style>
