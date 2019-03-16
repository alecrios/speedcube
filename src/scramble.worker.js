// Generates random-state scrambles for 3x3x3
import min2phase from '@/lib/min2phase';

// Generates random-move scrambles for NxNxN
// import * as scrambler from 'sr-scrambler';

// Converts string scrambles (min2phase output format) into arrays (sr-scrambler output format)
import convertScrambleStringToArray from '@/lib/convertScrambleStringToArray';

/* eslint-disable-next-line */
const workerContext = self;

// Initialize the min2phase library
min2phase.initFull();

// Number of turns the scramble should be for each cube size
// const turnsToGenerate = {
// 	2: 10,
// 	3: 20,
// 	4: 40,
// 	5: 60,
// };

workerContext.onmessage = () => {
	const randomCube = min2phase.randomCube();
	const scrambleString = min2phase.solve(randomCube);
	const scrambleArray = convertScrambleStringToArray(scrambleString);
	postMessage(scrambleArray);
};
