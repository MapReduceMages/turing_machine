<!-- ================================================= SCRIPT -->
<script lang="ts">
  import Console from "./console.svelte";

  const TAPE_CELL_NUMBER = 101;
  const BORDER_SHIFT = 1;
  const HEAD_WIDTH = 4;
  const tape = Array(TAPE_CELL_NUMBER)
    .fill(0)
    .map((_, i) => i);
  const cellSize = 60; // px
  const tapeContainerCellNumber = 11;
  const tapeShift = Math.floor(tapeContainerCellNumber / 2) - 1;
  const tapeContainerWidth = tapeContainerCellNumber * cellSize; // px

  let index = 0;

  function handleLeft() {
    if (index > 0) {
      index--;
    }
  }

  function handleReset() {
    index = Math.floor(TAPE_CELL_NUMBER / 2);
  }

  function handleRight() {
    if (index < TAPE_CELL_NUMBER - 1) {
      index++;
    }
  }
</script>

<!-- ================================================= CONTENT -->
<!-- <p>index: {index}</p> -->
<div
  style="width: {tapeContainerWidth}px;"
  id="tape-container"
  class="inset-shadow flex items-center h-32"
>
  <div
    id="head"
    class="absolute top-0 h-10 bg-red-800 z-30"
    style="right: {tapeContainerWidth / 2 -
      HEAD_WIDTH / 2 -
      BORDER_SHIFT}px; width: {HEAD_WIDTH}px;"
  ></div>
  <ul
    class="flex border border-solid border-black rounded-lg transition-transform duration-200"
    style="margin: 0 {cellSize}px; transform: translateX({(index - tapeShift) *
      -cellSize -
      BORDER_SHIFT}px);"
  >
    {#each tape as cell}
      <li
        style="min-width: {cellSize}px; height: {cellSize}px;"
        class="flex items-center justify-center border-solid border-black border-x-[0.5px] first:rounded-l-lg first:border-l-0 last:rounded-r-lg last:border-r-0"
      >
        {cell}
      </li>
    {/each}
  </ul>
</div>
<Console left={handleLeft} reset={handleReset} right={handleRight} />

<!-- ================================================= CSS -->
<style lang="postcss">


  #tape-container {
    background-color: white;
  }

  ul > li {
    background-color: beige;
  }
</style>
