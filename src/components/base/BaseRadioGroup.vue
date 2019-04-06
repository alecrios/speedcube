<template>
	<div>
		<div
			class="item"
			v-for="(option, index) in options"
			:key="index"
		>
			<input
				class="radio"
				type="radio"
				:name="name"
				:id="kebabCase(option.label)"
				:value="option.value"
				:checked="option.value === value"
				@change="$emit('input', $event.target.value)"
				@keydown.enter.prevent="$emit('submit')"
			>

			<label class="label" :for="kebabCase(option.label)">{{ option.label }}</label>
		</div>
	</div>
</template>

<script>
import kebabCase from 'lodash.kebabcase';

export default {
	name: 'BaseRadioGroup',
	props: ['name', 'id', 'options', 'value'],
	methods: {
		kebabCase(string) {
			return kebabCase(string);
		},
	},
};
</script>

<style scoped>
.item {
	display: flex;
}

.item + .item {
	margin-top: .75rem;
}

.radio {
	opacity: 0;
	position: absolute;
}

.label {
	position: relative;
	display: flex;
	align-items: flex-start;
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
	border-radius: 50%;
	box-shadow: var(--box-shadow-small);
	margin-right: .75rem;
	flex: none;
}

.radio:active + .label::before {
	border-top: .125rem solid var(--color-secondary-darker);
	border-bottom: .125rem solid var(--color-secondary-lighter);
}

.radio:focus + .label::before {
	box-shadow: var(--box-shadow-focus), var(--box-shadow-small);
}

.radio:checked + .label::after {
	content: '';
	position: absolute;
	top: .5rem;
	left: .5rem;
	width: .5rem;
	height: .5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: currentColor;
	border-radius: 50%;
}
</style>
