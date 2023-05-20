import { ItemView, WorkspaceLeaf } from "obsidian";

//@tsconfig/svelte is required to resolve this error.
// Ignore temporarily.
//@ts-ignore
import ChatViewComponent from "./chatView.svelte";
import type ObsidianGPT from "src/main";

export const VIEW_TYPE_GPT = "gpt-view";

export class GPTView extends ItemView {

  private _plugin: ObsidianGPT;

  constructor(leaf: WorkspaceLeaf, plugin: ObsidianGPT) {
    super(leaf);
    this._plugin = plugin;
  }

  getViewType() {
    return VIEW_TYPE_GPT;
  }

  getDisplayText() {
    return "ObsidianGPT";
  }

  getIcon(): string {
    return "bot";
  }

  onOpen(): Promise<void> {
    new ChatViewComponent({
      target: this.contentEl,
      props: {
        plugin: this._plugin
      }
    });
    return super.onOpen();
  }

  onClose(): Promise<void> {
    return super.onClose();
  }
}