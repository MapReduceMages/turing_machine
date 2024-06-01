import Immutable from 'immutable';
import type { InstructionSet, Transition, Direction } from '../models/instruction_set';

// ------------------------------------------------ Turing types
const SHIFT_STEP = 1;
const DEFAULT_HEAD_POSITION = 0;

type Transitions = Immutable.Map<string, Transition[]>;
type Parameters = Readonly<{
	readonly finals: Immutable.List<string>;
	readonly blank: string;
	readonly transitions: Transitions;
}>;

type Cycle = Readonly<{
	readonly transition: Transition;
	readonly headPosition: number;
	readonly limit: number;
}>;
type Tape = Immutable.List<string>;
type MachineOutput = Readonly<{
	readonly tape: Tape;
	readonly states: Immutable.List<Cycle>;
	readonly error?: Error;
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
const checkTapeOverflow = (
	tape: Tape,
	headPosition: number,
	blank: string,
): {
	checkedTape: Tape;
	checkedHeadPosition: number;
} => {
	const tapeLength = tape.size;
	const leftOverflow = headPosition < 0;
	const rightOverflow = headPosition >= tapeLength;

	if (leftOverflow) {
		const checkedTape = tape.unshift(blank);
		const checkedHeadPosition = headPosition + 1;
		return { checkedTape, checkedHeadPosition };
	} else if (rightOverflow) {
		const checkedTape = tape.push(blank);
		return { checkedTape, checkedHeadPosition: headPosition };
	}

	return { checkedTape: tape, checkedHeadPosition: headPosition };
};

// ------------------------------------------------ Turing main function
const step =
	(parameters: Parameters) =>
	(tape: Tape) =>
	(cycle: Cycle): Readonly<MachineOutput> => {
		const previousTransition = cycle.transition;
		const currentState = previousTransition.to_state;

		if (finalReached(parameters.finals)(currentState) || limitReached(cycle.limit))
			return {
				tape,
				states: Immutable.List([cycle]),
			};

		const currentHeadPosition = moveHead(cycle.headPosition)(previousTransition.action);
		const { checkedTape, checkedHeadPosition } = checkTapeOverflow(
			tape,
			currentHeadPosition,
			parameters.blank,
		);
		const currentSymbol = checkedTape.get(checkedHeadPosition)!;

		const nextTransition = getNextTransition(parameters.transitions)(cycle)(currentSymbol);
		if (nextTransition instanceof Error)
			return { tape: checkedTape, states: Immutable.List([cycle]), error: nextTransition };
		visualize(checkedTape, checkedHeadPosition, currentSymbol, previousTransition, nextTransition); // dbg, side effect

		const nextLimit = cycle.limit - 1;
		const nextCycle = {
			transition: nextTransition,
			headPosition: checkedHeadPosition,
			limit: nextLimit,
		};
		const nextTape = updateTape(checkedTape)(checkedHeadPosition)(nextTransition.write);
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
): Readonly<MachineOutput> {
	// --------------------------- Parameters functional interfacing
	const parameters = {
		blank: instructionSet.blank,
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
