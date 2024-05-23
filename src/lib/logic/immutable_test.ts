// import Immutable from "immutable";
// import {Map as Imap} from 'immutable'
import * as immutable from 'immutable';

function immutableTest(): number[] {
    // example from https://immutable-js.com/
    const map1 = immutable.Map({ a: 1, b: 2, c: 3 });
    const map2 = map1.set('b', 50);
    const test1 = map1.get('b') || -1; // 2
    const test2 = map2.get('b') || -1; // 50

    return [test1, test2]
}

export default immutableTest