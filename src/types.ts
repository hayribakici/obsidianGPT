export interface ObsideanGTPSettings {
	gpt4allModelPath: string;
	llamaModelPath: string;
	persistenceDirectory: string;
}

export const DEFAULT_SETTINGS: ObsideanGTPSettings = {
	gpt4allModelPath: app.vault.configDir + '/obsidianGPT/models/ggml-gpt4all-j-v1.3-groovy.bin', 
	llamaModelPath: app.vault.configDir + '/obsidianGPT/models/ggml-model-q4_0.bin',
	persistenceDirectory: app.vault.configDir + '/obsidianGPT/models/db'
}

export interface Status {
	ingestedDocumentsCount: number,
	lastIngestedDate: Date
}

export enum State {
	idle,
	ingesting,
	answering
}