import { ItemView, WorkspaceLeaf } from "obsidian";

// @tsconfig/svelte is required to resolve this error.
// Ignore temporarily.
// @ts-ignore
// import ChatViewComponentView from "./chatView.svelte";

export const VIEW_TYPE_GPT = "gpt-view";

export class GPTView extends ItemView {

  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
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

  async onOpen() {
    // this._view = new ChatViewComponentView({
    //   target: this.containerEl
    // });
    return super.onOpen();
  }

  async onClose() {
    super.onClose();
  }
}