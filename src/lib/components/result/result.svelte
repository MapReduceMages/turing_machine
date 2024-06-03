<!-- ================================================= SCRIPT -->
<script lang="ts">
	import OutputStore from '$lib/stores/output';
</script>

<!-- ================================================= CONTENT -->
<div id="container-result" class="mt-box flex w-full flex-col items-center">
	<header class="mb-2 flex w-full items-end justify-between">
		<h2 class="">Result</h2>
		{#if $OutputStore !== null}
			<p class="text-xs italic opacity-50">
				{$OutputStore.states.count() - 1} step{$OutputStore.states.count() > 1 ? 's' : ''}
			</p>
		{/if}
	</header>
	<div class="w-full rounded-lg bg-neutral-800 p-2 text-[0.8em] text-neutral-100 md:text-sm">
		<li id="header">
			<p class="italic">step</p>
			<p class="italic">state</p>
			<p class="italic">read</p>
			<p class="italic">write</p>
			<p class="italic">move</p>
		</li>
		<ul class="scrollbar-dark flex h-[242px] flex-col gap-1 overflow-y-scroll">
			{#if $OutputStore !== null}
				{#each $OutputStore.states as state, index}
					{@const read = index > 0 ? state.transition.read : ''}
					{@const write = index > 0 ? state.transition.write : ''}
					<li>
						<p>{index}</p>
						<p>{state.transition.to_state}</p>
						<p>{read}</p>
						<p>{read !== write ? write : ''}</p>
						<p>{index > 0 ? state.transition.action.toLowerCase() : ''}</p>
					</li>
				{/each}
			{:else}
				<div class="flex h-full w-full items-center justify-center opacity-30">no output</div>
			{/if}
		</ul>
	</div>
	<!-- <p class="mt-1 w-full text-right text-[0.8em] italic opacity-50">
		Click on a step to view its details in the tape debugger
	</p> -->
</div>

<!-- ================================================= CSS -->
<style lang="postcss">
	li#header {
		@apply pr-2;
	}
	ul {
		/* @apply pr-5; */
		@apply overflow-y-scroll;
		overflow-y: scroll;
		scrollbar-gutter: stable;
	}
	ul > li,
	li#header {
		@apply grid cursor-pointer grid-cols-5 opacity-70 transition-opacity duration-100 hover:opacity-100;
	}
	li#header {
		@apply pb-1;
	}

	ul > li > p {
		@apply overflow-hidden text-ellipsis text-nowrap;
	}
</style>
