type Direction = 'LEFT' | 'RIGHT';

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

type MachineOutput = Readonly<{
    readonly tape: Tape,
    readonly states: ReadonlyArray<Cycle>
}> | Error;


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

const shouldHalt = (finals: ReadonlyArray<string>) => (symbol: string) : boolean => finals.includes(symbol);
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
    const currentSymbol = tape[previousCycle.headPosition];

    if (shouldHalt(parameters.finals)(previousCycle.transition.toState) || previousCycle.limit === 0) return { 
        tape,
        states: []
    }

    const nextTransition = getNextTransition(parameters)(previousCycle)(currentSymbol)
    if (nextTransition instanceof Error) return nextTransition;

    visualize(tape, previousCycle.headPosition, currentSymbol, previousCycle.transition, nextTransition); // dbg, side effect

    const nextReturn = run(parameters)(
        updateTape(tape)(previousCycle.headPosition)(nextTransition.write)
    )({
        transition: nextTransition,
        headPosition: moveHead(previousCycle.headPosition)(nextTransition.move),
        limit: previousCycle.limit - 1
    });
    if (nextReturn instanceof Error) return nextReturn;

    return {
        tape: nextReturn.tape,
        states: [previousCycle]
    };
}

export const start = (parameters: Parameters) => (tape: Tape) => (next: Cycle): MachineOutput => run(parameters)(tape)(next);