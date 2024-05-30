<!-- ================================================= SCRIPT -->
<script lang="ts">
	import Icon from '@iconify/svelte';
</script>

<!-- ================================================= CONTENT -->
<div class="mb-box flex w-fit flex-col gap-box-sm md:w-full md:flex-row">
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

<!-- ================================================= CSS -->
<style lang="postcss">
	button {
		@apply flex w-20 items-center justify-center;
	}
</style>
