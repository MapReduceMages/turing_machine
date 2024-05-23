<!-- ================================================= SCRIPT -->
<script lang="ts">
  export let left: () => void;
  export let reset: () => void;
  export let right: () => void;
</script>

<!-- ================================================= CONTENT -->
<div id="console">
  <div class="input-container">
    <input
      type="button"
      value="left"
      on:click={left}
    />
    <input
      type="button"
      value="reset"
      on:click={reset}
    />
    <input
      type="button"
      value="right"
      on:click={right}
    />
  </div>
</div>

<!-- ================================================= CSS -->
<style lang="postcss">
  #console {
    @apply flex items-center justify-center my-box;
  }

  .input-container {
    @apply flex gap-box;
  }

  .input-container > input {
    @apply border border-black px-2 w-16 bg-white;
  }
</style>
