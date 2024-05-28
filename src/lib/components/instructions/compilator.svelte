<!-- ================================================= SCRIPT -->
<script lang="ts">
  import type { InstructionSet } from "$lib/models/instruction_set";

  export let error: string | null = null;
  export let empty: boolean = false;
  export let compiledInstructions: InstructionSet | null;
</script>

<!-- ================================================= CONTENT -->
<div id="compilator">
  <p class="">
    compilation
    {#if empty}
      <span class="text-blue-300">skipped</span>
    {:else if error !== null}
      <span class="text-red-300">error</span>
    {:else}
      <span class="text-green-300">success </span>
    {/if}
    :
    {#if empty}
      no instructions
    {:else if error !== null}
      {@html error}
    {:else if compiledInstructions !== null}
      {compiledInstructions.alphabet.length} alphabets, {compiledInstructions
        .states.length} states, {Object.keys(compiledInstructions.transitions)
        .length} transitions, {Object.values(compiledInstructions.transitions)
        .map((transition) => transition.length)
        .reduce((acc, length) => acc + length, 0)} instructions
    {/if}
  </p>
</div>

<!-- ================================================= CSS -->
<style lang="postcss">
  #compilator {
    @apply flex w-full text-xs bg-neutral-800 p-2 rounded-b-lg text-neutral-300 h-20 overflow-y-auto overflow-x-hidden;
  }
</style>
