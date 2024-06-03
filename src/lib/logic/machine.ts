import Immutable from 'immutable';
import type { InstructionSet } from '../models/instruction_set';
import type { Output } from '../models/output';
import type { Tape } from '../models/tape';
import type { Cycle } from '../models/cycle';
import type { Transition, Transitions, Direction } from '../models/transition';

// ------------------------------------------------ Turing types
const SHIFT_STEP = 1;

type Parameters = Readonly<{
	readonly finals: Immutable.List<string>;
	readonly blank: string;
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
<<<<<<< HEAD
=======
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
>>>>>>> c268b99 ([Clean] format: run format)
const checkTapeOverflow =
	(blank: string) =>
		(tape: Tape) =>
			(
				headPosition: number,
			): {
				readonly checkedTape: Tape;
				readonly checkedHeadPosition: number;
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
			(cycle: Cycle): Readonly<Output> => {
				// ----------------------------------------------------------------------- check final state or limit reached
				const previousTransition = cycle.transition;
				const currentState = previousTransition.to_state;
				if (finalReached(parameters.finals)(currentState) || limitReached(cycle.limit))
					return { tape, states: Immutable.List([cycle]) };

				// ----------------------------------------------------------------------- check tape overflow
				const currentHeadPosition = cycle.headPosition;
				const { checkedTape, checkedHeadPosition } = checkTapeOverflow(parameters.blank)(tape)(
					currentHeadPosition,
				);

				// ----------------------------------------------------------------------- read symbol
				const currentSymbol = checkedTape.get(checkedHeadPosition);
				if (currentSymbol === undefined)
					return {
						tape: checkedTape,
						states: Immutable.List([cycle]),
						error: new Error('Head position out of tape'),
					};

				// ----------------------------------------------------------------------- find the new transitions
				const nextTransitions = parameters.transitions.get(currentState);
				if (nextTransitions === undefined)
					return {
						tape: checkedTape,
						states: Immutable.List([cycle]),
						error: new Error('No transitions defined for state'),
					};

				// ----------------------------------------------------------------------- find the new transition
				const nextTransition = nextTransitions.find((t) => t.read === currentSymbol);
				if (nextTransition === undefined)
					return {
						tape: checkedTape,
						states: Immutable.List([cycle]),
						error: new Error('No transition defined for symbol'),
					};

				// ----------------------------------------------------------------------- write symbol
				const nextTape = checkedTape.set(checkedHeadPosition, nextTransition.write);

				// ----------------------------------------------------------------------- move head
				const nextHeadPosition = moveHead(checkedHeadPosition)(nextTransition.action);

				// ----------------------------------------------------------------------- define next cycle
				const nextLimit = cycle.limit - 1;
				const nextCycle = {
					transition: nextTransition,
					headPosition: nextHeadPosition,
					limit: nextLimit,
				};

				// ----------------------------------------------------------------------- run next step
				const nextReturn = step(parameters)(nextTape)(nextCycle);

				// ----------------------------------------------------------------------- visualize
				visualize(nextTape, checkedHeadPosition, currentSymbol, previousTransition, nextTransition);

				// ----------------------------------------------------------------------- return next steps
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
	headPosition: number = 0,
): Readonly<Output> {
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
		headPosition,
		limit,
	};
	return machineWithParametersAndTape(initialCycle);
}
