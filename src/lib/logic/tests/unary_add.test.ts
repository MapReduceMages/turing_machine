import { describe, test, expect } from 'vitest';
import { run } from '../machine';
import UnaryAddInstructionSet from '$lib/data/presets/unary_add.json';
import type { InstructionSet } from '../../models/instruction_set';

// =============================================== tricky cases
describe('valid no right side', () => {
	const testInputs = [
		{
			input: ['+', '='],
			expected: ['.', '.'],
		},
	];

	for (const testInput of testInputs) {
		test(testInput.input.toString(), () => {
			const output = run(UnaryAddInstructionSet as InstructionSet, testInput.input, 1000);
			expect(output.tape.toArray()).toEqual(testInput.expected);
		});
	}
});

// =============================================== valid add
describe('valid no right side', () => {
	const MAX = 10;
	const testInputs = new Array(MAX)
		.fill(null)
		.map((_, index) => [...new Array(index + 1).fill('1'), '+', '=']);

	for (const testInput of testInputs) {
		test(testInput.toString(), () => {
			const output = run(UnaryAddInstructionSet as InstructionSet, testInput, 1000);
			expect(output.tape.toArray()).toEqual(
				new Array(testInput.length).fill('1').slice(0, -2).concat(['.', '.']),
			);
		});
	}
});

describe('valid no left side', () => {
	const MAX = 10;
	const testInputs = new Array(MAX)
		.fill(null)
		.map((_, index) => ['+', ...new Array(index + 1).fill('1'), '=']);

	let index = 1;
	for (const testInput of testInputs) {
		test(testInput.toString(), () => {
			const output = run(UnaryAddInstructionSet as InstructionSet, testInput, 1000);
			expect(output.tape.toArray()).toEqual(
				new Array(index).fill('1').concat(new Array(index + 2).fill('.')),
			);
			index++;
		});
	}
});

describe('valid doublon', () => {
	const MAX = 10;
	const testInputs = new Array(MAX)
		.fill(null)
		.map((_, index) => [
			...new Array(index + 1).fill('1'),
			'+',
			...new Array(index + 1).fill('1'),
			'=',
		]);

	for (const testInput of testInputs) {
		let sideLength = (testInput.length - 2) / 2;
		test(testInput.toString(), () => {
			const output = run(UnaryAddInstructionSet as InstructionSet, testInput, 1000);
			expect(output.tape.toArray()).toEqual([
				...new Array(sideLength * 2).fill('1'),
				...new Array(sideLength + 2).fill('.'),
			]);
		});
	}
});

describe('valid doublon plus one left', () => {
	const MAX = 10;
	const testInputs = new Array(MAX)
		.fill(null)
		.map((_, index) => [
			...new Array(index + 2).fill('1'),
			'+',
			...new Array(index + 1).fill('1'),
			'=',
		]);

	for (const testInput of testInputs) {
		let sideLength = Math.floor((testInput.length - 2) / 2);
		test(testInput.toString(), () => {
			const output = run(UnaryAddInstructionSet as InstructionSet, testInput, 3000);
			expect(output.tape.toArray()).toEqual([
				...new Array(sideLength * 2 + 1).fill('1'),
				...new Array(sideLength + 2).fill('.'),
			]);
		});
	}
});

describe('valid doublon plus one right', () => {
	const MAX = 10;
	const testInputs = new Array(MAX)
		.fill(null)
		.map((_, index) => [
			...new Array(index + 1).fill('1'),
			'+',
			...new Array(index + 2).fill('1'),
			'=',
		]);

	for (const testInput of testInputs) {
		let sideLength = Math.floor((testInput.length - 2) / 2);
		test(testInput.toString(), () => {
			const output = run(UnaryAddInstructionSet as InstructionSet, testInput, 3000);
			expect(output.tape.toArray()).toEqual([
				...new Array(sideLength * 2 + 1).fill('1'),
				...new Array(sideLength + 3).fill('.'),
			]);
		});
	}
});

describe('valid random', () => {
	const testInputs = [
		['1', '1', '+', '1', '1', '1', '1', '='],
		['1', '1', '1', '+', '1', '1', '1', '1', '1', '1', '1', '='],
		['1', '1', '1', '1', '+', '1', '1', '1', '1', '='],
	];

	for (const testInput of testInputs) {
		test(testInput.toString(), () => {
			const output = run(UnaryAddInstructionSet as InstructionSet, testInput, 1000);
			const expected = new Array(testInput.length - 2).fill('1');
			expect(output.tape.toArray().slice(0, expected.length)).toEqual(expected);
			expect(output.tape.toArray().slice(expected.length)).toEqual(
				new Array(output.tape.count() - expected.length).fill('.'),
			);
		});
	}
});
