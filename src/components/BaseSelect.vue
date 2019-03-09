<template>
	<select
		:class="['select', size]"
		:id="id"
		:aria-label="name"
		:value="value"
		@input="$emit('input', $event.target.value)"
	>
		<option
			v-for="(option, index) in options"
			:key="index"
			:value="option.value"
		>
			{{ option.label }}
		</option>
	</select>
</template>

<script>
export default {
	name: 'BaseSelect',
	props: ['name', 'id', 'value', 'options', 'size'],
};
</script>

<style scoped>
.select {
	display: block;
	width: 100%;
	font-size: 1rem;
	line-height: 1.5rem;
	letter-spacing: .03125rem;
	color: var(--color-white);
	background-color: var(--color-secondary);
	border-top: .125rem solid var(--color-secondary-lighter);
	border-bottom: .125rem solid var(--color-secondary-darker);
	box-shadow: var(--box-shadow-small);
	padding-top: .4375rem;
	padding-bottom: .5625rem;
	padding-left: 1rem;
	padding-right: 2.5rem;
	border-radius: .25rem;
	background-image: url('../assets/icon-select.svg');
	background-repeat: no-repeat;
	background-size: 1.5rem 1.5rem;
	background-position: calc(100% - .5rem) 50%;
	cursor: pointer;
}

.select.small {
	font-size: .75rem;
	line-height: 1.25rem;
	font-weight: 500;
	padding-top: .1875rem;
	padding-bottom: .3125rem;
	padding-left: .75rem;
	padding-right: 1.75rem;
	background-size: 1rem 1rem;
	background-position: calc(100% - .25rem) 50%;
}

.select:active {
	border-top: .125rem solid var(--color-secondary-darker);
	border-bottom: .125rem solid var(--color-secondary-lighter);
	background-position: calc(100% - .5rem) calc(50% + .0625rem);
	padding-top: .5rem;
	padding-bottom: .5rem;
	box-shadow: none;
}

.select.small:active {
	background-position: calc(100% - .25rem) calc(50% + .0625rem);
	padding-top: .25rem;
	padding-bottom: .25rem;
}

/* Selector is contrived in order to beat the specificity of the focus-visible rule */
.select:focus:not([data-focus-visible-added]) {
	box-shadow: var(--box-shadow-focus), var(--box-shadow-small);
}
</style>
