import { describe, test, expect } from 'vitest';
import { run } from '../machine';
import PalindromeInstructionSet from '$lib/data/presets/palindrome.json';
import type { InstructionSet } from '../../models/instruction_set';

// =============================================== valid palindrome

describe('valid odd number', () => {
	const testInputs = [
		['0', '1', '0'],
		['1', '0', '1'],
		['0', '0', '1', '0', '0'],
		['1', '1', '0', '1', '1'],
		['1', '0', '1', '0', '1'],
		['0', '1', '0', '1', '0'],
		['1', '1', '0', '1', '0', '1', '1'],
		['0', '0', '1', '0', '1', '0', '0'],
	];

	for (const input of testInputs) {
		test(input.toString(), () => {
			const output = run(PalindromeInstructionSet as InstructionSet, input, 100);
			expect(output.tape.toArray().toString()).includes('y');
			expect(output.tape.toArray().toString()).not.includes('n');
			expect(output.error).toBeUndefined();
		});
	}
});

describe('valid even number', () => {
	const testInputs = [
		['0', '0'],
		['1', '1'],
		['0', '0', '0', '0'],
		['1', '1', '1', '1'],
		['1', '0', '0', '1'],
		['0', '1', '1', '0'],
		['1', '1', '0', '0', '1', '1'],
		['0', '0', '1', '1', '0', '0'],
	];

	for (const input of testInputs) {
		test(input.toString(), () => {
			const output = run(PalindromeInstructionSet as InstructionSet, input, 100);
			expect(output.tape.toArray().toString()).includes('y');
			expect(output.tape.toArray().toString()).not.includes('n');
			expect(output.error).toBeUndefined();
		});
	}
});

describe('valid 0n number', () => {
	const testInputs = [
		['0'],
		['0', '0'],
		['0', '0', '0'],
		['0', '0', '0', '0'],
		['0', '0', '0', '0', '0'],
	];

	for (const input of testInputs) {
		test(input.toString(), () => {
			const output = run(PalindromeInstructionSet as InstructionSet, input, 100);
			expect(output.tape.toArray().toString()).includes('y');
			expect(output.tape.toArray().toString()).not.includes('n');
			expect(output.error).toBeUndefined();
		});
	}
});

describe('valid 1n number', () => {
	const testInputs = [
		['1'],
		['1', '1'],
		['1', '1', '1'],
		['1', '1', '1', '1'],
		['1', '1', '1', '1', '1'],
	];

	for (const input of testInputs) {
		test(input.toString(), () => {
			const output = run(PalindromeInstructionSet as InstructionSet, input, 100);
			expect(output.tape.toArray().toString()).includes('y');
			expect(output.tape.toArray().toString()).not.includes('n');
			expect(output.error).toBeUndefined();
		});
	}
});

// =============================================== invalid palindrome
describe('invalid odd number', () => {
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
			const output = run(PalindromeInstructionSet as InstructionSet, input, 100);
			expect(output.tape.toArray().toString()).includes('n');
			expect(output.tape.toArray().toString()).not.includes('y');
			expect(output.error).toBeUndefined();
		});
	}
});

describe('invalid even number', () => {
	const testInputs = [
		['1', '0'],
		['0', '1'],
		['1', '0', '0', '0'],
		['0', '1', '1', '1'],
		['0', '0', '0', '1'],
		['1', '1', '1', '0'],
		['0', '1', '0', '0', '1', '1'],
		['1', '0', '1', '1', '0', '0'],
		['0', '1'],
		['1', '0'],
		['0', '0', '0', '1'],
		['1', '1', '1', '0'],
		['1', '0', '0', '0'],
		['0', '1', '1', '1'],
		['1', '1', '0', '0', '1', '0'],
		['0', '0', '1', '1', '0', '1'],
	];

	for (const input of testInputs) {
		test(input.toString(), () => {
			const output = run(PalindromeInstructionSet as InstructionSet, input, 100);
			expect(output.tape.toArray().toString()).includes('n');
			expect(output.tape.toArray().toString()).not.includes('y');
			expect(output.error).toBeUndefined();
		});
	}
});

describe('invalid 0n number', () => {
	const testInputs = [
		['1', '0'],
		['1', '0', '0'],
		['1', '0', '0', '0'],
		['1', '0', '0', '0', '0'],
		['1', '0', '0', '0', '0', '0'],
		['0', '1'],
		['0', '0', '1'],
		['0', '0', '0', '1'],
		['0', '0', '0', '0', '1'],
		['0', '0', '0', '0', '0', '1'],
	];

	for (const input of testInputs) {
		test(input.toString(), () => {
			const output = run(PalindromeInstructionSet as InstructionSet, input, 100);
			expect(output.tape.toArray().toString()).includes('n');
			expect(output.tape.toArray().toString()).not.includes('y');
			expect(output.error).toBeUndefined();
		});
	}
});

describe('invalid 1n number', () => {
	const testInputs = [
		['0', '1'],
		['0', '1', '1'],
		['0', '1', '1', '1'],
		['0', '1', '1', '1', '1'],
		['0', '1', '1', '1', '1', '1'],
		['1', '0'],
		['1', '1', '0'],
		['1', '1', '1', '0'],
		['1', '1', '1', '1', '0'],
		['1', '1', '1', '1', '1', '0'],
	];

	for (const input of testInputs) {
		test(input.toString(), () => {
			const output = run(PalindromeInstructionSet as InstructionSet, input, 100);
			expect(output.tape.toArray().toString()).includes('n');
			expect(output.tape.toArray().toString()).not.includes('y');
			expect(output.error).toBeUndefined();
		});
	}
});
