<!-- ================================================= SCRIPT -->
<script lang="ts">
  import Instructions from "./instructions.svelte";

  export let error: string | null = null;
  export let empty: boolean = false;
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
    {:else}
      {0} alphabets, {0} states, {0} transitions, {0} instructions
    {/if}
  </p>
</div>

<!-- ================================================= CSS -->
<style lang="postcss">
  #compilator {
    @apply flex w-full text-xs bg-neutral-800 p-2 rounded-b-lg text-neutral-300 h-20 overflow-y-auto overflow-x-hidden;
  }

  /* #compilator {
    @apply flex justify-start items-start gap-box-sm;
  }

  #compilator > p:first-of-type {
    @apply min-w-28;
  } */
</style>
