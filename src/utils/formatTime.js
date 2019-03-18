/**
 * Function to get a formatted time string
 * @param {number|Solve} input The time in ms or an object with a `time` property
 * @return {string} The formatted time string
 */
export default function formatTime(input) {
	const time = input.time || input;

	if (input.status === 'DNF') return 'DNF';

	let SS = Math.floor((time / 10) % 100);
	let ss = Math.floor((time / 1000) % 60);
	let mm = Math.floor((time / 1000 / 60) % 60);
	let HH = Math.floor((time / 1000 / 60 / 60) % 60);

	SS = String(SS).padStart(2, '0');
	ss = `${mm ? String(ss).padStart(2, '0') : String(ss)}.`;
	mm = mm ? `${HH ? String(mm).padStart(2, '0') : String(mm)}:` : '';
	HH = HH ? `${String(HH)}:` : '';

	const plusSign = input.status === '+2' ? '+' : '';

	return `${HH}${mm}${ss}${SS}${plusSign}`;
}
