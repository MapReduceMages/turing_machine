<!-- ================================================= SCRIPT -->
<script lang="ts">
  import Console from "./console.svelte";

  const TAPE_CELL_NUMBER = 101;
  const BORDER_SHIFT = 1;
  const HEAD_WIDTH = 3;
  const tape = Array(TAPE_CELL_NUMBER)
    .fill(0)
    .map((_, i) => i);
  const cellSize = 42; // px
  const tapeContainerCellNumber = 11;
  const tapeContainerWidth = tapeContainerCellNumber * cellSize; // px

  let index = 10;
  let tapeWidth: number | undefined = undefined;
</script>

<!-- ================================================= CONTENT -->
<div id="tape" class="flex flex-col items-center gap-box-sm w-full">
  <!-- style="width: {tapeContainerWidth}px;" -->
  <div
    id="tape-visu"
    class="inset-shadow flex items-center h-20 w-full"
    bind:clientWidth={tapeWidth}
  >
    <div
      id="head"
      class="absolute top-0 h-7 bg-red-400 z-30"
      style="right: calc(50% - {HEAD_WIDTH / 2 - BORDER_SHIFT / 2}px); width: 3px;"
    ></div>
      <!-- style="right: {tapeContainerWidth / 2 -
        HEAD_WIDTH / 2 -
        BORDER_SHIFT}px; width: {HEAD_WIDTH}px;" -->
    <ul
      class="flex border border-solid border-black rounded-lg transition-transform duration-200"
      style="margin: 0 {cellSize}px; transform: translateX({(tapeWidth / 2) - cellSize * 1.5 - index * cellSize - BORDER_SHIFT / 2}px)"
    >
      <!-- style="margin: 0 {cellSize}px; transform: translateX({(index -
        tapeShift) *
        -cellSize -
        BORDER_SHIFT}px);" -->
      {#each tape as cell}
        <li
          style="min-width: {cellSize}px; height: {cellSize}px;"
          class="flex items-center justify-center text-sm border-solid border-black border-r first:rounded-l-lg first:border-l-0 last:rounded-r-lg last:border-r-0"
        >
          {cell}
        </li>
      {/each}
    </ul>
  </div>
</div>
<div style="width: {tapeContainerWidth}px;" class="overflow-hidden">
  <Console
    back={() => {}}
    next={() => {}}
    pause={() => {}}
    play={() => {}}
    reset={() => {}}
    stop={() => {}}
    playing={false}
  />
</div>

<!-- ================================================= CSS -->
<style lang="postcss">
  #tape-visu {
    background-color: white;
  }

  ul > li {
    background-color: beige;
  }
</style>
