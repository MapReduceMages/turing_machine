<!-- ================================================= SCRIPT -->
<script lang="ts">
  import stringify from "json-stringify-pretty-compact";
  import Cookies from "js-cookie";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  // ------------------------- presets
  import presetUnaryAddition from "../../data/presets/unary_addition.json";
  import presetUnarySub from "../../data/presets/unary_sub.json";
  import presetPalindrome from "../../data/presets/palindrome.json";
  import preset0n1n from "../../data/presets/0n1n.json";
  import preset02n from "../../data/presets/02n.json";

  let selectElement: HTMLSelectElement | null = null;
  const CUSTOM_PRESET = "custom";

  export let handlePreset: (preset: string, value: string) => void;
  export const handlePresetBack = (preset?: string) => {
    console.log("OOO et du coup ?")
    const newPreset = preset ?? CUSTOM_PRESET;
    if (selectElement !== null) selectElement.value = newPreset;
    Cookies.set("preset", newPreset);
  };

  const presetTable: ReadonlyMap<string, Object> = new Map([
    ["unary_addition", presetUnaryAddition],
    ["unary_sub", presetUnarySub],
    ["palindrome", presetPalindrome],
    ["0n1n", preset0n1n],
    ["02n", preset02n],
  ]);

  function handleSelect(event: Event) {
    const target = event.target as HTMLSelectElement;
    const value = target.value;
    Cookies.set("preset", value);

    if (value !== CUSTOM_PRESET) {
      const preset = presetTable.get(value);
      if (preset !== undefined) {
        handlePreset(value, stringify(preset));
      }
    }
  }

  onMount(() => {
    if (browser) {
      const savedPreset = Cookies.get("preset");
      if (savedPreset && selectElement) {
        selectElement.value = savedPreset;
      }
    }
  });
</script>

<!-- ================================================= CONTENT -->
<select
  name=""
  id="preset-selector"
  class="text-xs"
  on:change={handleSelect}
  bind:this={selectElement}
>
  <option value={CUSTOM_PRESET}>{CUSTOM_PRESET}</option>
  <option value="unary_addition">unary addition</option>
  <option value="unary_sub">unary sub</option>
  <option value="palindrome">palindrome</option>
  <option value="0n1n">0n1n</option>
  <option value="02n">02n</option>
</select>

<!-- ================================================= CSS -->
<style lang="postcss">
</style>
