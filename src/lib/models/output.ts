import type { Tape } from "./tape";
import type { Cycle } from "./cycle";

export type Output = Readonly<{
	readonly tape: Tape;
	readonly states: Immutable.List<Cycle>;
	readonly error?: Error;
}>;