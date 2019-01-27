<template>
	<footer class="footer">
		<Wrapper>
			<div class="bar">
				<p>footer</p>
			</div>
		</Wrapper>
	</footer>
</template>

<script>
import Wrapper from '@/components/Wrapper.vue';

export default {
	name: 'FooterBar',
	components: {
		Wrapper,
	},
};
</script>

<style scoped>
.footer {
	background-color: var(--color-gray-5);
}
</style>
