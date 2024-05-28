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



const shouldHalt = (symbol: string, finals: ReadonlyArray<string>): boolean => finals.includes(symbol);
// const moveHead = (headposition: number) => (direction: Direction) => direction === "LEFT" ? headposition - 1 : headposition + 1;

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

export const step = (parameters: Parameters) => (tape: Tape) => (previousCycle: Cycle): MachineOutput => {
    const currentSymbol = tape[previousCycle.headPosition];

    if (shouldHalt(previousCycle.transition.toState, parameters.finals) || previousCycle.limit === 0) return <MachineOutput>{
        tape,
        states: []
    }
    const nextTransition = parameters.transitions.get(previousCycle.transition.toState)!.find(transition => transition.read === currentSymbol)!;
    visualize(tape, previousCycle.headPosition, currentSymbol, previousCycle.transition, nextTransition);
    const newTape = [...tape.slice(0, previousCycle.headPosition), nextTransition.write, ...tape.slice(previousCycle.headPosition + 1)];
    const nextPosition = previousCycle.headPosition + (nextTransition.move === "LEFT" ? -1 : 1);
    const nextCycle = <Cycle>{
        transition: nextTransition,
        headPosition: nextPosition,
        limit: previousCycle.limit - 1
    };
    const nextReturn = step(parameters)(newTape)(nextCycle);
    if (nextReturn instanceof Error) return nextReturn;

    return <MachineOutput>{
        tape: nextReturn.tape,
        states: [previousCycle] // add previous cycle
    };
}

export const start = (parameters: Parameters) => (tape: Tape) => (next: Cycle): MachineOutput => {
    const stepWithParameter = step(parameters);

    return stepWithParameter(tape)(next);
}



// error
// si pas assez de place ?
