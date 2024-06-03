import { writable } from 'svelte/store';
import type { Output } from '../models/output';

function generateDefaultStore(): Readonly<Output> | null {
	return null;
}

function createOutputStore() {
	const { subscribe, set } = writable(generateDefaultStore());

	return {
		subscribe,
		reset: () => {
			set(generateDefaultStore());
		},
		set(output: Readonly<Output>) {
			set({ ...output, states: output.states.reverse() });
		},
	};
}

const OutputStore = createOutputStore();

export default OutputStore;
