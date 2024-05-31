export type Direction = Readonly<'LEFT' | 'RIGHT'>;

export type Transition = Readonly<{
	readonly read: string;
	readonly write: string;
	readonly to_state: string;
	readonly action: Direction;
}>;

export type Transitions = Immutable.Map<string, Transition[]>;
