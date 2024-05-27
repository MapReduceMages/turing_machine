import Joi from 'joi';

export interface Transition {
    readonly read: string;
    readonly to_state: string;
    readonly write: string;
    readonly action: string;
}

export const TransitionSchema = Joi.object({
    read: Joi.string().min(1).required(),
    to_state: Joi.string().min(1).required(),
    write: Joi.string().min(1).required(),
    action: Joi.string().min(1).required(),
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
    alphabet: Joi.array().items(Joi.string().min(1)).required(),
    blank: Joi.string().min(1).required(),
    states: Joi.array().items(Joi.string().min(1)).required(),
    initial: Joi.string().min(1).required(),
    finals: Joi.array().items(Joi.string().min(1)).required(),
    transitions: Joi.object().pattern(Joi.string().min(1), Joi.array().items(TransitionSchema)).required(),
});