import Immutable from 'immutable';
import type { InstructionSet } from '../models/instruction_set';
import type { Output } from '../models/output';
import type { Tape } from '../models/tape';
import type { Cycle } from '../models/cycle';
import type { Transition, Transitions, Direction } from '../models/transition';

// ------------------------------------------------ Turing types
const SHIFT_STEP = 1;
const DEFAULT_HEAD_POSITION = 0;

type Parameters = Readonly<{
	readonly finals: Immutable.List<string>;
	readonly transitions: Transitions;
}>;

// ------------------------------------------------ Turing visualize
function visualize(
	tape: Tape,
	headPosition: number,
	currentSymbol: string,
	previousTransition: Transition,
	nextTransition: Transition,
) {
	const tapeShow =
		'[' +
		tape
			.map((symbol, index): string => (index === headPosition ? `<${symbol}>` : `${symbol}`))
			.join('') +
		']';
	const transitionShow = `(${previousTransition.to_state}, ${currentSymbol}) -> (${nextTransition.to_state}, ${nextTransition.write}, ${nextTransition.action})`;
	console.log(`${tapeShow} ${transitionShow}`);
}

// ------------------------------------------------ Turing helper functions
const finalReached =
	(finals: Immutable.List<string>) =>
		(symbol: string): boolean =>
			finals.includes(symbol);
const limitReached = (currentLimit: number): boolean => currentLimit === 0;
const moveHead =
	(headposition: number) =>
		(direction: Direction): number =>
			direction === 'LEFT' ? headposition - SHIFT_STEP : headposition + SHIFT_STEP;
const updateTape =
	(tape: Tape) =>
		(headPosition: number) =>
			(newSymbol: string): Tape =>
				tape.set(headPosition, newSymbol);
const getNextTransition =
	(transitions: Transitions) =>
		(previousCycle: Cycle) =>
			(currentSymbol: string): Transition | Error =>
				transitions
					.get(previousCycle.transition.to_state)
					?.find((transition) => transition.read === currentSymbol) ??
				new Error(
					`No transition defined for state ${previousCycle.transition.to_state} and symbol ${currentSymbol}`,
				);

// ------------------------------------------------ Turing main function
const step =
	(parameters: Parameters) =>
		(tape: Tape) =>
			(cycle: Cycle): Readonly<Output> => {
				const previousTransition = cycle.transition;
				const currentState = previousTransition.to_state;
				const currentHeadPosition = moveHead(cycle.headPosition)(previousTransition.action);
				const currentSymbol = tape.get(currentHeadPosition)!;

				if (finalReached(parameters.finals)(currentState) || limitReached(cycle.limit))
					return {
						tape,
						states: Immutable.List([cycle]),
					};

				const nextTransition = getNextTransition(parameters.transitions)(cycle)(currentSymbol);
				if (nextTransition instanceof Error)
					return { tape, states: Immutable.List([cycle]), error: nextTransition };

				visualize(tape, currentHeadPosition, currentSymbol, previousTransition, nextTransition); // dbg, side effect

				const nextLimit = cycle.limit - 1;
				const nextCycle = {
					transition: nextTransition,
					headPosition: currentHeadPosition,
					limit: nextLimit,
				};
				const nextTape = updateTape(tape)(currentHeadPosition)(nextTransition.write);
				const nextReturn = step(parameters)(nextTape)(nextCycle);

				return {
					tape: nextReturn.tape,
					states: nextReturn.states.push(cycle),
					error: nextReturn.error,
				};
			};

export function run(
	instructionSet: InstructionSet,
	tape: string[],
	limit: number,
): Readonly<Output> {
	// --------------------------- Parameters functional interfacing
	const parameters = {
		finals: Immutable.List<string>(instructionSet.finals),
		transitions: Immutable.Map<string, Transition[]>(
			Object.entries(instructionSet.transitions).map(([key, value]) => [
				key,
				value.map(
					(t) =>
						<Transition>{
							read: t.read,
							write: t.write,
							to_state: t.to_state,
							action: t.action,
						},
				),
			]),
		),
	};
	const machineWithParameters = step(parameters);
	// --------------------------- Tape functional interfacing
	const initialTape = Immutable.List(tape);
	const machineWithParametersAndTape = machineWithParameters(initialTape);
	// --------------------------- Cycle functional interfacing
	const initialCycle = {
		transition: <Transition>{
			action: 'RIGHT', // not used
			to_state: instructionSet.initial,
			read: '@', // not used
			write: '@', // not used
		},
		headPosition: DEFAULT_HEAD_POSITION,
		limit,
	};
	return machineWithParametersAndTape(initialCycle);
}
