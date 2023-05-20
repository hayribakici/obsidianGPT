import { App, PluginSettingTab, Setting } from 'obsidian';
import type ObsidianGPT from "src/main";

export class ObsidianGPTSettingsTab extends PluginSettingTab {
	plugin: ObsidianGPT;

	constructor(app: App, plugin: ObsidianGPT) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('h2', {text: 'Settings for obsidianGPT.'});

		new Setting(containerEl)
			.setName('Path to GPT4ALL-Model')
			.setDesc('Give an absolut path if outside of vault')
			.addText(text => text
				.setPlaceholder('Enter your path')
				.setValue(this.plugin.settings.gpt4allModelPath)
				.onChange(async (value) => {
					// console.log('Secret: ' + value);
					this.plugin.settings.gpt4allModelPath = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
				.setName('Path to Llama-Model')
				.setDesc('Give an absolut path if outside of vault')
				.addText(text => text
					.setPlaceholder('Enter your path')
					.setValue(this.plugin.settings.llamaModelPath)
					.onChange(async (value) => {
						this.plugin.settings.llamaModelPath = value;
						await this.plugin.saveSettings();
					}));
	}
}