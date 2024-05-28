import { start, type Parameters, type Cycle, type Transition } from './src/lib/logic/machine_3.ts';
// import { run } from './src/lib/logic/machine.ts';
import type { TransitionMap } from './src/lib/logic/machine.ts';
import type { InstructionSet } from './src/lib/models/instruction_set.ts';

// const inputTransitions: TransitionMap = {
//     "scanright": {
//         '.': { write: ".", toState: "scanright", action: "RIGHT" },
//         '1': { write: "1", toState: "scanright", action: "RIGHT" },
//         '-': { write: "-", toState: "scanright", action: "RIGHT" },
//         '=': { write: "=", toState: "eraseone", action: "LEFT" },
//     },
//     "eraseone": {
//         '1': { write: "=", toState: "subone", action: "LEFT" },
//         '-': { write: ".", toState: "HALT", action: "LEFT" },
//     },
//     "subone": {
//         '1': { write: "1", toState: "subone", action: "LEFT" },
//         '-': { write: "-", toState: "skip", action: "LEFT" },
//     },
//     "skip": {
//         ".": { write: ".", toState: "skip", action: "LEFT" },
//         "1": { write: ".", toState: "scanright", action: "RIGHT" },
//     }
// };

// try {
//     run({ tape: "111-11=".split(''), headPosition: 0, currentState: "scanright" })(inputTransitions);
// } catch (error: any) {
//     console.error(error.message);
// }


const instructionSet: InstructionSet = {
    alphabet: ['1', '.', '-', '='],
    blank: '.',
    states: ['scanright', 'eraseone', 'subone', 'skip', 'HALT'],
    initial: 'scanright',
    finals: ['HALT'],
    transitions: {
        "scanright": [
            { "read": ".", "to_state": "scanright", "write": ".", "action": "RIGHT" },
            { "read": "1", "to_state": "scanright", "write": "1", "action": "RIGHT" },
            { "read": "-", "to_state": "scanright", "write": "-", "action": "RIGHT" },
            { "read": "=", "to_state": "eraseone", "write": ".", "action": "LEFT" }
        ],
        "eraseone": [
            { "read": "1", "to_state": "subone", "write": "=", "action": "LEFT" },
            { "read": "-", "to_state": "HALT", "write": ".", "action": "LEFT" }
        ],
        "subone": [
            { "read": "1", "to_state": "subone", "write": "1", "action": "LEFT" },
            { "read": "-", "to_state": "skip", "write": "-", "action": "LEFT" }
        ],
        "skip": [
            { "read": ".", "to_state": "skip", "write": ".", "action": "LEFT" },
            { "read": "1", "to_state": "scanright", "write": ".", "action": "RIGHT" }
        ]
    }
};

const initialTape = ["1", "1", "1", "-", "1", "1", "=", ".", "."];
const initialPos = 0;

try {
    // run({ tape: "111-11=".split(''), headPosition: 0, currentState: "scanright" })(instructionSet);
    start
        (<Parameters>{
            finals: instructionSet.finals,
            transitions: new Map<string, Transition[]>(Object.entries(instructionSet.transitions).map(([key, value]) => [key, value.map(t => <Transition>{
                read: t.read,
                write: t.write,
                toState: t.to_state,
                move: t.action === "LEFT" ? "LEFT" : "RIGHT"
            })]))
        })
        (initialTape)
        (<Cycle>{
            headPosition: initialPos,
            transition: <Transition>{
                move: "RIGHT",
                toState: "scanright",
                read: "1",
                write: "1"
            },
            limit: 100
        });
} catch (error: any) {
    console.error(error.message);
}
