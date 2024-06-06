import { CometButton, CometView, System, onInit } from "@rbxts/comet";
import { mountUI } from "../react/entry";

export class MySystem extends System implements onInit {
	private uiButton: CometButton;
	private uiView: CometView;

	constructor() {
		super();

		// Create toolbar buttons.
		this.uiButton = this.createButton("My Button", "My awesome button", "rbxassetid://10941536680", true);

		// Make a widget.
		this.uiView = this.createWidget("My Widget", Vector2.one, Vector2.one.mul(500));
	}

	onInit(): void {
		// Allow the ui button to control the visibility of the Widget.
		this.uiView.linkButton(this.uiButton);

		// Mount UI
		this.uiView.mount(mountUI);
	}
}
