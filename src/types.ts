export interface ObsideanGTPSettings {
	gpt4allModelPath: string;
	llamaModelPath: string;
}

export const DEFAULT_SETTINGS: ObsideanGTPSettings = {
	gpt4allModelPath: app.vault.configDir + '/ggml-gpt4all-j-v1.3-groovy.bin', 
	llamaModelPath: app.vault.configDir + '/ggml-model-q4_0.bin'
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