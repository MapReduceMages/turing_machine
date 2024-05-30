<!-- ================================================= SCRIPT -->
<script lang="ts">
	import Input from '$lib/components/input/input.svelte';
	import Tape from '$lib/components/tape/tape.svelte';
	import Instructions from '$lib/components/instructions/instructions.svelte';
	import Result from '$lib/components/result/result.svelte';
	import About from '$lib/components/about/about.svelte';
</script>

<!-- ================================================= CONTENT -->

<p class="my-box max-w-[500px] text-center text-sm italic">
	Simulate the Turing machine!<br />Observe its process of reading, writing, and moving, and explore
	the basic principles of algorithmics and computability.
</p>
<Input />
<Tape />
<Instructions />
<Result />
<About />

<!-- ================================================= CSS -->
<style lang="postcss">
</style>
