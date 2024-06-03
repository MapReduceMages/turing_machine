import Immutable from 'immutable';
import { run } from './src/lib/logic/machine.ts';
import type { InstructionSet } from './src/lib/models/instruction_set.ts';

const instructionSet: InstructionSet = {
	alphabet: ['1', '.', '-', '='],
	blank: '.',
	states: ['scanright', 'eraseone', 'subone', 'skip', 'HALT'],
	initial: 'scanright',
	finals: ['HALT'],
	transitions: {
		scanright: [
			{ read: '.', to_state: 'scanright', write: '.', action: 'RIGHT' },
			{ read: '1', to_state: 'scanright', write: '1', action: 'RIGHT' },
			{ read: '-', to_state: 'scanright', write: '-', action: 'RIGHT' },
			{ read: '=', to_state: 'eraseone', write: '.', action: 'LEFT' },
		],
		eraseone: [
			{ read: '1', to_state: 'subone', write: '=', action: 'LEFT' },
			{ read: '-', to_state: 'HALT', write: '.', action: 'LEFT' },
		],
		subone: [
			{ read: '1', to_state: 'subone', write: '1', action: 'LEFT' },
			{ read: '-', to_state: 'skip', write: '-', action: 'LEFT' },
		],
		skip: [
			{ read: '.', to_state: 'skip', write: '.', action: 'LEFT' },
			{ read: '1', to_state: 'scanright', write: '.', action: 'RIGHT' },
		],
	},
};

const instructionSetPalindrome: InstructionSet = {
	alphabet: ['.', '0', '1', 'y', 'n'], // y = yes, n = no
	blank: '.',
	states: [
		'new_search',
		'search_0',
		'search_0_confirmed',
		'search_1',
		'search_1_confirmed',
		'back_to_left',
		'back_and_clean_to_left',
		'HALT',
	],
	initial: 'new_search',
	finals: ['HALT'],
	transitions: {
		new_search: [
			{ read: '.', to_state: 'HALT', write: 'y', action: 'RIGHT' }, // even number
			{ read: '0', to_state: 'search_0', write: '.', action: 'RIGHT' },
			{ read: '1', to_state: 'search_1', write: '.', action: 'RIGHT' },
		],
		search_0: [
			{ read: '.', to_state: 'HALT', write: 'n', action: 'RIGHT' },
			{ read: '0', to_state: 'search_0_confirmed', write: '0', action: 'RIGHT' },
			{ read: '1', to_state: 'search_0', write: '1', action: 'RIGHT' },
		],
		search_0_confirmed: [
			{ read: '.', to_state: 'back_and_clean_to_left', write: '.', action: 'LEFT' },
			{ read: '0', to_state: 'search_0_confirmed', write: '0', action: 'RIGHT' },
			{ read: '1', to_state: 'search_0', write: '1', action: 'RIGHT' },
		],
		search_1: [
			{ read: '.', to_state: 'HALT', write: 'n', action: 'RIGHT' },
			{ read: '0', to_state: 'search_1', write: '0', action: 'RIGHT' },
			{ read: '1', to_state: 'search_1_confirmed', write: '1', action: 'RIGHT' },
		],
		search_1_confirmed: [
			{ read: '.', to_state: 'back_and_clean_to_left', write: '.', action: 'LEFT' },
			{ read: '0', to_state: 'search_1', write: '0', action: 'RIGHT' },
			{ read: '1', to_state: 'search_1_confirmed', write: '1', action: 'RIGHT' },
		],
		back_and_clean_to_left: [
			{ read: '0', to_state: 'back_and_check_odd_to_left', write: '.', action: 'LEFT' },
			{ read: '1', to_state: 'back_and_check_odd_to_left', write: '.', action: 'LEFT' },
		],
		back_and_check_odd_to_left: [
			{ read: '.', to_state: 'HALT', write: 'y', action: 'LEFT' }, // odd number
			{ read: '0', to_state: 'back_to_left', write: '.', action: 'LEFT' },
			{ read: '1', to_state: 'back_to_left', write: '.', action: 'LEFT' },
		],
		back_to_left: [
			{ read: '.', to_state: 'new_search', write: '.', action: 'RIGHT' },
			{ read: '0', to_state: 'back_to_left', write: '0', action: 'LEFT' },
			{ read: '1', to_state: 'back_to_left', write: '1', action: 'LEFT' },
		],
	},
};

// const initialTape = Immutable.List(['1', '1', '1', '-', '1', '1', '=', '.', '.']);
const initialTapePalindrome = Immutable.List(['1', '0', '1']);

try {
	// const result = run(instructionSet, initialTape.toArray(), 100);
	const result = run(instructionSetPalindrome, initialTapePalindrome.toArray(), 100);

	// console.log(result.states.toArray());
} catch (error: any) {
	console.error(error.message);
}
