import { describe, test, expect } from 'vitest';
import { run } from '../machine';
import UnarySubInstructionSet from '$lib/data/presets/unary_sub.json';
import type { InstructionSet } from '../../models/instruction_set';

// =============================================== tricky cases
describe('valid no right side', () => {
	const testInputs = [
		{
			input: ['-', '='],
			expected: ['.', '.'],
		},
	];

	for (const testInput of testInputs) {
		test(testInput.input.toString(), () => {
			const output = run(UnarySubInstructionSet as InstructionSet, testInput.input, 1000);
			expect(output.tape.toArray()).toEqual(testInput.expected);
		});
	}
});

// =============================================== valid sub

describe('valid no right side', () => {
	const testInputs = [
		['1', '-', '='],
		['1', '1', '-', '='],
		['1', '1', '1', '-', '='],
		['1', '1', '1', '1', '-', '='],
		['1', '1', '1', '1', '1', '-', '='],
		['1', '1', '1', '1', '1', '1', '-', '='],
		['1', '1', '1', '1', '1', '1', '1', '-', '='],
		['1', '1', '1', '1', '1', '1', '1', '1', '-', '='],
	];

	for (const testInput of testInputs) {
		test(testInput.toString(), () => {
			const output = run(UnarySubInstructionSet as InstructionSet, testInput, 1000);
			expect(output.tape.toArray()).toEqual(
				new Array(testInput.length).fill('1').slice(0, -2).concat(['.', '.']),
			);
		});
	}
});

describe('valid annihilation', () => {
	const testInputs = [
		['1', '-', '1', '='],
		['1', '1', '-', '1', '1', '='],
		['1', '1', '1', '-', '1', '1', '1', '='],
		['1', '1', '1', '1', '-', '1', '1', '1', '1', '='],
		['1', '1', '1', '1', '1', '-', '1', '1', '1', '1', '1', '='],
		['1', '1', '1', '1', '1', '1', '-', '1', '1', '1', '1', '1', '1', '='],
		['1', '1', '1', '1', '1', '1', '1', '-', '1', '1', '1', '1', '1', '1', '1', '='],
		['1', '1', '1', '1', '1', '1', '1', '1', '-', '1', '1', '1', '1', '1', '1', '1', '1', '='],
	];

	for (const testInput of testInputs) {
		test(testInput.toString(), () => {
			const output = run(UnarySubInstructionSet as InstructionSet, testInput, 1000);
			expect(output.tape.toArray()).toEqual(new Array(testInput.length).fill('.'));
		});
	}
});

describe('valid remaind 1', () => {
	const testInputs = [
		['1', '-', '='],
		['1', '1', '-', '1', '='],
		['1', '1', '1', '-', '1', '1', '='],
		['1', '1', '1', '1', '-', '1', '1', '1', '='],
		['1', '1', '1', '1', '1', '-', '1', '1', '1', '1', '='],
		['1', '1', '1', '1', '1', '1', '-', '1', '1', '1', '1', '1', '='],
	];

	for (const testInput of testInputs) {
		test(testInput.toString(), () => {
			const output = run(UnarySubInstructionSet as InstructionSet, testInput, 1000);
			expect(output.tape.toArray()).toEqual(
				['1'].concat(new Array(testInput.length - 1).fill('.')),
			);
		});
	}
});

describe('valid remaind 2', () => {
	const testInputs = [
		['1', '1', '-', '='],
		['1', '1', '1', '-', '1', '='],
		['1', '1', '1', '1', '-', '1', '1', '='],
		['1', '1', '1', '1', '1', '-', '1', '1', '1', '='],
		['1', '1', '1', '1', '1', '1', '-', '1', '1', '1', '1', '='],
	];

	for (const testInput of testInputs) {
		test(testInput.toString(), () => {
			const output = run(UnarySubInstructionSet as InstructionSet, testInput, 1000);
			expect(output.tape.toArray()).toEqual(
				['1', '1'].concat(new Array(testInput.length - 2).fill('.')),
			);
		});
	}
});

describe('valid remaind 3', () => {
	const testInputs = [
		['1', '1', '1', '-', '='],
		['1', '1', '1', '1', '-', '1', '='],
		['1', '1', '1', '1', '1', '-', '1', '1', '='],
		['1', '1', '1', '1', '1', '1', '-', '1', '1', '1', '='],
	];

	for (const testInput of testInputs) {
		test(testInput.toString(), () => {
			const output = run(UnarySubInstructionSet as InstructionSet, testInput, 1000);
			expect(output.tape.toArray()).toEqual(
				['1', '1', '1'].concat(new Array(testInput.length - 3).fill('.')),
			);
		});
	}
});
