import type { Output } from '../models/output';
import { List } from 'immutable';

const buildTransitionString = (output: Output): string => {
	const prevState = output.states.get(1);
	const currentState = output.states.get(0);
	if (prevState === undefined || currentState === undefined || output.tape === undefined) {
		return '';
	}

	const currentChar = output.tape.get(prevState.headPosition);

	const tapeString = `[${output.tape
		.map((val, key) => {
			return key === prevState.headPosition ? `<${val}>` : val;
		})
		.join('')}]`;
	const transitionString = `(${prevState.transition.to_state}, ${currentChar}) -> (${currentState.transition.to_state}, ${currentState.transition.write}, ${currentState.transition.action})`;

	return `${tapeString} ${transitionString}`;
};

const buildOutput =
	(output: Output) =>
	(existingString: string): string => {
		const currentState = output.states.get(0);
		if (output.states.isEmpty() || currentState === undefined) {
			return existingString;
		}

		const newString = buildTransitionString({ tape: currentState.tape, states: output.states });

		const newOutput = <Output>{
			tape: currentState.tape,
			states: output.states.shift(),
		};

		return buildOutput(newOutput)(`${newString}\n${existingString}`);
	};

export const visualizeOutput =
	(inputTape: string[]) =>
	(output: Output): string => {
		const out = buildOutput(<Output>{
			states: List(output.states),
			tape: List(inputTape),
		})('');

		return out.trim();
	};
