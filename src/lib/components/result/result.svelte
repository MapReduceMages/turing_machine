<!-- ================================================= SCRIPT -->
<script lang="ts">
	const resultSteps = new Array(642).fill(0);
</script>

<!-- ================================================= CONTENT -->
<div id="container-result" class="mt-box flex w-full flex-col items-center">
	<header class="mb-1 flex w-full items-end justify-between">
		<h2 class="">Result</h2>
		<p class="text-xs italic opacity-50">{resultSteps.length} step{resultSteps.length > 0 ? "s" : ""}</p>
	</header>
	<div class="w-full rounded-lg bg-neutral-800 p-2 text-[0.8em] text-neutral-100 md:text-xs">
		<li id="header">
			<p class="italic">step</p>
			<p class="italic">state</p>
			<p class="italic">symbol</p>
			<p class="italic">move</p>
		</li>
		<ul class="scrollbar-dark flex h-[242px] flex-col gap-1">
			{#each resultSteps as resultCycle, index}
				<li>
					<p>{index}</p>
					<p>scanright</p>
					<p>x</p>
					<p>right</p>
				</li>
			{/each}
		</ul>
	</div>
	<p class="mt-1 w-full text-right text-[0.8em] italic opacity-50">
		Click on a step to view its details in the tape debugger
	</p>
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
		@apply grid cursor-pointer grid-cols-4 opacity-70 transition-opacity duration-100 hover:opacity-100;
	}
	li#header {
		@apply pb-1;
	}

	ul > li > p {
		@apply overflow-hidden text-ellipsis text-nowrap;
	}
</style>
