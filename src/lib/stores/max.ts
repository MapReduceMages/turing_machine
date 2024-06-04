import { writable } from 'svelte/store';
import Config from '../../config.json';

function generateDefaultStore(): number {
	return Config.steps.default;
}

function createMaxStore() {
	return writable(generateDefaultStore());
}

const MaxStore = createMaxStore();

export default MaxStore;
