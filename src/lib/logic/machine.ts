type Direction = 'LEFT' | 'RIGHT';
import Immutable from "immutable";

export type Parameters = Readonly<{
    readonly finals: ReadonlyArray<string>
    readonly transitions: Map<string, Transition[]>
}>

export interface Transition {
    readonly read: string;
    readonly write: string;
    readonly toState: string;
    readonly move: Direction
}

export interface Cycle {
    transition: Transition
    headPosition: number,
    limit: number,
}

type Tape = Array<string>

export type MachineOutput = Readonly<{
    readonly tape: Tape,
    readonly states: Immutable.List<Cycle>
    readonly error?: Error
}>;


function visualize(tape: Tape, headPosition: number, currentSymbol: string, previousTransition: Transition, nextTransition: Transition) {
    process.stdout.write("[");
    tape.forEach((symbol, index) => {
        if (index === headPosition) {
            process.stdout.write(`<${symbol}>`);
        } else {
            process.stdout.write(`${symbol}`);
        }
    })
    process.stdout.write("]");
    console.log(` (${previousTransition.toState}, ${currentSymbol}) -> (${nextTransition.toState}, ${nextTransition.write}, ${nextTransition.move})`);
}

const shouldHalt = (finals: ReadonlyArray<string>) => (symbol: string): boolean => finals.includes(symbol);
const moveHead = (headposition: number) => (direction: Direction) => direction === "LEFT" ? headposition - 1 : headposition + 1;
const updateTape = (tape: Tape) => (headPosition: number) => (newSymbol: string) => [...tape.slice(0, headPosition), newSymbol, ...tape.slice(headPosition + 1)];
const getNextTransition = (parameters: Parameters) => (previousCycle: Cycle) => (currentSymbol: string): Transition | Error => {
    const nextTransitionList = parameters.transitions.get(previousCycle.transition.toState);
    if (!nextTransitionList) {
        return new Error(`No transition list defined for state ${previousCycle.transition.toState}`);
    }

    const nextTransition = nextTransitionList.find(transition => transition.read === currentSymbol);
    if (!nextTransition) {
        return new Error(`No transition defined for state ${previousCycle.transition.toState} and symbol ${currentSymbol}`);
    }

    return nextTransition;
}

export const run = (parameters: Parameters) => (tape: Tape) => (previousCycle: Cycle): MachineOutput => {
    const currentHeadPosition = previousCycle.headPosition;
    const currentTransition = previousCycle.transition;
    const currentState = currentTransition.toState;
    const currentSymbol = tape[currentHeadPosition];

    if (shouldHalt(parameters.finals)(currentState) || previousCycle.limit === 0) return {
        tape,
        states: Immutable.List([])
    }

    const nextTransition = getNextTransition(parameters)(previousCycle)(currentSymbol)
    if (nextTransition instanceof Error) return {
        tape,
        states: Immutable.List([]),
        error: nextTransition
    }

    visualize(tape, currentHeadPosition, currentSymbol, currentTransition, nextTransition); // dbg, side effect

    const nextHeadPosition = moveHead(currentHeadPosition)(nextTransition.move);
    const nextLimit = previousCycle.limit - 1;
    const nextCycle = {
        transition: nextTransition,
        headPosition: nextHeadPosition,
        limit: nextLimit
    };
    const nextTape = updateTape(tape)(currentHeadPosition)(nextTransition.write)
    const nextReturn = run(parameters)(nextTape)(nextCycle);

    return {
        tape: nextReturn.tape,
        states: nextReturn.states.push(nextCycle),
        error: nextReturn.error
    };
}

export const start = (parameters: Parameters) => (tape: Tape) => (next: Cycle): MachineOutput => run(parameters)(tape)(next);

// infinit tape
// error
// return DONE