<template>
	<select
		:id="name | toKebabCase"
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
	props: ['name', 'value', 'options'],
};
</script>

<style scoped>
select {
	display: block;
	width: 100%;
	font-size: 1rem;
	line-height: 1.5rem;
	letter-spacing: .03125rem;
	color: var(--color-white);
	background-color: var(--color-secondary);
	border-top: .125rem solid var(--color-secondary-lighter);
	border-bottom: .125rem solid var(--color-secondary-darker);
	box-shadow: var(--box-shadow);
	padding-top: .4375rem;
	padding-bottom: .5625rem;
	padding-left: 1rem;
	padding-right: 2.5rem;
	border-radius: .25rem;
	background-image: url('../assets/icon-select.svg');
	background-size: 1.5rem 1.5rem;
	background-repeat: no-repeat;
	background-position: calc(100% - .5rem) 50%;
}

select:active {
	background-position: calc(100% - .5rem) calc(50% + .0625rem);
	border-top: .125rem solid var(--color-secondary-darker);
	border-bottom: .125rem solid var(--color-secondary-lighter);
	padding-top: .5rem;
	padding-bottom: .5rem;
	box-shadow: none;
}
</style>
