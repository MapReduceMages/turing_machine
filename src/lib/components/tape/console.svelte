<!-- ================================================= SCRIPT -->
<script lang="ts">
  import Icon from "@iconify/svelte";

  export let stop: () => void;
  export let pause: () => void;
  export let play: () => void;
  export let back: () => void;
  export let next: () => void;
  export let reset: () => void;

  export let playing = false;

  const INSTANT_SPEED = 0;
  const speeds = [INSTANT_SPEED, 1, 2, 3, 10, 30];
  let speed: number = speeds[1];

  function handleSpeed() {
    speed = speeds[speeds.indexOf(speed) + 1] || INSTANT_SPEED;
  }
</script>

<!-- ================================================= CONTENT -->
<div id="console">
  <div class="input-container">
    <input type="text" placeholder="input" />
    <button class="icon-btn" on:click={back}
      ><Icon class="text-neutral-800" icon="ion:trash" width={16} /></button
    >
  </div>
  <ul id="cycle-stats">
    <li>
      <p>cycle</p>
      <p>{108}</p>
    </li>
    <li>
      <p>move</p>
      <p>{67}</p>
    </li>
    <li>
      <p>write</p>
      <p>{34}</p>
    </li>
  </ul>
  <div class="control-container">
    <button class="icon-btn" on:click={back}
      ><Icon class="text-neutral-800" icon="mdi:arrow-left-bold" width={20} /></button
    >
    <button class="icon-btn" on:click={stop}
      ><Icon class="text-neutral-800" icon="material-symbols:stop" width={20} /></button
    >
    <button class="icon-btn" on:click={handleSpeed}>
      {#if speed === 0}
        <Icon class="text-neutral-800" icon="mdi:storm" width={20} />
      {:else}
        <p>x{speed}</p>
      {/if}
    </button>
    {#if playing}
      <button class="icon-btn" on:click={pause}>
        <Icon class="text-neutral-800" icon="material-symbols:pause" width={20} />
      </button>
    {:else}
      <button class="icon-btn" on:click={play}>
        <Icon class="text-neutral-800" icon="material-symbols:play-arrow" width={20} />
      </button>
    {/if}
    <button class="icon-btn" on:click={next}
      ><Icon class="text-neutral-800" icon="mdi:arrow-right-bold" width={20} /></button
    >
  </div>
</div>

<!-- ================================================= CSS -->
<style lang="postcss">
  #console {
    @apply flex flex-col items-center justify-center my-box gap-box-sm;
  }

  .control-container,
  .input-container {
    @apply flex gap-box;
  }

  button {
    @apply w-20 flex items-center justify-center;
  }

  button.icon-btn {
    @apply w-10;
  }

  ul#cycle-stats {
    @apply flex flex-col gap-1 my-2;
  }

  ul#cycle-stats > li {
    @apply flex justify-center gap-box;
  }

  ul#cycle-stats > li > p {
    @apply text-xs w-20 first:text-right last:text-left;
  }

</style>
