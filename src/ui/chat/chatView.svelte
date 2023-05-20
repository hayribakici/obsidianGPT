<script lang="ts">
  import { HuggingFaceInference } from "langchain-gpt4all/llms";
  import {HuggingFaceInferenceEmbeddings } from "langchain-gpt4all/embeddings/hf";
  import { ConversationalRetrievalQAChain } from "langchain/chains";
  import { Chroma } from "langchain/vectorstores/chroma";
  import { OpenAIEmbeddings } from "langchain/embeddings/openai";
  import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
  import { UnstructuredLoader  } from "langchain/document_loaders/fs/unstructured";
  import fs from 'fs';

  import type { State, Status } from "src/types";
  import type ObsidianGPT from 'src/main';
  
  export let plugin: ObsidianGPT;
  let settings = plugin.settings;

  let files = plugin.app.vault.getMarkdownFiles();

  let embeddings: HuggingFaceInferenceEmbeddings;

  let state: State | State.idle;
  let status: Status | undefined;

  let rows = 1;
  let question = "";
  let buttons: HTMLElement[] = [];

  function setupIngestion() {
    embeddings = new HuggingFaceInferenceEmbeddings({
      model: settings.gpt4allModelPath
    })
  }

  async function vectorStoreExists(dir: string) {
    fs.stat(dir, (exists) => {
      if (exists) {

      } else {

      }
    });
  }
  
  async function ingest() {
    setupIngestion();
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
      on:click={ingest}
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