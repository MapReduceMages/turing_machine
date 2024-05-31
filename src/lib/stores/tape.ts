import { writable } from 'svelte/store';
import Config from '../../config.json';

const DEFAULT_HALF_LENGTH = Config.inputMaxLength * 2;

interface Tape {
    cells: Array<string>;
    head: number;
    center: number;
}

function generateNewTape(input: string | null, blank: string | null): Tape {
    if (input !== null && input.length > DEFAULT_HALF_LENGTH) {
        throw new Error(`Input is too long (max ${DEFAULT_HALF_LENGTH} characters)`);
    }

    const rightHalftape = Array(DEFAULT_HALF_LENGTH + 1).fill(blank ?? "");
    const leftHalftape = Array(DEFAULT_HALF_LENGTH).fill(blank ?? "");

    if (input !== null) {
        const inputArray = input.split('');
        for (let i = 0; i < inputArray.length; i++) {
            rightHalftape[i] = inputArray[i];
        }
    }

    return <Tape>{
        cells: leftHalftape.concat(rightHalftape),
        head: DEFAULT_HALF_LENGTH,
        center: DEFAULT_HALF_LENGTH
    };
}

function generateDefaultStore(): Tape {
    return generateNewTape(null, null);
}

function createTapeStore() {
    const { subscribe, set, update } = writable(generateDefaultStore());

    return {
        subscribe,
        load: (input: string, blank: string | null) => {
            set(generateNewTape(input, blank));
        },
        loadBlank: (blank: string) => {
            update((tape) => {
                tape.cells = tape.cells.map((cell) => cell.length === 0 ? blank : cell);
                return tape;
            })
        },
        left: () => {
            update((tape) => {
                if (tape.head > 0) {
                    tape.head--;
                } else {
                    tape.cells.unshift('');
                    tape.center++;
                }
                return tape;
            });
        },
        right: () => {
            update((tape) => {
                if (tape.head < tape.cells.length - 1) {
                    tape.head++;
                } else {
                    tape.cells.push('');
                }
                return tape;
            });
        },
        write: (symbol: string) => {
            update((tape) => {
                tape.cells[tape.head] = symbol;
                return tape;
            });
        },
        reset: () => {
            set(generateDefaultStore());
        },
    };
}

const TapeStore = createTapeStore();

export default TapeStore;
