import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';

import { run } from './src/lib/logic/machine.ts';
import {
	InstructionSetSchema,
	checkInstructionSet,
	type InstructionSet,
} from './src/lib/models/instruction_set.ts';
import { visualizeOutput } from './src/lib/view/display_result.ts';

// Input
const formatInput = (input: string): string[] => input.split('');
const validateInput =
	(instructions: InstructionSet) =>
	(input: string[]): Error | undefined => {
		input.map((char) => {
			if (!instructions.alphabet.includes(char)) {
				return error(`Input contains invalid character: ${char}`);
			}
		});
		return undefined;
	};

// I/O, not pure by design, tryWrapper remedies this somewhat
const tryWrapper =
	(fn: Function) =>
	(...params: any): any | Error => {
		try {
			return fn(...params);
		} catch (error) {
			return error;
		}
	};
const readFile = (path: string): string | Error => tryWrapper(fs.readFileSync)(path, 'utf-8');
const parsedInstructions: (text: string) => Object | Error = tryWrapper(JSON.parse);

const error = (msg: string, yg?: any) => {
	console.error('[ERROR]', msg);
	if (yg) console.log(yg.help());
	process.exit(1);
};

const getArgs = (args: string[]) =>
	yargs(hideBin(args))
		.command('$0 <jsonfile> <input>', 'run a turing machine')
		.scriptName('ft_turing')
		.usage('Usage: $0 <jsonfile> <input>')
		.positional('jsonfile', {
			describe: 'json description of the machine',
			type: 'string',
			demandOption: 'true',
		})
		.positional('input', {
			describe: 'input of the machine',
			type: 'string',
			demandOption: 'true',
		})
		.option('steps', {
			describe: 'number of steps to run the machine',
			type: 'number',
			default: 1337,
		})
		.fail((msg, _, yargs) => {
			error(msg, yargs);
		})
		.strict()
		.parse();

const main = () => {
	const args = getArgs(process.argv);
	const steps = args['steps'] as number;
	const jsonFilePath = args['jsonfile'] as string;

	if (steps <= 0) {
		error('Number of steps must be greater than 0');
	}

	// read file
	const fileContent = readFile(jsonFilePath);
	if (typeof fileContent !== 'string') {
		error(fileContent.message);
	}
	if (fileContent === '') {
		error('File is empty');
	}

	// JSON load
	const instructionsObj: Object | Error = parsedInstructions(fileContent as string);
	if (instructionsObj instanceof Error) {
		error(instructionsObj.message);
	}

	// validate instructions
	const schemaValidation = InstructionSetSchema.validate(instructionsObj);
	if (schemaValidation.error) {
		error(schemaValidation.error.message);
	}

	const instructions = schemaValidation.value as InstructionSet;
	const instructionValidation = checkInstructionSet(instructions);
	if (instructionValidation != null) {
		error(instructionValidation.message);
	}

	// input
	const input = formatInput(args['input']);
	const isInputValid = validateInput(instructions)(input);
	if (isInputValid instanceof Error) {
		error(isInputValid.message);
	}

	// run
	const result = run(instructions, input, steps);
	if (result.error !== undefined) {
		error(result.error?.message ?? 'Unknown error during Turing machine execution');
	}

	console.log(visualizeOutput(input)(result));

	const executed_steps = result.states.size;
	if (executed_steps > steps)
		console.log(`\n[Warning] Maximum step number (${steps}) exceeded. The machine could be stuck`);
};

main();
