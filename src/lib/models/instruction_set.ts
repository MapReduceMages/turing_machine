export interface Transition {
    readonly read: string;
    readonly to_state: string;
    readonly write: string;
    readonly action: string;
}

export interface InstructionSet {
    readonly name: string;
    readonly alphabet: readonly string[];
    readonly blank: string;
    readonly states: readonly string[];
    readonly initial: string;
    readonly finals: readonly string[];
    readonly transitions: {
        readonly [key: string]: readonly Transition[];
    }
}
