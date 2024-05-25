<!-- ================================================= SCRIPT -->
<script lang="ts">
  import PresetSelector from "./preset_selector.svelte";
  import parseJson, { JSONError } from "parse-json";
  import Compilator from "./compilator.svelte";

  let instructions = "";
  let compiledInstructions: Object | undefined | null = null;
  let errorMessage: string | null = null;

  let cursorPosition = 0;
  let cursorLine = 1;
  let cursorColumn = 1;

  function cleanJSONError(error: JSONError): string {
    const message = error.message;
    const firstNewLine = message.indexOf("\n");
    const cleanedMessage = message.slice(0, firstNewLine);

    return cleanedMessage;
  }

  const TEXTAREA_ID = "text-field";

  function getCursorPosition() {
    const textField = document.getElementById(TEXTAREA_ID);
    if (textField !== null) {
      cursorPosition = (textField as HTMLTextAreaElement).selectionStart;
    }

    const INDEX_START = 1;

    let line = INDEX_START;
    let column = INDEX_START;
    let currentIndex = 0;

    for (let i = 0; i < instructions.length; i++) {
      if (currentIndex === cursorPosition) {
        cursorLine = line;
        cursorColumn = column;
        return;
      }
      if (instructions[i] === "\n") {
        line++;
        column = INDEX_START;
      } else {
        column++;
      }
      currentIndex++;
    }

    if (currentIndex === cursorPosition) {
      cursorLine = line;
      cursorColumn = column;
      return;
    }

    throw new Error("Index out of bounds");
  }

  function compileInstructions() {
    getCursorPosition();

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
<div
  id="instructions-container"
  class="flex flex-col items-center w-full overflow-hidden my-box"
>
  <header>
    <h2>Instructions</h2>
    <PresetSelector />
  </header>
  <div
    class="bg-neutral-100 w-full border-t border-x border-solid rounded-t-lg py-1 px-2 text-xs flex items-center justify-between"
  >
    <p class="text-[0.9em] italic opacity-40">JSON format</p>
    <p class="text-[0.9em] text-right">
      Line {cursorLine}, Column {cursorColumn}
    </p>
  </div>
  <textarea
    id={TEXTAREA_ID}
    spellcheck="false"
    bind:value={instructions}
    class="inset-shadow w-full h-[200px] resize-none !border-y-0 !rounded-none overflow-scroll"
    on:input={compileInstructions}
    on:keypress={getCursorPosition}
    on:keydown={getCursorPosition}
    on:pointermove={getCursorPosition}
    on:mousemove={getCursorPosition}
    on:keyup={getCursorPosition}
    on:click={getCursorPosition}
  ></textarea>

  <Compilator error={errorMessage} empty={instructions.length === 0} />
</div>
<ul class="text-[0.8em]">
  <li>
    <p>alphabet</p>
    <p>list of symbols that can be written on the tape</p>
  </li>
  <li>
    <p>blank</p>
    <p>symbol that represents a blank space on the tape</p>
  </li>
  <li>
    <p>states</p>
    <p>list of states that the machine can be in</p>
  </li>
  <li>
    <p>initial</p>
    <p>initial state of the machine</p>
  </li>
  <li>
    <p>finals</p>
    <p>list of final states that stop the machine</p>
  </li>
  <li>
    <p>transitions</p>
    <p>list of states corresponding transitions</p>
  </li>
  <li>
    <p>
      <span class="opacity-50">transitions.</span>read
    </p>
    <p>symbol that the machine is looking for</p>
  </li>
  <li>
    <p>
      <span class="opacity-50">transitions.</span>to_state
    </p>
    <p>state that the machine will transition to</p>
  </li>
  <li>
    <p>
      <span class="opacity-50">transitions.</span>write
    </p>
    <p>symbol that the machine will write on the tape</p>
  </li>
  <li>
    <p>
      <span class="opacity-50">transitions.</span>action
    </p>
    <p>action that the machine will take after writing</p>
  </li>
</ul>

<!-- ================================================= CSS -->
<style lang="postcss">
  header {
    @apply w-full flex justify-between items-center gap-box flex-wrap mb-box-sm;
  }

  ul > li {
    @apply flex gap-box-sm;
  }

  ul > li > p:first-of-type {
    @apply w-36 italic;
  }
</style>
