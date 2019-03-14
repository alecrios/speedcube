<template>
	<div class="container">
		<table>
			<slot></slot>
		</table>
	</div>
</template>

<script>
export default {
	name: 'BaseTable',
};
</script>

<style scoped>
.container {
	padding: 1.5rem 0;
	max-width: 100%;
	overflow-x: auto;
}

table {
	width: 100%;
}

tbody {
	border-top: .125rem solid var(--color-slate-lighter);
}

tr.highlight {
	background-color: var(--color-slate-lighter);
}

tr + tr {
	border-top: .125rem solid var(--color-slate-lighter);
}

th,
td {
	padding: .75rem;
	text-align: left;
	white-space: nowrap;
	vertical-align: middle;
	color: var(--color-white);
}

th:first-child,
td:first-child {
	padding-left: 1.5rem;
}

th:last-child,
td:last-child {
	padding-right: 1.5rem;
}

th {
	font-size: .75rem;
	line-height: 1.5rem;
	font-weight: 500;
	text-transform: uppercase;
	letter-spacing: .0625rem;
}

td {
	font-size: 1rem;
	line-height: 1.5rem;
}

th.align-right,
td.align-right {
	text-align: right;
}

td.overflow-ellipses {
	width: 100%;
	max-width: 0;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
