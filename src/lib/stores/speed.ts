import { writable } from 'svelte/store';

const DEFAULT_SPEED = 10;
const speeds = [DEFAULT_SPEED, 30, 100, 1, 2, 3];
let speed: number = DEFAULT_SPEED;

function generateDefaultStore(): number {
	return DEFAULT_SPEED;
}

function createSpeedStore() {
	const { subscribe, set } = writable(generateDefaultStore());

	return {
		subscribe,
		reset: () => {
			set(generateDefaultStore());
		},
		switch: () => {
			speed = speeds[speeds.indexOf(speed) + 1] || DEFAULT_SPEED;
			set(speed);
		},
	};
}

const SpeedStore = createSpeedStore();

export default SpeedStore;
