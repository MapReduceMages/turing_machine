<!-- ================================================= SCRIPT -->
<script lang="ts">
	import Icon from '@iconify/svelte';
	import OutputStore from '$lib/stores/output';
	import TapeStore from '$lib/stores/tape';
	import StepStore from '$lib/stores/step';
	import InstructionSetStore from '$lib/stores/instruction_set';
	import Config from '../../../config.json';
	import SpeedStore from '$lib/stores/speed';
	import { onMount } from 'svelte';

	async function sleep(ms: number) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}

	const pause = () => {
		playing = false;
	};

	const beginning = async () => {
		pause();
		while ($StepStore > 0) {
			previous();
		}
	};

	let playing: boolean = false;

	const play = async () => {
		if (playing) {
			return;
		}

		playing = true;

		const lastStepIndex = $OutputStore!.states.count();
		while ($StepStore < lastStepIndex) {
			if (!playing) {
				return;
			}
			next();
			await sleep(Config.playDefaultSpeed / $SpeedStore);
		}
		playing = false;
	};
	const previous = () => {
		const currentStepIndex = $StepStore;
		if (currentStepIndex > 0) {
			$StepStore--;
			const previousStepIndex = $StepStore;
			TapeStore.previous(
				$OutputStore!.states.get(previousStepIndex)!,
				$InstructionSetStore!.blank,
				previousStepIndex === 0,
			);
		}
	};
	const next = () => {
		const currentStepIndex = $StepStore;
		if (currentStepIndex < $OutputStore!.states.count()) {
			TapeStore.next(
				$OutputStore!.states.get(currentStepIndex)!,
				$InstructionSetStore!.blank,
				currentStepIndex === 0,
			);
			$StepStore++;
		}
	};

	onMount(() => {
		return () => {
			playing = false;
		};
	});
</script>

<!-- ================================================= CONTENT -->
<div id="console">
	<div class="control-container">
		<button
			class="icon-btn"
			on:click={previous}
			disabled={$OutputStore === null || $StepStore === 0}
			><Icon class="text-neutral-800" icon="mdi:arrow-left-bold" width={20} /></button
		>
		<button class="icon-btn" on:click={beginning} disabled={$OutputStore === null}
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
		<button class="icon-btn" on:click={SpeedStore.switch}>
			{#if $SpeedStore === 0}
				<Icon class="text-neutral-800" icon="mdi:storm" width={20} />
			{:else}
				<p>x{$SpeedStore}</p>
			{/if}
		</button>
		<button
			class="icon-btn"
			on:click={next}
			disabled={$OutputStore === null || $StepStore === $OutputStore.states.count()}
			><Icon class="text-neutral-800" icon="mdi:arrow-right-bold" width={20} /></button
		>
	</div>
</div>
<p class="mb-box-sm text-center text-[0.8em]">
	To start the simulation, load the <b>input tape</b>, compile the <b>instructions</b>, and click on
	the <b>start button</b>.
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
