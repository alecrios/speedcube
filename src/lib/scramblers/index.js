/* Scrambler sources: https://github.com/cubing/jsss https://github.com/nickcolley/scrambo */

import scramble222 from './scramble_222';
import scramble333 from './scramble_333';
import scrambleNnn from './scramble_NNN';
import scrambleClock from './scramble_clock';
import scrambleMinx from './scramble_minx';
import scramblePyram from './scramble_pyram';
import scrambleSkewb from './scramble_skewb';
import scrambleSq1 from './scramble_sq1';

export default {
	'2x2x2': scramble222,
	'3x3x3': scramble333,
	'4x4x4': scrambleNnn['4x4x4'],
	'5x5x5': scrambleNnn['5x5x5'],
	'6x6x6': scrambleNnn['6x6x6'],
	'7x7x7': scrambleNnn['7x7x7'],
	'clock': scrambleClock,
	'megaminx': scrambleMinx,
	'pyraminx': scramblePyram,
	'skewb': scrambleSkewb,
	'square-1': scrambleSq1,
};
