import { writable } from 'svelte/store';
import type {InstructionSet} from '../models/instruction_set';

function generateDefaultStore(): Readonly<InstructionSet> | null {
    return null;
}

function createCount() {
	const { subscribe, set, update } = writable(generateDefaultStore());

	return {
		subscribe,
        set,
	};
}

export const count = createCount();
