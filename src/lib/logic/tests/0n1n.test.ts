import { describe, test, expect } from 'vitest';
import { run } from '../machine';
import _0n1nInstructionSet from '$lib/data/presets/0n1n.json';
import type { InstructionSet } from '../../models/instruction_set';

// =============================================== valid 0n1n
describe('valid number', () => {
	const MAX = 10;
	const testInputs = new Array(MAX)
		.fill(null)
		.map((_, index) => [...new Array(index + 1).fill('0'), ...new Array(index + 1).fill('1')]);

	for (const input of testInputs) {
		test(input.toString(), () => {
			const output = run(_0n1nInstructionSet as InstructionSet, input, 1000);
			expect(output.tape.toArray().toString()).includes('y');
			expect(output.tape.toArray().toString()).not.includes('n');
			expect(output.error).toBeUndefined();
		});
	}
});

// =============================================== invalid 0n1n
describe('invalid inversed number', () => {
	const MAX = 10;
	const testInputs = new Array(MAX)
		.fill(null)
		.map((_, index) => [...new Array(index + 1).fill('1'), ...new Array(index + 1).fill('0')]);

	for (const input of testInputs) {
		test(input.toString(), () => {
			const output = run(_0n1nInstructionSet as InstructionSet, input, 1000);
			expect(output.tape.toArray().toString()).includes('n');
			expect(output.tape.toArray().toString()).not.includes('y');
			expect(output.error).toBeUndefined();
		});
	}
});

describe('invalid number only 0', () => {
	const MAX = 10;
	const testInputs = new Array(MAX).fill(null).map((_, index) => new Array(index + 1).fill('0'));

	for (const input of testInputs) {
		test(input.toString(), () => {
			const output = run(_0n1nInstructionSet as InstructionSet, input, 1000);
			expect(output.tape.toArray().toString()).includes('n');
			expect(output.tape.toArray().toString()).not.includes('y');
			expect(output.error).toBeUndefined();
		});
	}
});

describe('invalid number only 1', () => {
	const MAX = 10;
	const testInputs = new Array(MAX).fill(null).map((_, index) => new Array(index + 1).fill('1'));

	for (const input of testInputs) {
		test(input.toString(), () => {
			const output = run(_0n1nInstructionSet as InstructionSet, input, 1000);
			expect(output.tape.toArray().toString()).includes('n');
			expect(output.tape.toArray().toString()).not.includes('y');
			expect(output.error).toBeUndefined();
		});
	}
});

describe('invalid random number', () => {
	const testInputs = [
		['1', '1', '0'],
		['0', '0', '1'],
		['1', '0', '1', '0', '0'],
		['0', '1', '0', '1', '1'],
		['0', '0', '1', '0', '1'],
		['1', '1', '0', '1', '0'],
		['0', '1', '0', '1', '0', '1', '1'],
		['1', '0', '1', '0', '1', '0', '0'],
		['0', '1', '1'],
		['1', '0', '0'],
		['0', '0', '1', '0', '1'],
		['1', '1', '0', '1', '0'],
		['1', '0', '1', '0', '0'],
		['0', '1', '0', '1', '1'],
		['1', '1', '0', '1', '0', '1', '0'],
		['0', '0', '1', '0', '1', '0', '1'],
	];

	for (const input of testInputs) {
		test(input.toString(), () => {
			const output = run(_0n1nInstructionSet as InstructionSet, input, 1000);
			expect(output.tape.toArray().toString()).includes('n');
			expect(output.tape.toArray().toString()).not.includes('y');
			expect(output.error).toBeUndefined();
		});
	}
});
