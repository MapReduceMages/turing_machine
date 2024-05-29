import Joi from 'joi';
import Config from "../../config.json";

export type Direction = Readonly<'LEFT' | 'RIGHT'>;

export type Transition = Readonly<{
    readonly read: string;
    readonly write: string;
    readonly to_state: string;
    readonly action: Direction
}>

export const TransitionSchema = Joi.object({
    read: Joi.string().min(1).max(Config.maxAlphabetLength).required(),
    to_state: Joi.string().min(1).max(Config.maxStateLength).required(),
    write: Joi.string().min(1).max(Config.maxAlphabetLength).required(),
    action: Joi.string().valid(Config.action.leftLabel, Config.action.rightLabel).required(),
});

export interface InstructionSet {
    readonly name?: string; // Optional
    readonly alphabet: readonly string[];
    readonly blank: string;
    readonly states: readonly string[];
    readonly initial: string;
    readonly finals: readonly string[];
    readonly transitions: {
        readonly [key: string]: readonly Transition[];
    }
}

export const InstructionSetSchema = Joi.object({
    name: Joi.string().optional(),
    alphabet: Joi.array().items(Joi.string().min(1).max(Config.maxAlphabetLength)).required(),
    blank: Joi.string().min(1).max(Config.maxAlphabetLength).required(),
    states: Joi.array().items(Joi.string().min(1).max(Config.maxStateLength)).min(1).required(),
    initial: Joi.string().min(1).max(Config.maxStateLength).required(),
    finals: Joi.array().items(Joi.string().min(1).max(Config.maxStateLength)).min(1).required(),
    transitions: Joi.object().pattern(Joi.string().min(1), Joi.array().items(TransitionSchema)).required(),
});

export function checkInstructionSet(instructionSet: InstructionSet): Error | null {
    // Check if the alphabet contains the blank symbol
    if (!instructionSet.alphabet.includes(instructionSet.blank)) {
        return new Error(`The blank symbol ("${instructionSet.blank}") must be in the alphabet`);
    }

    // Check if the initial state is in the states
    if (!instructionSet.states.includes(instructionSet.initial)) {
        return new Error(`The initial state ("${instructionSet.initial}") must be in the states`);
    }

    // Check if the final states are in the states
    for (const finalState of instructionSet.finals) {
        if (!instructionSet.states.includes(finalState)) {
            return new Error(`The final states ("${finalState}") must be in the states`);
        }
    }

    // Check if the transitions are valid
    for (const state in instructionSet.transitions) {
        for (const transition of instructionSet.transitions[state]) {
            const { error } = TransitionSchema.validate(transition);
            if (error) {
                return error;
            }

            // Check if the read symbol is in the alphabet
            if (!instructionSet.alphabet.includes(transition.read)) {
                return new Error(`The read symbol ("${transition.read}") must be in the alphabet`);
            }

            // Check if the write symbol is in the alphabet
            if (!instructionSet.alphabet.includes(transition.write)) {
                return new Error(`The write symbol ("${transition.write}") must be in the alphabet`);
            }

            // Check if the to state is in the states
            if (!instructionSet.states.includes(transition.to_state)) {
                return new Error(`The to state ("${transition.to_state}") must be in the states`);
            }
        }
    }

    return null
}