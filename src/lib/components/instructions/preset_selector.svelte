<!-- ================================================= SCRIPT -->
<script lang="ts">
	import stringify from 'json-stringify-pretty-compact';
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import Config from '../../../../src/config.json';
	import OutputStore from '$lib/stores/output';
	import type { InstructionSet } from '$lib/models/instruction_set';
	// ------------------------- presets
	import presetUnaryAdd from '../../data/presets/unary_add.json';
	import presetUnarySub from '../../data/presets/unary_sub.json';
	import presetPalindrome from '../../data/presets/palindrome.json';
	import preset0n1n from '../../data/presets/0n1n.json';
	import preset02n from '../../data/presets/02n.json';

	let selectElement: HTMLSelectElement | null = null;

	export let handlePreset: (preset: string, value: string) => void;
	export const handlePresetBack = (preset?: string) => {
		const newPreset = preset ?? Config.customPreset;
		if (selectElement !== null) selectElement.value = newPreset;
		Cookies.set('preset', newPreset);
	};

	const presetTable: ReadonlyMap<string, InstructionSet> = new Map([
		['unary_add', presetUnaryAdd as InstructionSet],
		['unary_sub', presetUnarySub as InstructionSet],
		['palindrome', presetPalindrome as InstructionSet],
		['0n1n', preset0n1n as InstructionSet],
		['02n', preset02n as InstructionSet],
	]);

	function handleSelect(event: Event) {
		const target = event.target as HTMLSelectElement;
		const value = target.value;
		Cookies.set('preset', value);

		if (value !== Config.customPreset) {
			const preset = presetTable.get(value);
			if (preset !== undefined) {
				handlePreset(value, stringify(preset, { indent: Config.tabulation }));
			}
		}
	}

	onMount(() => {
		if (browser) {
			const savedPreset = Cookies.get('preset');
			if (savedPreset && selectElement !== null) {
				selectElement.value = savedPreset;
			}
		}
	});
</script>

<!-- ================================================= CONTENT -->
<select
	name=""
	id="preset-selector"
	class="text-xs"
	on:change={handleSelect}
	bind:this={selectElement}
	disabled={$OutputStore !== null}
>
	<option value={Config.customPreset} disabled>{Config.customPreset}</option>
	<option value="unary_add">unary add</option>
	<option value="unary_sub">unary sub</option>
	<option value="palindrome">palindrome</option>
	<option value="0n1n">0n1n</option>
	<option value="02n">02n</option>
</select>

<!-- ================================================= CSS -->
<style lang="postcss">
</style>
