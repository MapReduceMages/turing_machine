import { writable } from 'svelte/store';
import type { InstructionSet } from '../models/instruction_set';

function generateDefaultStore(): Readonly<InstructionSet> | null {
	return null;
}

function createInstructionSetStore() {
	const { subscribe, set } = writable(generateDefaultStore());

	return {
		subscribe,
		reset: () => {
			set(generateDefaultStore());
		},
	};
}

const instructionSetStore = createInstructionSetStore();

export default instructionSetStore;
