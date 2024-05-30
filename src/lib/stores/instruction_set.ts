import { writable } from 'svelte/store';
import type { InstructionSet } from '../models/instruction_set';

function generateDefaultStore(): Readonly<InstructionSet> | null {
	return null;
}

function createInstructionSetStore() {
	const { subscribe, set, update } = writable(generateDefaultStore());

	return {
		subscribe,
		set: (newInstructionSet: Object) => {},
	};
}

const instructionSetStore = createInstructionSetStore();

export default instructionSetStore;
