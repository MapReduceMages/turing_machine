<!-- ================================================= SCRIPT -->
<script lang="ts">
  import Icon from "@iconify/svelte";
  import immutableTest from "$lib/logic/immutable_test";
  import Tape from '$lib/components/tape/tape.svelte';
</script>

<!-- ================================================= CONTENT -->
<!-- <h1>static adapter done</h1>
<h1 class="bg-blue-500">test tailwind</h1>
<h1 class="flex">test iconify <Icon icon="mdi-light:home" /></h1>
<button class="btn btn-primary">test daisyUI</button>
<h1>test immutable {immutableTest()}</h1> -->
<p class="max-w-[500px] text-sm text-center italic my-box text-white">
  Simulate the Turing machine!<br />Observe its process of reading,
  writing, and moving, and explore the basic principles of algorithmics and
  computability.
</p>
<Tape />
<textarea name="" id="" class="inset-shadow w-[500px] h-[200px] resize-none" ></textarea>

<!-- ================================================= CSS -->
<style lang="postcss">
</style>
