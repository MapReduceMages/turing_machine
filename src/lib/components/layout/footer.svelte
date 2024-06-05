<!-- ================================================= SCRIPT -->
<script lang="ts">
	import Icon from '@iconify/svelte';

	const randomOrder = (): boolean => Math.random() > 0.5;
	const first = randomOrder() ? 'selfsigned' : 'trixky';
	const second = first === 'selfsigned' ? 'trixky' : 'selfsigned';
</script>

<!-- ================================================= CONTENT -->
<footer class="my-box-lg flex flex-col items-center gap-box">
	<div>
		<p class="text-base text-neutral-900">
			By <a href="https://github.com/{first}" target="_blank" class="text-primary-500">{first}</a>
			and
			<a href="https://github.com/{second}" target="_blank" class="text-primary-500">{second}</a>
		</p>
	</div>
	<div class="flex h-10 min-w-1 items-center gap-box">
		<a href="https://github.com/MapReduceMages/turing_machine" target="_blank">
			<Icon
				class="cursor-pointer text-neutral-900 opacity-50 transition-opacity duration-200 hover:opacity-100"
				icon="mdi:github"
				width={36}
			/>
		</a>
		<a href="https://www.youtube.com/watch?v=dNRDvLACg5Q" target="_blank">
			<Icon
				class="cursor-pointer text-neutral-900 opacity-50 transition-opacity duration-200 hover:opacity-100"
				icon="mdi:youtube"
				width={36}
			/>
		</a>
		<a href="https://en.wikipedia.org/wiki/Turing_machine" target="_blank">
			<Icon
				class="cursor-pointer text-neutral-900 opacity-50 transition-opacity duration-200 hover:opacity-100"
				icon="bi:wikipedia"
				width={34}
			/>
		</a>
	</div>
</footer>

<!-- ================================================= CSS -->
<style lang="postcss">
</style>
