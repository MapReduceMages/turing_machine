<!-- ================================================= SCRIPT -->
<script lang="ts">
	import Console from './console.svelte';
	import TapeStore from '$lib/stores/tape';

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
<div class="w-full rounded-b-lg bg-neutral-800 p-2 text-[0.8em] text-neutral-100 md:text-xs">
	<ul class="flex flex-col gap-1">
		<li class="grid grid-cols-5 opacity-65">
			<p class="invisible">nothing</p>
			<p class="italic">step</p>
			<p class="italic">state</p>
			<p class="italic">symbol</p>
			<p class="italic">move</p>
		</li>
		<li class="grid grid-cols-5 opacity-65">
			<p class="italic">before</p>
			<p>{0}</p>
			<p>scanright</p>
			<p>x</p>
			<p>right</p>
		</li>
		<li class="grid grid-cols-5">
			<p class=" italic">current</p>
			<p>{1}</p>
			<p>scanright</p>
			<p>y</p>
			<p>left</p>
		</li>
		<li class="grid grid-cols-5 opacity-65">
			<p class="italic">after</p>
			<p>{2}</p>
			<p>scanright</p>
			<p>z</p>
			<p>right</p>
		</li>
	</ul>
</div>
<div class="overflow-hidden">
	<Console
		back={() => {}}
		next={() => {}}
		pause={() => {}}
		play={() => {}}
		stop={() => {}}
		playing={false}
	/>
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
