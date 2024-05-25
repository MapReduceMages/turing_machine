<!-- ================================================= SCRIPT -->
<script lang="ts">
  import Icon from "@iconify/svelte";
</script>

<!-- ================================================= CONTENT -->
<div class="flex gap-box mb-box w-full">
  <input type="text" placeholder="input" />
  <button class="icon-btn !w-fit pr-3" on:click={() =>{}}>
    <Icon class="text-neutral-800" icon="mdi:upload" width={18} />
    <p class="ml-1">load</p>
  </button>
  <button class="icon-btn !w-fit pr-3 ml-auto" on:click={() =>{}}>
    <Icon class="text-neutral-800" icon="mdi:reload" width={18} />
    <p class="ml-1">reset</p>
  </button>
</div>

<!-- ================================================= CSS -->
<style lang="postcss">
  button {
    @apply w-20 flex items-center justify-center;
  }
</style>
