import Joi from 'joi';
import Config from '../../config.json';

export interface Cycle {
	state: string;
	symbol: string;
	move: 'LEFT' | 'RIGHT';
}

export const CycleSchema = Joi.object({
	state: Joi.string().min(1).max(Config.maxStateLength).required(),
	symbol: Joi.string().min(1).max(Config.maxAlphabetLength).required(),
	move: Joi.string().valid(Config.action.leftLabel, Config.action.rightLabel).required(),
});
