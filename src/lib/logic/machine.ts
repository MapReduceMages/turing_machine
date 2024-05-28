// consts, will need to be decoupled partly
const alphabet = ['1', '.', '-', '='];
const blank = '.';
const states = ['scanright', 'eraseone', 'subone', 'skip', 'HALT'];
const finals = ['HALT'];

type State = string;
export type Direction = 'LEFT' | 'RIGHT';
export type Transition = {
    readonly write: string;
    readonly toState: State;
    readonly action: Direction;
}

export interface Machine {
    readonly tape: Array<string>;
    readonly headPosition: number;
    readonly currentState: State;
}

export type TransitionMap = Record<State, Record<string, Transition>>;


function visualize(machine: Machine, transitions : TransitionMap) {
    machine.tape[machine.headPosition] = '<' + machine.tape[machine.headPosition] + '>';
    console.log('[' + machine.tape + ']', machine.currentState);
}


const moveHead = (headposition: number) => (direction: Direction) => direction === "LEFT" ? headposition - 1 : headposition + 1;
const step = (machine: Machine) => (transitions : TransitionMap) : Machine => {
    // DEBUG, with side effects!
    visualize(structuredClone(machine), structuredClone(transitions));

    const symbol = machine.tape[machine.headPosition];
    const transition = transitions[machine.currentState][symbol];
    return {
        tape: [...machine.tape.slice(0, machine.headPosition), transition.write, ...machine.tape.slice(machine.headPosition + 1)],
        headPosition: moveHead(machine.headPosition)(transition.action),
        currentState: transition.toState
    };
};
const shouldHalt = (currentState : State) => finals.includes(currentState);
export const run = (machine: Machine) => (transitions : TransitionMap ): Machine => shouldHalt(machine.currentState) ? machine : run(step(machine)(transitions))(transitions);