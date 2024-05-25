<!-- ================================================= SCRIPT -->
<script lang="ts">
  import Console from "./console.svelte";

  const TAPE_CELL_NUMBER = 101;
  const BORDER_SHIFT = 1;
  const HEAD_WIDTH = 3;
  const tape = Array(TAPE_CELL_NUMBER).fill("_");
  const cellSize = 42; // px
  const tapeContainerCellNumber = 11;
  const tapeContainerWidth = tapeContainerCellNumber * cellSize; // px

  let center = Math.floor(tape.length / 2);
  let index = center;
  let tapeWidth: number | undefined = undefined;
</script>

<!-- ================================================= CONTENT -->
<div id="tape" class="flex flex-col items-center gap-box-sm w-full">
  <!-- style="width: {tapeContainerWidth}px;" -->
  <div
    id="tape-visu"
    class="inset-shadow !rounded-b-none !border-b-0 flex items-center  w-full"
    bind:clientWidth={tapeWidth}
  >
    <div
      id="head"
      class="absolute top-0 bg-red-400 h-8 z-30"
      style="right: calc(50% - {HEAD_WIDTH / 2 -
        BORDER_SHIFT / 2}px); width: 3px;"
    ></div>
    <!-- style="right: {tapeContainerWidth / 2 -
        HEAD_WIDTH / 2 -
        BORDER_SHIFT}px; width: {HEAD_WIDTH}px;" -->
    <ul
      class="flex border border-solid border-black rounded-lg transition-transform duration-200"
      style="margin: {cellSize / 2}px  0; transform: translateX({tapeWidth / 2 -
        cellSize * 1.5 -
        index * cellSize -
        BORDER_SHIFT / 2}px)"
    >
      <!-- style="margin: 0 {cellSize}px; transform: translateX({(index -
        tapeShift) *
        -cellSize -
        BORDER_SHIFT}px);" -->
      {#each tape as cell, index}
        <li
          style="min-width: {cellSize}px; height: {cellSize}px;"
          class="relative flex items-center justify-center text-sm border-solid border-black border-r first:rounded-l-lg first:border-l-0 last:rounded-r-lg last:border-r-0"
        >
          {cell}
          <p
            class="absolute -bottom-5 left-0 text-[0.6em] w-full text-center opacity-50"
          >
            {center - index}
          </p>
        </li>
      {/each}
    </ul>
  </div>
</div>
<div class="bg-neutral-800 text-neutral-400 w-full rounded-b-lg px-2 py-1">
  <!-- lines: before current after -->
  <!-- columns: state, value, move -->
  <div
    class="grid grid-cols-5 gap-box-sm p-2 text-xs
  "
  >
    <!-- header -->
    <p class="invisible">nothing</p>
    <p class="italic">cycle</p>
    <p class="italic">state</p>
    <p class="italic">symbol</p>
    <p class="italic">move</p>
    <!-- before -->
    <p class="italic">before</p>
    <p>{0}</p>
    <p>scanright</p>
    <p>x</p>
    <p>RIGHT</p>
    <!-- current -->
    <p class="text-neutral-100 italic">current</p>
    <p class="text-neutral-100">{1}</p>
    <p class="text-neutral-100">scanright</p>
    <p class="text-neutral-100">y</p>
    <p class="text-neutral-100">LEFT</p>
    <!-- after -->
    <p class="italic">after</p>
    <p>{2}</p>
    <p>scanright</p>
    <p>z</p>
    <p>RIGHT</p>
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
