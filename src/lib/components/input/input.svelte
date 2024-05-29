<!-- ================================================= SCRIPT -->
<script lang="ts">
  import Icon from "@iconify/svelte";
</script>

<!-- ================================================= CONTENT -->
<div class="flex flex-col md:flex-row gap-box-sm mb-box w-fit md:w-full">
  <input type="text" placeholder="input" />
  <div class="flex justify-center md:justify-between w-full gap-box-sm">
    <button class="!w-fit pr-3" on:click={() =>{}}>
      <Icon class="text-neutral-800" icon="mdi:upload" width={18} />
      <p class="ml-1">load</p>
    </button>
    <button class="!w-fit pr-3" on:click={() =>{}}>
      <Icon class="text-neutral-800" icon="mdi:reload" width={18} />
      <p class="ml-1">reset</p>
    </button>
  </div>
</div>

<!-- ================================================= CSS -->
<style lang="postcss">
  button {
    @apply w-20 flex items-center justify-center;
  }
</style>
