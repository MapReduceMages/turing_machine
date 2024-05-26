<!-- ================================================= SCRIPT -->
<script lang="ts">
  const resultCycles = new Array(642).fill(0);
</script>

<!-- ================================================= CONTENT -->

<div id="container-result" class="flex flex-col items-center w-full mt-box">
  <header class="flex justify-between mb-1 w-full items-end">
    <h2 class="">Result</h2>
    <p class="opacity-50 italic">{resultCycles.length} cycles</p>
  </header>
  <div
    class="bg-neutral-800 text-neutral-100 w-full rounded-lg p-2 text-[0.8em] md:text-xs"
  >
    <li id="header">
      <p class="italic">cycle</p>
      <p class="italic">state</p>
      <p class="italic">symbol</p>
      <p class="italic">move</p>
    </li>
    <ul class="flex flex-col gap-1 h-32">
      {#each resultCycles as resultCycle, index}
        <li>
          <p>{index}</p>
          <p>scanright</p>
          <p>x</p>
          <p>right</p>
        </li>
      {/each}
    </ul>
  </div>
</div>

<!-- ================================================= CSS -->
<style lang="postcss">
  li#header {
    overflow-y: auto;
    scrollbar-gutter: stable;
  }
  ul {
    /* @apply pr-5; */
    @apply overflow-y-scroll;
    overflow-y: auto;
    scrollbar-gutter: stable;
  }
  ul > li,
  li#header {
    @apply grid grid-cols-4 transition-opacity duration-100 opacity-70 hover:opacity-100 cursor-pointer;
  }
  li#header {
    @apply pb-1;
  }

  ul > li > p {
    @apply overflow-hidden text-ellipsis text-nowrap;
  }
</style>
