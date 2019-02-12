export default {
	methods: {
		$_getScrambleTurnText(turn) {
			return turn.depth > 1
				? `${turn.face.toLowerCase()}${turn.modifier}`
				: `${turn.face}${turn.modifier}`;
		},
	},
};
