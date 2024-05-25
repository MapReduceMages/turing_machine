<!-- ================================================= SCRIPT -->
<script lang="ts">
  export let error: string | null = null;
  export let empty: boolean = false;
</script>

<!-- ================================================= CONTENT -->
<div id="compilator">
  <ul>
    <li>
      <p class="">compilation</p>
      <p>:</p>
      <p>
        {#if empty}
          <span class="opacity-40">no instructions</span>
        {:else if error !== null}
          <span class="text-red-300">{error}</span>
        {:else}
          <span class="text-green-500">success</span>
        {/if}
      </p>
    </li>
    <li>
      <p class="text-neutral-300">transitions</p>
      <p>:</p>
      <p>{4}</p>
    </li>
    <li>
      <p class="text-neutral-300">instructions</p>
      <p>:</p>
      <p>{10}</p>
    </li>
  </ul>
</div>

<!-- ================================================= CSS -->
<style lang="postcss">
  #compilator {
    @apply w-full text-xs bg-neutral-800 p-2 rounded-lg text-neutral-300 h-36 overflow-y-auto overflow-x-hidden;
  }

  #compilator > ul > li {
    @apply flex justify-start items-start gap-box-sm;
  }

  #compilator > ul > li > p:first-of-type {
    @apply min-w-28;
  }
</style>
