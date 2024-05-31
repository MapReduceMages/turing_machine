import { describe, test, expect } from 'vitest';
import type { InstructionSet, Transition, Direction } from '../models/instruction_set';
import { run } from './machine';

const INCREMENT_INSTRUCTION_SET: InstructionSet = {
	alphabet: ['0', '1', ' '],
	blank: ' ',
	states: ['right', 'carry', 'DONE'],
	initial: 'right',
	finals: ['DONE'],
	transitions: {
		right: [
			{ read: '0', to_state: 'right', write: '0', action: 'RIGHT' },
			{ read: '1', to_state: 'right', write: '1', action: 'RIGHT' },
			{ read: ' ', to_state: 'carry', write: ' ', action: 'LEFT' },
		],
		carry: [
			{ read: '1', to_state: 'carry', write: '0', action: 'LEFT' },
			{ read: '0', to_state: 'DONE', write: '1', action: 'LEFT' },
			{ read: ' ', to_state: 'DONE', write: '1', action: 'LEFT' },
		],
	},
};

const WRITE_RIGHT_INSTRUCTION_SET: InstructionSet = {
	alphabet: ['0', '1'],
	blank: '0',
	states: ['writeRight'],
	initial: 'writeRight',
	finals: [''],
	transitions: {
		writeRight: [{ read: '0', to_state: 'writeRight', write: '1', action: 'RIGHT' }],
	},
};

describe('Turing machine error handling', () => {
	test('Invalid instruction', () => {
		const invalid_instruction_set: InstructionSet = {
			alphabet: ['0', '1'],
			blank: '0',
			states: ['inst'],
			initial: 'inst',
			finals: [''],
			transitions: {
				writeRight: [{ read: '0', to_state: 'invalidtransition', write: '1', action: 'RIGHT' }],
			},
		};

		const output = run(invalid_instruction_set, ['0'], 2);
		expect(output.error).toBeDefined();
	});
});

describe('Turing machine simple programs', () => {
	test('Simple increment', () => {
		const output = run(INCREMENT_INSTRUCTION_SET, ['0', ' '], 10);
		expect(output.tape.toArray()[0]).toEqual('1');
		expect(output.error).toBeUndefined();
	});
});

describe('Turing machine infinite tape', () => {
	test('Simple increment needs blank', () => {
		const output = run(INCREMENT_INSTRUCTION_SET, ['0'], 10);
		expect(output.tape.toArray()[0]).toEqual('1');
		expect(output.error).toBeUndefined();
	});

	test('Infinite tape right and step limit', () => {
		const step_limit = 10;

		const output = run(WRITE_RIGHT_INSTRUCTION_SET, ['1', '0'], step_limit);
		expect(output.tape.toArray()).toEqual(Array(step_limit + 1).fill('1'));
	});

	test('Infinite tape left and step limit', () => {
		const long_tape_instruction_set: InstructionSet = {
			alphabet: ['0', '1'],
			blank: '0',
			states: ['writeLeft'],
			initial: 'writeLeft',
			finals: [''],
			transitions: {
				writeLeft: [{ read: '0', to_state: 'writeLeft', write: '1', action: 'LEFT' }],
			},
		};

		const step_limit = 10;

		const output = run(long_tape_instruction_set, ['1'], step_limit);
		expect(output.tape.toArray()).toEqual(Array(step_limit).fill('1'));
	});
});
