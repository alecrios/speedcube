<template>
	<div class="form">
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'BaseForm',
};
</script>

<style scoped>
.form {
	padding: .75rem;
}

.form .header {
	padding: .75rem;
}

.form .body .field {
	padding: .75rem;
}

.form .body .field > * + * {
	margin-top: .75rem;
}

.form .body .field p {
	font-size: 1rem;
	line-height: 1.5rem;
	color: var(--color-white);
}

.form .footer {
	margin-top: .75rem;
	padding: .75rem;
	display: flex;
	justify-content: center;
}

.form .footer > * + * {
	margin-left: .75rem;
}
</style>
