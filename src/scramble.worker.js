/* eslint-disable no-restricted-globals */

import scramblers from '@/lib/scramblers';

self.onmessage = (message) => {
	const puzzleType = message.data;

	const scramble = scramblers[puzzleType].getRandomScramble().scramble_string
		// Remove spaces at the beginning and end
		.trim()
		// Remove the line breaks in megaminx scrambles
		.replace(/<br>/g, ' ');

	postMessage(scramble);
};
