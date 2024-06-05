<!-- ================================================= SCRIPT -->
<script lang="ts">
	import PresetSelector from './preset_selector.svelte';
	import parseJson, { JSONError } from 'parse-json';
	import Compilator from './compilator.svelte';
	import Helper from './helper.svelte';
	import { browser } from '$app/environment';
	import Cookies from 'js-cookie';
	import { onMount, tick } from 'svelte';
	import {
		InstructionSetSchema,
		checkInstructionSet,
		type InstructionSet,
	} from '../../models/instruction_set';
	import Config from '../../../../src/config.json';
	import Icon from '@iconify/svelte';
	import stringify from 'json-stringify-pretty-compact';
	import MaxStore from '$lib/stores/max';
	import OutputStore from '$lib/stores/output';
	import InstructionSetStore from '$lib/stores/instruction_set';

	let instructions = '';
	let errorMessage: string | null = null;

	let cursorPosition = 0;
	let cursorLine: number | null = null;
	let cursorColumn: number | null = null;

	let textAreaElement: HTMLTextAreaElement | null = null;
	let textAreaElementIsFocused = false;
	let handlePresetBack: (preset?: string) => void;
	let lastPreset: string | null = null;
	let lastPresetInstructions: string | null = null;

	let importFiles: null | FileList = null;
	let importFileInputElement: HTMLInputElement | null = null;

	$: if (importFiles !== null) {
		// Note that `importFiles` is of type `FileList`, not an Array:
		// https://developer.mozilla.org/en-US/docs/Web/API/FileList
		for (const file of importFiles) {
			(file as File).text().then((text) => {
				instructions = text.trim();
				compileInstructions({ target: { value: instructions } }, true);
			});
		}
	}

	function handleImport() {
		if (importFileInputElement !== null) {
			importFileInputElement.click();
		}
	}

	function handleExport() {
		if ($InstructionSetStore !== null) {
			const blob = new Blob([stringify($InstructionSetStore)], {
				type: 'application/json',
			});
			const url = URL.createObjectURL(blob);
			const a = document.createElement('a');
			a.href = url;
			// add timestamp
			a.download = `instructions-${Date.now()}.json`;
			a.click();
			URL.revokeObjectURL(url);
		}
	}

	function cleanJSONError(error: JSONError): string {
		const message = error.message;
		const firstNewLine = message.indexOf('\n');
		const cleanedMessage = message.slice(0, firstNewLine);

		return cleanedMessage;
	}

	const TEXTAREA_ID = 'text-field';

	async function handleTabulation(e?: any) {
		const tabulationIndent = Config.tabulation;
		if (e !== undefined && e.key === 'Tab' && textAreaElement !== null && cursorColumn !== null) {
			e.preventDefault();
			const initialCursorPosition = textAreaElement.selectionStart;
			const spacing = tabulationIndent - (cursorColumn % tabulationIndent);
			instructions =
				instructions.slice(0, initialCursorPosition) +
				' '.repeat(spacing) +
				instructions.slice(textAreaElement.selectionEnd);
			lastPresetInstructions = instructions;
			await tick();
			const newCursorPosition = initialCursorPosition + spacing;
			textAreaElement.setSelectionRange(newCursorPosition, newCursorPosition);
		}

		getCursorPosition();
	}

	function getCursorPosition() {
		if (textAreaElement === null) return;
		if (textAreaElementIsFocused === false) {
			cursorLine = null;
			cursorColumn = null;
			return;
		}

		cursorPosition = textAreaElement.selectionStart;

		const INDEX_START = 1;

		let line = INDEX_START;
		let column = INDEX_START;
		let currentIndex = 0;

		for (let i = 0; i < instructions.length; i++) {
			if (currentIndex === cursorPosition) {
				cursorLine = line;
				cursorColumn = column;
				return;
			}
			if (instructions[i] === '\n') {
				line++;
				column = INDEX_START;
			} else {
				column++;
			}
			currentIndex++;
		}

		if (currentIndex === cursorPosition) {
			cursorLine = line;
			cursorColumn = column;
			return;
		}

		// Index out of bounds
		textAreaElement.setSelectionRange(0, 0);
		cursorLine = 1;
		cursorColumn = 1;
	}

	let first = true;
	function compileInstructions(e?: any, force: boolean = false) {
		if ($OutputStore !== null) return;
		const newInstructions = e?.target?.value ?? instructions;
		if (newInstructions === instructions && !force) return;
		instructions = newInstructions;
		if (lastPreset !== null && lastPresetInstructions === instructions) {
			handlePresetBack(lastPreset);
		} else if (!first) {
			handlePresetBack();
		} else {
			first = false;
		}

		Cookies.set('instructions', instructions);
		getCursorPosition();

		errorMessage = null;

		try {
			parseJson(instructions);
		} catch (error) {
			if (error instanceof JSONError) {
				errorMessage = cleanJSONError(error);
				$InstructionSetStore = null;
			} else {
				errorMessage = 'Unknown error during the parsing of the JSON';
			}
			return;
		}

		let parsedInstructions: Object | null = null;

		try {
			parsedInstructions = JSON.parse(instructions);
		} catch (error) {
			errorMessage = (error as JSONError).message;
			$InstructionSetStore = null;
			return;
		}

		if (parsedInstructions === null) {
			errorMessage = 'Parsed instructions are null';
			$InstructionSetStore = null;
			return;
		}

		const validation = InstructionSetSchema.validate(parsedInstructions);

		if (validation.error) {
			errorMessage = validation.error.message;
			$InstructionSetStore = null;
			return;
		}

		const instructionSetCheck = checkInstructionSet(validation.value);
		if (instructionSetCheck !== null) {
			errorMessage = instructionSetCheck.message;
			$InstructionSetStore = null;
			return;
		}

		$InstructionSetStore = parsedInstructions as InstructionSet;
	}

	function handlePreset(preset: string, value: string) {
		instructions = value;
		lastPreset = preset;
		lastPresetInstructions = value;
		compileInstructions({ target: { value: instructions } }, true);
		getCursorPosition();
	}

	function handleClear() {
		instructions = '';
		$InstructionSetStore = null;
		errorMessage = null;
		lastPreset = null;
		lastPresetInstructions = null;
		handlePresetBack();
		getCursorPosition();
		Cookies.set('instructions', '');
		Cookies.set('preset', Config.customPreset);
	}

	onMount(() => {
		if (browser) {
			const savedInstructions = Cookies.get('instructions');
			if (savedInstructions) {
				instructions = savedInstructions;
			}
			const savedPreset = Cookies.get('preset');
			if (savedPreset) {
				lastPreset = savedPreset;
				handlePresetBack(savedPreset);
			}
			compileInstructions(undefined, true);
		}
	});
</script>

<!-- ================================================= CONTENT -->
<div id="instructions-container" class="mt-box flex w-full flex-col items-center overflow-hidden">
	<header>
		<h2 class="-mb-2">Instructions</h2>
		<PresetSelector {handlePreset} bind:handlePresetBack />
	</header>
	<div
		class="flex w-full items-center justify-between rounded-t-lg border-x border-t border-solid bg-neutral-200 px-2 py-1 text-[0.9em] md:text-xs"
	>
		<p class=" italic opacity-40">JSON format</p>
		<p
			class="ml-auto mr-2 flex items-center italic transition-opacity duration-200"
			style="opacity: {$OutputStore !== null ? 0.7 : 0}"
		>
			<Icon class="text-red-500" icon="ri:lock-fill" width={12} />
			<span class="ml-1 mr-5 text-red-500">read-only</span>
		</p>
		<p class="flex items-center text-right">
			Line {cursorLine === null ? '?' : cursorLine}, Column {cursorColumn === null
				? '?'
				: cursorColumn}
		</p>
	</div>
	<textarea
		id={TEXTAREA_ID}
		bind:this={textAreaElement}
		spellcheck="false"
		readonly={$OutputStore !== null}
		class="inset-shadow scrollbar-light h-[200px] w-full resize-none overflow-scroll !rounded-none !border-y-0"
		on:input={compileInstructions}
		on:keypress={() => {
			getCursorPosition();
		}}
		on:keydown={(e) => {
			handleTabulation(e);
			getCursorPosition();
		}}
		on:keyup={() => {
			getCursorPosition();
		}}
		on:click={() => {
			getCursorPosition();
		}}
		on:focus={() => {
			textAreaElementIsFocused = true;
		}}
		on:blur={() => {
			textAreaElementIsFocused = false;
		}}>{instructions}</textarea
	>
	<Compilator
		error={errorMessage}
		empty={instructions.length === 0}
		compiledInstructions={$InstructionSetStore}
	/>
</div>
<div
	class="mb-box mt-box-sm flex w-full flex-col flex-wrap items-center justify-between gap-box-sm pt-[2px] md:flex-row md:gap-0"
>
	<div class="flex items-center gap-box-sm">
		<button class="!w-fit pr-3" on:click={handleClear} disabled={$OutputStore !== null}>
			<Icon class="text-neutral-800" icon="ph:eraser" width={18} />
			<p class="ml-2">clean</p>
		</button>
		<div class="flex items-center gap-box-sm">
			<input
				disabled={$OutputStore !== null}
				class="md:mr-auto"
				min={Config.steps.min}
				max={Config.steps.max}
				bind:value={$MaxStore}
				type="number"
				step={Config.steps.step}
			/>
			<p class="text-[0.9em] italic opacity-50">Max step(s)</p>
		</div>
	</div>
	<div class="flex items-center gap-box-sm">
		<button class="!w-fit pr-3" on:click={handleImport} disabled={$OutputStore !== null}>
			<Icon class="text-neutral-800" icon="uil:export" width={16} />
			<p class="ml-2">import</p>
		</button>
		<input
			bind:this={importFileInputElement}
			bind:files={importFiles}
			type="file"
			accept=".json"
			class="hidden"
		/>
		<button class="!w-fit pr-3" on:click={handleExport} disabled={$InstructionSetStore === null}>
			<Icon class="text-neutral-800" icon="uil:import" width={16} />
			<p class="ml-2">export</p>
		</button>
	</div>
</div>
<Helper />

<!-- ================================================= CSS -->
<style lang="postcss">
	header {
		@apply mb-box-sm flex w-full flex-wrap items-center justify-between gap-box;
	}

	button {
		@apply flex w-20 items-center justify-center;
	}

	textarea {
		white-space: pre;
	}
</style>
