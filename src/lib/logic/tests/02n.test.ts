import { describe, test, expect } from 'vitest';
import { run } from '../machine';
import _02nInstructionSet from '$lib/data/presets/02n.json';
import type { InstructionSet } from '../../models/instruction_set';

// =============================================== tricky cases
describe('valid even number', () => {
	const testInputs = [[]];

	for (const input of testInputs) {
		test(input.toString(), () => {
			const output = run(_02nInstructionSet as InstructionSet, input, 1000);
			expect(output.tape.toArray().toString()).includes('n');
			expect(output.tape.toArray().toString()).not.includes('y');
			expect(output.error).toBeUndefined();
		});
	}
});

// =============================================== valid 02n
describe('valid even number', () => {
	const MAX = 10;
	const testInputs = new Array(MAX)
		.fill(null)
		.map((_, index) => new Array((index + 1) * 2).fill('0'));

	for (const input of testInputs) {
		test(input.toString(), () => {
			const output = run(_02nInstructionSet as InstructionSet, input, 1000);
			expect(output.tape.toArray().toString()).includes('y');
			expect(output.tape.toArray().toString()).not.includes('n');
			expect(output.error).toBeUndefined();
		});
	}
});

// =============================================== invalid 02n
describe('invalid odd number', () => {
	const MAX = 10;
	const testInputs = new Array(MAX)
		.fill(null)
		.map((_, index) => new Array(index * 2 + 1).fill('0'));

	for (const input of testInputs) {
		test(input.toString(), () => {
			const output = run(_02nInstructionSet as InstructionSet, input, 1000);
			expect(output.tape.toArray().toString()).includes('n');
			expect(output.tape.toArray().toString()).not.includes('y');
			expect(output.error).toBeUndefined();
		});
	}
});
