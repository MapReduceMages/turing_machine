<!-- ================================================= SCRIPT -->
<script lang="ts">
	import Input from '$lib/components/input/input.svelte';
	import Tape from '$lib/components/tape/tape.svelte';
	import Instructions from '$lib/components/instructions/instructions.svelte';
	import Result from '$lib/components/result/result.svelte';
	import About from '$lib/components/about/about.svelte';
</script>

<!-- ================================================= CONTENT -->

<nav>
	<ul class="flex flex-col md:flex-row justify-center items-center gap-1 md:gap-box-lg text-lg">
		<li>
			<a href="#tape-section">tape</a>
		</li>
		<li>
			<a href="#input-section">input</a>
		</li>
		<li>
			<a href="#instructions-container">instructions</a>
		</li>
		<li>
			<a href="#container-result">results</a>
		</li>
		<li>
			<a href="#about-section">about</a>
		</li>
	</ul>
</nav>
<p class="mt-box mb-box-sm max-w-[500px] text-center text-sm italic">
	Simulate the Turing machine!<br />Observe its process of reading, writing, and moving, and explore
	the basic principles of algorithmics and computability.
</p>
<Tape />
<Input />
<Instructions />
<Result />
<About />

<!-- ================================================= CSS -->
<style lang="postcss">
</style>
