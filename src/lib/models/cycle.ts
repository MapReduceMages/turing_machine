import type { Tape } from './tape';
import type { Transition } from './transition';

export type Cycle = Readonly<{
	readonly transition: Transition;
	readonly headPosition: number;
	readonly limit: number;

	// used for visualizer, definitely not ideal but oh well
	readonly tape: Tape;
}>;
