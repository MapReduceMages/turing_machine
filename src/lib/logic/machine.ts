import Immutable from "immutable";

// ------------------------------------------------ Turing types
const SHIFT_STEP = 1;
export type Direction = Readonly<'LEFT' | 'RIGHT'>;
export type Transitions = Immutable.Map<string, Transition[]>
export type Parameters = Readonly<{
    readonly finals: Immutable.List<string>
    readonly transitions: Transitions
}>
export type Transition = Readonly<{
    readonly read: string;
    readonly write: string;
    readonly toState: string;
    readonly move: Direction
}>
export type Cycle = Readonly<{
    readonly transition: Transition,
    readonly headPosition: number,
    readonly limit: number
}>
export type Tape = Immutable.List<string>
export type MachineOutput = Readonly<{
    readonly tape: Tape,
    readonly states: Immutable.List<Cycle>
    readonly error?: Error
}>;

// ------------------------------------------------ Turing visualize
function visualize(tape: Tape, headPosition: number, currentSymbol: string, previousTransition: Transition, nextTransition: Transition) {
    const tapeShow = "[" + tape.map((symbol, index): string => index === headPosition ? `<${symbol}>` : `${symbol}`).join("") + "]";
    const transitionShow = `(${previousTransition.toState}, ${currentSymbol}) -> (${nextTransition.toState}, ${nextTransition.write}, ${nextTransition.move})`;
    console.log(`${tapeShow} ${transitionShow}`);
}

// ------------------------------------------------ Turing helper functions
const finalReached = (finals: Immutable.List<string>) => (symbol: string): boolean => finals.includes(symbol);
const limitReached = (currentLimit: number): boolean => currentLimit === 0;
const moveHead = (headposition: number) => (direction: Direction): number => direction === "LEFT" ? headposition - SHIFT_STEP : headposition + SHIFT_STEP;
const updateTape = (tape: Tape) => (headPosition: number) => (newSymbol: string): Tape => tape.set(headPosition, newSymbol);
const getNextTransition = (transitions: Transitions) => (previousCycle: Cycle) => (currentSymbol: string): Transition | Error =>
    transitions.get(previousCycle.transition.toState)?.find(transition => transition.read === currentSymbol) ?? new Error(`No transition defined for state ${previousCycle.transition.toState} and symbol ${currentSymbol}`);

// ------------------------------------------------ Turing main function
export const run = (parameters: Parameters) => (tape: Tape) => (cycle: Cycle): Readonly<MachineOutput> => {
    const previousTransition = cycle.transition;
    const currentState = previousTransition.toState;
    const currentHeadPosition = moveHead(cycle.headPosition)(previousTransition.move);
    const currentSymbol = tape.get(currentHeadPosition)!;

    if (finalReached(parameters.finals)(currentState) || limitReached(cycle.limit)) return {
        tape,
        states: Immutable.List([cycle])
    }

    const nextTransition = getNextTransition(parameters.transitions)(cycle)(currentSymbol)
    if (nextTransition instanceof Error) return { tape, states: Immutable.List([cycle]), error: nextTransition }

    visualize(tape, currentHeadPosition, currentSymbol, previousTransition, nextTransition); // dbg, side effect

    const nextLimit = cycle.limit - 1;
    const nextCycle = {
        transition: nextTransition,
        headPosition: currentHeadPosition,
        limit: nextLimit
    };
    const nextTape = updateTape(tape)(currentHeadPosition)(nextTransition.write)
    const nextReturn = run(parameters)(nextTape)(nextCycle);

    return {
        tape: nextReturn.tape,
        states: nextReturn.states.push(cycle),
        error: nextReturn.error
    };
}

// infinit tape
// visu a la fin