import { App, PluginSettingTab, Setting, Notice } from 'obsidian';
import type ObsidianGPT from "src/main.js";

export class ObsidianGPTSettingsTab extends PluginSettingTab {
	plugin: ObsidianGPT;

	constructor(app: App, plugin: ObsidianGPT) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Path to GPT4ALL-Model')
			.setDesc('Give an absolut path if outside of vault')
			.addText(text => text
				.setPlaceholder('Enter your path')
				.setValue(this.plugin.settings.gpt4allModelPath)
				.onChange(async (value) => {
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
				
		new Setting(containerEl)
			.setName('Path to persistance directory')
			.setDesc('Give an absolut path if outside of vault')
			.addText(text =>
				text
					.setPlaceholder('Enter path')
					.setValue(this.plugin.settings.persistenceDirectory)
					.onChange(async (value) => {
						this.plugin.settings.persistenceDirectory = value;
						await this.plugin.saveSettings();
					}));
		// .addButton(btn => {
		// 	const input = createEl("input", {
		// 		attr: {
		// 			type: "folder",
		// 			name: "merge",
		// 			accept: "*",
		// 			multiple: false,
		// 			style: "display: none;"
		// 		}
		// 	});
		// 	input.onchange = async () => {
		// 		const { files } = input;

		// 		if (!files?.length) return;
		// 		try {
		// 			// 	const data: Admonition[][] | Admonition[] = [];
		// 			// 	for (let file of Array.from(files)) {
		// 			// 		data.push(JSON.parse(await file.text()));
		// 			// 	}
		// 			// 	for (const item of data.flat()) {
		// 			// 		if (typeof item != "object") continue;

		// 			// 		if (!item.icon) {
		// 			// 			item.icon = {
		// 			// 				name: "pencil-alt",
		// 			// 				type: "font-awesome"
		// 			// 			};
		// 			// 		}
		// 			// 	}
		// 			this.display();
		// 		} catch (e) {
		// 			new Notice(
		// 				`There was an error while importing the admonition${files.length == 1 ? "" : "s"
		// 				}.`
		// 			);
		// 			console.error(e);
		// 		}

		// 		input.value = "";
		// 	};
		// 	btn.setIcon('folder-open')
		// 	btn.setTooltip('Browse')
		// 	btn.buttonEl.appendChild(input);
		// 	btn.onClick(() => input.click());	
		// });


	}
}