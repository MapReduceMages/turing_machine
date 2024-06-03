import { writable } from 'svelte/store';
import Config from '../../config.json';

function generateDefaultStore(): number {
	return Config.steps.default;
}

function createMaxSetStore() {
	return writable(generateDefaultStore());
}

const MaxSetStore = createMaxSetStore();

export default MaxSetStore;
