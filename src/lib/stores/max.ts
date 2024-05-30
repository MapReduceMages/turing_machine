import { writable } from 'svelte/store';
import Config from '../../config.json';

function generateDefaultStore(): number | null {
	return Config.steps.default;
}

function createMaxSetStore() {
	return writable(generateDefaultStore());
}

const maxSetStore = createMaxSetStore();

export default maxSetStore;
