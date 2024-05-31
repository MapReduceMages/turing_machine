import { writable } from 'svelte/store';

function generateDefaultStore(): string {
	return "";
}

function createInputStore() {
	return writable(generateDefaultStore());
}

const inputStore = createInputStore();

export default inputStore;
