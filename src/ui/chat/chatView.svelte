<script lang="ts">
  import type { State, Status } from "src/types";
  
  let state: State | State.idle;
  let status: Status | undefined;

  let rows = 1;
  let question = "";
  let buttons: HTMLElement[] = [];

  
  async function refresh() {
    console.log("refreshing..." + question);
    return null;
  }

  
</script>

<main>
  <div class="nav-header">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div 
      id="refresh-ingest-btn"
      data-icon="refresh"
      class="clickable-icon nav-action-button"
      aria-label="Refresh"
      bind:this={buttons[0]}
      on:click={refresh}
      />
    <p>Number of ingested documents: {status?.ingestedDocumentsCount}</p>
    <p>Last ingested date: {status?.lastIngestedDate}</p>
  </div>
  <div class="chat">
    <div class="question-prompt">
      <textarea
        {rows}
        class="question-input"
        spellcheck="true"
        placeholder="Ask your documents a question..."
        bind:value={question}
      />
      <textarea 
      class="response-output"
      name="" id="" rows="10" 
      readonly
      />
    </div>
  </div>
</main>