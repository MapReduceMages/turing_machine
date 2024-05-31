<!-- ================================================= SCRIPT -->
<script lang="ts">
	import Icon from '@iconify/svelte';
	import OutputStore from '$lib/stores/output';

	export let stop: () => void;
	export let pause: () => void;
	export let play: () => void;
	export let back: () => void;
	export let next: () => void;

	export let playing = false;

	const DEFAULT_SPEED = 1;
	const speeds = [DEFAULT_SPEED, 2, 3, 10, 30, 100];
	let speed: number = DEFAULT_SPEED;

	function handleSpeed() {
		speed = speeds[speeds.indexOf(speed) + 1] || DEFAULT_SPEED;
	}
</script>

<!-- ================================================= CONTENT -->
<div id="console">
	<div class="control-container">
		<button class="icon-btn" on:click={back} disabled={$OutputStore === null}
			><Icon class="text-neutral-800" icon="mdi:arrow-left-bold" width={20} /></button
		>
		<button class="icon-btn" on:click={stop} disabled={$OutputStore === null}
			><Icon class="text-neutral-800" icon="material-symbols:stop" width={20} /></button
		>

		{#if playing}
			<button class="icon-btn" on:click={pause} disabled={$OutputStore === null}>
				<Icon class="text-neutral-800" icon="material-symbols:pause" width={20} />
			</button>
		{:else}
			<button class="icon-btn" on:click={play} disabled={$OutputStore === null}>
				<Icon class="text-neutral-800" icon="material-symbols:play-arrow" width={20} />
			</button>
		{/if}
		<button class="icon-btn" on:click={handleSpeed}>
			{#if speed === 0}
				<Icon class="text-neutral-800" icon="mdi:storm" width={20} />
			{:else}
				<p>x{speed}</p>
			{/if}
		</button>
		<button class="icon-btn" on:click={next} disabled={$OutputStore === null}
			><Icon class="text-neutral-800" icon="mdi:arrow-right-bold" width={20} /></button
		>
	</div>
</div>
<p class="mb-box-sm text-[0.8em] text-center">
	To start the simulation, load the <b>input tape</b>, compile the <b>instructions</b>, and click on the <b>start button</b>.
</p>

<!-- ================================================= CSS -->
<style lang="postcss">
	#console {
		@apply my-box flex flex-col items-center justify-center gap-box-sm;
	}

	.control-container {
		@apply flex gap-box;
	}

	button {
		@apply flex w-20 items-center justify-center;
	}

	button.icon-btn {
		@apply w-10;
	}

	ul#cycle-stats {
		@apply my-2 flex flex-col gap-1;
	}

	ul#cycle-stats > li {
		@apply flex justify-center gap-box;
	}

	ul#cycle-stats > li > p {
		@apply w-20 text-xs first:text-right last:text-left;
	}
</style>
