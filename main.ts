import {run} from './src/lib/logic/machine.ts';
import type {TransitionMap} from './src/lib/logic/machine.ts';

const inputTransitions: TransitionMap = {
    "scanright": {
        '.': {write: ".", toState: "scanright", action: "RIGHT"},
        '1': {write: "1", toState: "scanright", action: "RIGHT"},
        '-': {write: "-", toState: "scanright", action: "RIGHT"},
        '=': {write: "=", toState: "eraseone", action: "LEFT"},
    }, 
    "eraseone": {
        '1': {write: "=", toState: "subone", action: "LEFT"},
        '-': {write: ".", toState: "HALT", action: "LEFT"},
    },
    "subone": {
        '1': {write: "1", toState: "subone", action: "LEFT"},
        '-': {write: "-", toState: "skip", action: "LEFT"},
    },
    "skip": {
        ".": {write: ".", toState: "skip", action: "LEFT"},
        "1": {write: ".", toState: "scanright", action: "RIGHT"},
    }
};

try {
    run ({tape: "111-11=".split(''), headPosition: 0, currentState: "scanright"})(inputTransitions); 
} catch (error: any) {
    console.error(error.message);
}
