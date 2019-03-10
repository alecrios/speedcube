export default function convertScrambleStringToArray(string) {
	return string
		.split(/\s/)
		.filter((turn) => turn !== '')
		.map((turn) => ({
			cubeSize: 3,
			depth: 1,
			face: turn.charAt(0),
			modifier: turn.length === 2 ? turn.charAt(1) : '',
		}));
}
