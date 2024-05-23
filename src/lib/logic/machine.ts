import * as immutable from 'immutable';

export default function test_machine() {
    const TAPE_INITIAL_SIZE = 20;
    const blank_character = '.';

    const tapeCells = immutable.List<number>(Array(TAPE_INITIAL_SIZE).fill(blank_character));
    console.log(tapeCells.values());
    tapeCells.concat(immutable.List<number>(Array(10).fill(0)));
    console.log(tapeCells.values());
}