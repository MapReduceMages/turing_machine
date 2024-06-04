import { describe, test, expect } from 'vitest';
import { visualizeOutput } from '$lib/view/display_result';
import { List } from 'immutable';
import type { Output } from '$lib/models/output';

describe('Visualization test', () => {
    const SimpleOutput = <Output>{
        tape: List(['.', '1', 'n']),
        states: List([
            {
                transition: {
                    read: ".",
                    write: "n",
                    to_state: "HALT",
                    action: "LEFT",
                },
                headPosition: 1,
                limit: 1334,
            },
            {
                transition: {
                    read: "1",
                    write: "1",
                    to_state: "search_0",
                    action: "RIGHT",
                },
                headPosition: 2,
                limit: 1335,
            },
            {
                transition: {
                    read: "0",
                    write: ".",
                    to_state: "search_0_start",
                    action: "RIGHT",
                },
                headPosition: 1,
                limit: 1336,
            },
            {
                transition: {
                    action: "RIGHT",
                    to_state: "new_search",
                    read: "@",
                    write: "@",
                },
                headPosition: 0,
                limit: 1337,
            },
        ]),
        error: undefined,
    }
    const ExpectedOutput = `[<.>1] (new_search, 0) -> (search_0_start, ., RIGHT)
    [.<1>] (search_0_start, 1) -> (search_0, 1, RIGHT)
    [.1<n>] (search_0, .) -> (HALT, n, LEFT)`
    const output = visualizeOutput(SimpleOutput);

    test('Output string is not empty', () => {
        expect(output).not.toBe('');
    });

    test('Output order is correct', () => {
        expect(output.split('\n').splice(-1)[0].includes(SimpleOutput.states.first()!.transition.action ?? "HALT")).toBe(true);
    });

});
