<!-- ================================================= SCRIPT -->
<script lang="ts">
  import PresetSelector from "./preset_selector.svelte";
  import parseJson, { JSONError } from "parse-json";
  import Compilator from "./compilator.svelte";

  let instructions = "";
  let compiledInstructions: Object | undefined | null = null;
  let errorMessage: string | null = null;

  function cleanJSONError(error: JSONError): string {
    const message = error.message;
    const firstNewLine = message.indexOf("\n");
    const cleanedMessage = message.slice(0, firstNewLine);

    return cleanedMessage;
  }

  function compileInstructions() {
    console.log("instructions: ", instructions);
    try {
        errorMessage = null;
      parseJson(instructions);
    } catch (error) {
      if (error instanceof JSONError) {
        errorMessage = cleanJSONError(error);
      } else {
        errorMessage = "Unknown error";
      }
    }
  }
</script>

<!-- ================================================= CONTENT -->
<div id="instructions-container" class="flex flex-col items-center w-full overflow-hidden my-box">
  <header>
    <h2>Instructions</h2>
    <PresetSelector />
  </header>
  <div class="bg-neutral-100 w-full border-t border-x border-solid rounded-t-lg py-1 px-2 text-xs flex items-center justify-between">
    <p class="text-xs italic opacity-40">JSON format</p>
      <p class="text-xs text-right">{instructions.length} character{@html instructions.length > 0 ? "s" : "&nbsp;"}</p>
  </div>
  <textarea
    bind:value={instructions}
    class="inset-shadow w-full h-[200px] resize-none !border-y-0 !rounded-none overflow-scroll"
    on:input={compileInstructions}
  ></textarea>

    <Compilator error={errorMessage} empty={instructions.length === 0} />
</div>

<!-- ================================================= CSS -->
<style lang="postcss">
  header {
    @apply w-full flex justify-between items-center gap-box flex-wrap mb-box-sm;
  }
</style>
