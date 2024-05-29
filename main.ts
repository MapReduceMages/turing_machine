import { start, type Parameters, type Cycle, type Transition, type MachineOutput } from './src/lib/logic/machine.ts';
import type { InstructionSet } from './src/lib/models/instruction_set.ts';

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
    const result = start
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
        console.log(result.states.toArray());
} catch (error: any) {
    console.error(error.message);
}
