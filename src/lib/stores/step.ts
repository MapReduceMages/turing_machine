import { writable } from 'svelte/store';
import type { Output } from '../models/output';

function generateDefaultStore(): number {
	return 0;
}

function createStepStore() {
	const { subscribe, set, update } = writable(generateDefaultStore());

	return {
		subscribe,
		reset: () => {
			set(generateDefaultStore());
		},
		set,
		update,
	};
}

const StepStore = createStepStore();

export default StepStore;
