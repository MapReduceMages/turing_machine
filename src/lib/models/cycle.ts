import type { Transition } from './transition';

export type Cycle = Readonly<{
	readonly transition: Transition;
	readonly headPosition: number;
	readonly limit: number;
}>;
