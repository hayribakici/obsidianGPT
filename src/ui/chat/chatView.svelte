<script lang="ts">
	import { HuggingFaceInferenceEmbeddings } from "langchain-gpt4all/embeddings/hf";
	import { Chroma } from "langchain/vectorstores/chroma";
	import { ChromaClient, Collection } from "chromadb";
	import type { Document } from "langchain-gpt4all/docstore";
	import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
	import { UnstructuredLoader } from "langchain/document_loaders/fs/unstructured";
	import fs from "fs";
	import path from "path";

	import type { State, Status, ObsidianGPTSettings } from "src/types";
	import type ObsidianGPT from "src/main";

	export let plugin: ObsidianGPTSettings;

	// let settings: ObsidianGPTSettings;

	// let files = plugin.app.vault.getMarkdownFiles();

	let db: Chroma;
	let collection: Collection;

	let embeddings: HuggingFaceInferenceEmbeddings;

	let state: State | State.idle;
	let status: Status | undefined;

	let rows = 1;
	let question = "";
	let buttons: HTMLElement[] = [];

	function vectorStoreExists(dir: string): boolean {
		if (fs.existsSync(dir)) {
			if (
				fs.existsSync(path.join(dir, "chroma-collections.parquet")) &&
				fs.existsSync(path.join(dir, "chroma-embeddings.parquet"))
			) {
				let indexFiles = fs
					.readdirSync(path.join(dir, "index/"))
					.filter(
						(file) => path.extname(file).toLowerCase() === ".bin"
					);
				let pklFiles = fs
					.readdirSync(path.join(dir, "index/"))
					.filter(
						(file) => path.extname(file).toLowerCase() === ".pkl"
					);
				indexFiles = indexFiles.concat(pklFiles);
				if (indexFiles.length > 3) {
					return true;
				}
			}
		}
		return false;
	}

	async function ingest() {
		// this.settings = plugin.settings;
		this.embeddings = new HuggingFaceInferenceEmbeddings({
			model: plugin.gpt4allModelPath,
		});
		if (vectorStoreExists(plugin.persistenceDirectory)) {

			this.db = new Chroma(this.embeddings, {
				index: new ChromaClient({
					path: plugin.persistenceDirectory,
				}),
			});
			this.collection = this.db.collection;
			console.log(this.collection);
			//         texts = process_documents([metadata['source'] for metadata in collection['metadatas']])
			// let metas = collection['metadatas'];
			// let ignored = [];
			// for (let metadata in metas) {
			// 	ignored.push(metadata['source']);
			// }
			// let texts = processDocuments(ignored);
		} else {
			console.log("vector storage does not exist");
		}
		return null;
	}

	function processDocuments(ignoredFiles: string[]): Document[] {
		return [];
	}

	function getIgnoredDocuments(collection: Collection) {}
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
				name=""
				id=""
				rows="10"
				readonly
			/>
		</div>
	</div>
</main>
