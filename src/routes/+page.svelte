<!-- ================================================= SCRIPT -->
<script lang="ts">
  import Input from "$lib/components/input/input.svelte";
  import Tape from "$lib/components/tape/tape.svelte";
  import Instructions from "$lib/components/instructions/instructions.svelte";
  import Result from "$lib/components/result/result.svelte";
</script>

<!-- ================================================= CONTENT -->

<p class="max-w-[500px] text-sm text-center italic my-box">
  Simulate the Turing machine!<br />Observe its process of reading, writing, and
  moving, and explore the basic principles of algorithmics and computability.
</p>
<Input />
<Tape />
<Instructions />
<Result />

<!-- ================================================= CSS -->
<style lang="postcss">
</style>
