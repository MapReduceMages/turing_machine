<!-- ================================================= SCRIPT -->
<script lang="ts">
  import Tape from '$lib/components/tape/tape.svelte';
  import Input from '$lib/components/instructions/instructions.svelte'
</script>

<!-- ================================================= CONTENT -->
<!-- <h1>static adapter done</h1>
<h1 class="bg-blue-500">test tailwind</h1>
<h1 class="flex">test iconify <Icon icon="mdi-light:home" /></h1>
<button class="btn btn-primary">test daisyUI</button>
<h1>test immutable {immutableTest()}</h1> -->
<!-- <div class="flex flex-col gap-box-sm items-center overflow-hidden"> -->
  <p class="max-w-[500px] text-sm text-center italic my-box">
    Simulate the Turing machine!<br />Observe its process of reading,
    writing, and moving, and explore the basic principles of algorithmics and
    computability.
  </p>
  <Tape />
  <Input />
<!-- </div> -->


<!-- ================================================= CSS -->
<style lang="postcss">
</style>
