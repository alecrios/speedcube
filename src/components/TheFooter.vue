<template>
	<footer class="footer">
		<BaseWrapper>
			<div class="x">
				<p class="text">
					Copyright &copy; {{ new Date().getFullYear() }}
					<a href="http://alecrios.com">Alec Rios</a>
				</p>
			</div>
		</BaseWrapper>
	</footer>
</template>

<script>
import BaseWrapper from '@/components/BaseWrapper.vue';

export default {
	name: 'TheFooter',
	components: {
		BaseWrapper,
	},
};
</script>

<style scoped>
.footer {
	background-color: var(--color-gray-5);
}

.x {
	text-align: center;
	padding: .75rem;
}

.text {
	font-size: .75rem;
	line-height: 1.5rem;
	letter-spacing: .03125rem;
	color: rgba(191, 191, 191, 1);
}
</style>
