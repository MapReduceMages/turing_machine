<!-- ================================================= SCRIPT -->
<script lang="ts">
	import Console from './console.svelte';
	import TapeStore from '$lib/stores/tape';
	import OutputStore from '$lib/stores/output';
	import StepStore from '$lib/stores/step';

	const BORDER_SHIFT = 1;
	const HEAD_WIDTH = 3;
	const cellSize = 42; // px
	const tapeContainerCellNumber = 11;
	const tapeContainerWidth = tapeContainerCellNumber * cellSize; // px

	let tapeWidth: number | undefined = undefined;
</script>

<!-- ================================================= CONTENT -->
<h2 class="mb-2 w-full">Tape</h2>
<div id="tape" class="flex w-full flex-col items-center gap-box-sm">
	<div
		id="tape-visu"
		class="inset-shadow flex w-full items-center !rounded-b-none !border-b-0"
		bind:clientWidth={tapeWidth}
	>
		<div
			id="head"
			class="absolute top-0 z-30 h-8 bg-red-400"
			style="right: calc(50% - {HEAD_WIDTH / 2 - BORDER_SHIFT / 2}px); width: 3px;"
		></div>
		<ul
			id="tape"
			class="flex rounded-lg border border-solid border-black transition-transform duration-200"
			style="margin: {cellSize / 2}px  0; transform: translateX({tapeWidth / 2 -
				cellSize * 1.5 -
				($TapeStore.head - 1) * cellSize -
				BORDER_SHIFT / 2}px)"
		>
			{#each $TapeStore.cells as cell, index}
				<li
					style="min-width: {cellSize}px; height: {cellSize}px;"
					class="relative flex items-center justify-center border-r border-solid border-black text-sm first:rounded-l-lg first:border-l-0 last:rounded-r-lg last:border-r-0"
				>
					{cell}
					<p class="absolute -bottom-[22px] left-0 w-full text-center text-[0.7em] opacity-60">
						{index - $TapeStore.center}
					</p>
				</li>
			{/each}
		</ul>
	</div>
</div>
<div class="w-full rounded-b-lg bg-neutral-800 p-2 text-[0.8em] text-neutral-100 md:text-sm">
	<ul class="flex flex-col gap-1">
		<li class="grid grid-cols-5 opacity-65">
			<p class="italic">step</p>
			<p class="italic">state</p>
			<p class="italic">read</p>
			<p class="italic">write</p>
			<p class="italic">move</p>
		</li>
		{#if $OutputStore !== null}
			<li class="grid grid-cols-5 opacity-65">
				<p style="visibility: {$StepStore === 0 ? 'hidden' : 'visible'};">
					{$StepStore - 1} <span class="opacity-50">(-1)</span>
				</p>
				{#if $StepStore > 0}
					<p>{$OutputStore?.states.get($StepStore - 1)?.transition.to_state}</p>
					{#if $StepStore > 1}
						<p>{$OutputStore?.states.get($StepStore - 1)?.transition.read}</p>
						<p>
							{$OutputStore?.states.get($StepStore - 1)?.transition.read ===
							$OutputStore?.states.get($StepStore - 1)?.transition.write
								? ''
								: $OutputStore?.states.get($StepStore - 1)?.transition.write}
						</p>
						<p>{$OutputStore?.states.get($StepStore - 1)?.transition.action.toLowerCase()}</p>
					{/if}
				{/if}
			</li>
			<li class="grid grid-cols-5">
				<p>{$StepStore}</p>
				<p>
					{$StepStore < $OutputStore.states.count()
						? $OutputStore?.states.get($StepStore)?.transition.to_state
						: $OutputStore?.states.get($StepStore - 1)?.transition.to_state}
				</p>
				{#if $StepStore > 0 && $StepStore < $OutputStore.states.count()}
					<p>{$OutputStore?.states.get($StepStore)?.transition.read}</p>
					<p>
						{$OutputStore?.states.get($StepStore)?.transition.read ===
						$OutputStore?.states.get($StepStore)?.transition.write
							? ''
							: $OutputStore?.states.get($StepStore)?.transition.write}
					</p>
					<p>{$OutputStore?.states.get($StepStore)?.transition.action.toLowerCase()}</p>
				{/if}
			</li>
			<li class="grid grid-cols-5 opacity-65">
				<p
					style="visibility: {$StepStore === $OutputStore?.states.count() ? 'hidden' : 'visible'};"
				>
					{$StepStore + 1} <span class="opacity-50">(+1)</span>
				</p>
				{#if $StepStore < $OutputStore.states.count()}
					<p>
						{$StepStore < $OutputStore.states.count() - 1
							? $OutputStore?.states.get($StepStore + 1)?.transition.to_state
							: $OutputStore?.states.get($StepStore)?.transition.to_state}
					</p>
					{#if $StepStore < $OutputStore.states.count() - 1}
						<p>{$OutputStore?.states.get($StepStore + 1)?.transition.read}</p>
						<p>
							{$OutputStore?.states.get($StepStore + 1)?.transition.read ===
							$OutputStore?.states.get($StepStore + 1)?.transition.write
								? ''
								: $OutputStore?.states.get($StepStore + 1)?.transition.write}
						</p>
						<p>{$OutputStore?.states.get($StepStore + 1)?.transition.action.toLowerCase()}</p>
					{/if}
				{/if}
			</li>
		{:else}
			<p class="invisible">...</p>
			<div class="flex h-full w-full items-center justify-center opacity-30">no output</div>
			<p class="invisible">...</p>
		{/if}
	</ul>
</div>
<div class="overflow-hidden">
	<Console />
</div>

<!-- ================================================= CSS -->
<style lang="postcss">
	#tape-visu {
		background-color: white;
	}

	#tape ul > li {
		background-color: beige;
	}

	#debug-tape > p {
		@apply overflow-hidden text-ellipsis;
	}
</style>
