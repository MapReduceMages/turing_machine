<!-- ================================================= SCRIPT -->
<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<!-- ================================================= CONTENT -->
<header>
	<h2>Input</h2>
	<button class="!w-fit pr-3" on:click={() => {}}>
		<Icon class="text-neutral-800" icon="mdi:idea" width={16} />
		<p class="ml-1">Suggest</p>
	</button>
</header>
<div class="mb-2 flex w-fit flex-col gap-box-sm md:w-full md:flex-row">
	<input type="text" placeholder="input" />
	<div class="flex w-full justify-center gap-box-sm md:justify-between">
		<button class="!w-fit pr-3" on:click={() => {}}>
			<Icon class="text-neutral-800" icon="mdi:upload" width={18} />
			<p class="ml-1">load</p>
		</button>
		<button class="!w-fit pr-3" on:click={() => {}}>
			<Icon class="text-neutral-800" icon="mdi:reload" width={18} />
			<p class="ml-1">reset</p>
		</button>
	</div>
</div>
<p class="mb-box-sm text-[0.8em]">
	You can only input a string of characters that are in the tape's alphabet from the instructions
	below.
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
