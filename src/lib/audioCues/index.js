import store from '@/store';

export default class AudioCues {
	constructor() {
		this.cues = {
			'8-seconds': new Audio('/audio/8-seconds.mp3'),
			'12-seconds': new Audio('/audio/12-seconds.mp3'),
		};
	}

	play(cue) {
		if (!store.state.settings.enableInspectionAudio) return;

		this.cues[cue].play();
	}
}
