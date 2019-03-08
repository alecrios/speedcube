<template>
	<div class="container">
		<input
			class="checkbox"
			type="checkbox"
			:id="id"
			:aria-label="name"
			:checked="value"
			@change="$emit('input', $event.target.checked)"
		>

		<label class="label" :for="id">{{ name }}</label>
	</div>
</template>

<script>
export default {
	name: 'BaseCheckbox',
	props: ['name', 'id', 'value'],
};
</script>

<style scoped>
.container {
	display: flex;
}

.checkbox {
	opacity: 0;
	position: absolute;
}

.label {
	position: relative;
	display: flex;
	align-items: center;
	font-size: 1rem;
	line-height: 1.5rem;
	color: var(--color-white);
}

.label::before {
	content: '';
	height: 1.5rem;
	width: 1.5rem;
	background-color: var(--color-secondary);
	border-top: .125rem solid var(--color-secondary-lighter);
	border-bottom: .125rem solid var(--color-secondary-darker);
	border-radius: .25rem;
	box-shadow: var(--box-shadow-small);
	margin-right: .75rem;
}

.checkbox:active + .label::before {
	border-top: .125rem solid var(--color-secondary-darker);
	border-bottom: .125rem solid var(--color-secondary-lighter);
}

.checkbox:focus + .label::before {
	box-shadow: var(--box-shadow-focus), var(--box-shadow-small);
}

.checkbox:checked + .label::after {
	content: '\2715';
	position: absolute;
	top: 0;
	left: 0;
	width: 1.5rem;
	height: 1.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
