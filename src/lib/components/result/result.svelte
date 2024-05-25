<!-- ================================================= SCRIPT -->
<script lang="ts">
  const resultCycles = [
    "(scanright, 1) -> (scanright, 1, RIGHT)",
    "(scanright, 1) -> (scanright, 1, RIGHT)",
    "(scanright, 1) -> (scanright, 1, RIGHT)",
    "(scanright, -) -> (scanright, -, RIGHT)",
    "(scanright, 1) -> (scanright, 1, RIGHT)",
    "(scanright, 1) -> (scanright, 1, RIGHT)",
    "(scanright, =) -> (eraseone, ., LEFT)",
    "(eraseone, 1) -> (subone, =, LEFT)",
    "(subone, 1) -> (subone, 1, LEFT)",
    "(subone, -) -> (skip, -, LEFT)",
    "(skip, 1) -> (scanright, ., RIGHT)",
    "(scanright, -) -> (scanright, -, RIGHT)",
    "(scanright, 1) -> (scanright, 1, RIGHT)",
    "(scanright, =) -> (eraseone, ., LEFT)",
    "(eraseone, 1) -> (subone, =, LEFT)",
    "(subone, -) -> (skip, -, LEFT)",
    "(skip, .) -> (skip, ., LEFT)",
    "(skip, 1) -> (scanright, ., RIGHT)",
    "(scanright, .) -> (scanright, ., RIGHT)",
    "(scanright, -) -> (scanright, -, RIGHT)",
    "(scanright, =) -> (eraseone, ., LEFT)",
    "(eraseone, -) -> (HALT, ., LEFT)",
  ];
</script>

<!-- ================================================= CONTENT -->
<div id="container-result" class="flex flex-col items-center w-full mt-box">
  <header class="flex justify-between mb-2 w-full items-end">
    <h2 class="">Result</h2>
    <p class="opacity-50 italic">300 cycles</p>
  </header>
  <ul
    id="result"
    class="bg-neutral-800 text-neutral-300 rounded-lg w-full h-96 overflow-y-auto overflow-x-hidden"
  >
    {#each resultCycles as cycle, index}
      <li
        class="flex gap-box-sm py-1 px-2 border-b border-solid border-neutral-700"
      >
        <p class="w-10">{index}</p>
        <p class="text-xs">{cycle}</p>
      </li>
    {/each}
  </ul>
</div>

<!-- ================================================= CSS -->
<style lang="postcss">
</style>
