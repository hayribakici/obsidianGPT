import { ItemView, WorkspaceLeaf } from "obsidian";

//@tsconfig/svelte is required to resolve this error.
// Ignore temporarily.
//@ts-ignore
import ChatViewComponent from "./chatView.svelte";

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

  onOpen(): Promise<void> {
    new ChatViewComponent({
      target: this.contentEl
    });
    return super.onOpen();
  }

  onClose(): Promise<void> {
    return super.onClose();
  }
}