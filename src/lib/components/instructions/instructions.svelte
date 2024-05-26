<!-- ================================================= SCRIPT -->
<script lang="ts">
  import PresetSelector from "./preset_selector.svelte";
  import parseJson, { JSONError } from "parse-json";
  import Compilator from "./compilator.svelte";
  import Helper from "./helper.svelte";
  import { browser } from "$app/environment";
  import Cookies from "js-cookie";
  import { onMount } from "svelte";

  let instructions = "";
  let errorMessage: string | null = null;

  let cursorPosition = 0;
  let cursorLine: number | null = null;
  let cursorColumn: number | null = null;

  let textAreaElement: HTMLTextAreaElement | null = null;
  let textAreaElementIsFocused = false;
  let handlePresetBack: (preset?: string) => void;
  let lastPreset: string | null = null;
  let lastPresetInstructions: string | null = null;

  function cleanJSONError(error: JSONError): string {
    const message = error.message;
    const firstNewLine = message.indexOf("\n");
    const cleanedMessage = message.slice(0, firstNewLine);

    return cleanedMessage;
  }

  const TEXTAREA_ID = "text-field";

  function getCursorPosition() {
    if (textAreaElement === null) return;
    if (textAreaElementIsFocused === false) {
      cursorLine = null;
      cursorColumn = null;
      return;
    }

    cursorPosition = textAreaElement.selectionStart;

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

    // Index out of bounds
    textAreaElement.setSelectionRange(0, 0);
    cursorLine = 1;
    cursorColumn = 1;
  }

  function compileInstructions(e: any) {
    const newInstructions = e.target.value;
    if (newInstructions === instructions) return;
    instructions = newInstructions;
    console.log("lastPreset", lastPreset);
    if (lastPreset !== null && lastPresetInstructions === instructions) {
      console.log("NONONONIUIIUI")
      handlePresetBack(lastPreset);
    } else {
      handlePresetBack();
    }

    Cookies.set("instructions", instructions);
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

  function handlePreset(preset: string, value: string) {
    instructions = value;
    lastPreset = preset;
    lastPresetInstructions = value;
    getCursorPosition();
    compileInstructions({ target: { value: instructions } });
  }

  onMount(() => {
    if (browser) {
      const savedInstructions = Cookies.get("instructions");
      if (savedInstructions) {
        instructions = savedInstructions;
      }
      const savedPreset = Cookies.get("preset");
      if (savedPreset) {
        lastPreset = savedPreset;
        handlePresetBack(savedPreset);
      }
    }
  });
</script>

<!-- ================================================= CONTENT -->
<div
  id="instructions-container"
  class="flex flex-col items-center w-full overflow-hidden my-box"
>
  <header>
    <h2>Instructions</h2>
    <PresetSelector {handlePreset} bind:handlePresetBack={handlePresetBack} />
  </header>
  <div
    class="bg-neutral-100 w-full border-t border-x border-solid rounded-t-lg py-1 px-2 text-xs flex items-center justify-between"
  >
    <p class="text-[0.9em] italic opacity-40">JSON format</p>
    <p class="text-[0.9em] text-right">
      Line {cursorLine === null ? "?" : cursorLine}, Column {cursorColumn ===
      null
        ? "?"
        : cursorColumn}
    </p>
  </div>
  <textarea
    id={TEXTAREA_ID}
    bind:this={textAreaElement}
    spellcheck="false"
    class="inset-shadow w-full h-[200px] resize-none !border-y-0 !rounded-none overflow-scroll"
    on:input={compileInstructions}
    on:keypress={() => {
      getCursorPosition();
    }}
    on:keydown={() => {
      getCursorPosition();
    }}
    on:pointermove={() => {
      getCursorPosition();
    }}
    on:mousemove={() => {
      getCursorPosition();
    }}
    on:keyup={() => {
      getCursorPosition();
    }}
    on:click={() => {
      getCursorPosition();
    }}
    on:focus={() => {
      textAreaElementIsFocused = true;
    }}
    on:blur={() => {
      console.log("Ouiiiiiii");
      textAreaElementIsFocused = false;
    }}>{instructions}</textarea
  >
  <Compilator error={errorMessage} empty={instructions.length === 0} />
</div>
<Helper />

<!-- ================================================= CSS -->
<style lang="postcss">
  header {
    @apply w-full flex justify-between items-center gap-box flex-wrap mb-box-sm;
  }
</style>
