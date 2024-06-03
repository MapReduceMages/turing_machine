<!-- ================================================= SCRIPT -->
<script lang="ts">
	import Icon from '@iconify/svelte';
	import OutputStore from '$lib/stores/output';
	import Config from '../../../../src/config.json';
	import TapeStore from '$lib/stores/tape';
	import InstructionSetStore from '$lib/stores/instruction_set';
	import MaxSetStore from '$lib/stores/max';
	import { run } from '$lib/logic/machine';
	import StepStore from '$lib/stores/step';

	let localInput = '';

	function handleLoad() {
		if ($InstructionSetStore !== null) {
			TapeStore.load(localInput, $InstructionSetStore!.blank);
			OutputStore.set(run($InstructionSetStore, $TapeStore.cells, $TapeStore.head, $MaxSetStore));
		}
	}

	function handleReset() {
		OutputStore.reset();
		TapeStore.reset();
		StepStore.reset();
	}

	function handleSuggest() {
		if ($InstructionSetStore !== null && $InstructionSetStore.inputSuggestion !== undefined) {
			localInput = $InstructionSetStore.inputSuggestion;
		}
	}

	let inputRespectAlphabet = false;
	$: inputRespectAlphabet =
		$InstructionSetStore !== null &&
		localInput.split('').every((char) => $InstructionSetStore.alphabet.includes(char));
</script>

<!-- ================================================= CONTENT -->
<header>
	<h2>Input</h2>
	<button
		class="!w-fit pr-3"
		on:click={handleSuggest}
		disabled={$OutputStore !== null ||
			$InstructionSetStore === null ||
			$InstructionSetStore.inputSuggestion === undefined}
	>
		<Icon class="text-neutral-800" icon="mdi:idea" width={16} />
		<p class="ml-1">suggest</p>
	</button>
</header>
<div class="mb-2 flex w-fit flex-col gap-box-sm md:w-full md:flex-row">
	<input
		type="text"
		spellcheck="false"
		placeholder="input tape"
		maxlength={Config.inputMaxLength}
		bind:value={localInput}
		disabled={$OutputStore !== null || $InstructionSetStore === null}
	/>
	<div class="flex w-full justify-center gap-box-sm md:justify-between">
		<button
			class="!w-fit pr-3"
			on:click={handleLoad}
			disabled={$OutputStore !== null || localInput.length === 0 || !inputRespectAlphabet}
		>
			<Icon class="text-neutral-800" icon="mdi:upload" width={18} />
			<p class="ml-1">load</p>
		</button>
		<button class="!w-fit pr-3" on:click={handleReset} disabled={$OutputStore === null}>
			<Icon class="text-neutral-800" icon="mdi:reload" width={18} />
			<p class="ml-1">reset</p>
		</button>
	</div>
</div>
<p class="mb-box-sm text-center text-[0.8em] md:text-left">
	Compile the instructions below before loading the tape.
	<br class="hidden md:block" />
	You can only load characters that are in the tape's alphabet from the instructions below.
</p>

<!-- ================================================= CSS -->
<style lang="postcss">
	button {
		@apply flex w-20 items-center justify-center;
	}

	header {
		@apply mb-box-sm flex w-full flex-wrap items-center justify-between gap-box;
	}
</style>
