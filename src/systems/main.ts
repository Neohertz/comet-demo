import { CometAction, CometButton, CometMenu, CometView, System, onEnd, onInit, onRender, onStart } from "@rbxts/comet";
import { mountUI } from "../react/entry";
import network from "../network";
import { Workspace } from "@rbxts/services";

export class MySystem extends System implements onInit, onStart, onRender, onEnd {
	// Buttons
	private uiButton: CometButton;
	private menuButton: CometButton;

	// Views
	private widgetView: CometView;

	// Menus & Actions
	private contextMenu: CometMenu;
	private action: CometAction;

	constructor() {
		super();

		// Create toolbar buttons.
		this.uiButton = this.createButton("Show UI", "Show the UI", "rbxassetid://10941536680", true);
		this.menuButton = this.createButton("Show Menu", "Show the Context Menu", "rbxassetid://14895352864", true);

		// Make a widget.
		this.widgetView = this.createWidget("My Widget", Vector2.one.mul(100), Vector2.one.mul(100));

		// Build a context menu
		this.contextMenu = this.buildMenu()
			.action("Say Hello", "rbxassetid://10941536680", () => {
				print("Hello!");
			})
			.separator()
			.submenu("My Submenu")
			.action("Another Action");

		// Create plugin actions
		this.action = this.createAction("MY_AWESOME_ACTION", "My Action", "This action does things!");
	}

	onInit(): void {
		// Allow the ui button to control the visibility of the Widget.
		this.widgetView.linkButton(this.uiButton);

		// Bind a callback to the button press.
		this.menuButton.onPress((state) => {
			this.contextMenu.show();
		});

		// Mount UI
		this.widgetView.mount(mountUI);

		/**
		 * We can also mount GuiBase instances like so:
		 * this.widgetView.mount(new Instance("Frame"), true);
		 */

		// Action callbacks
		this.action.onTrigger(() => {
			print("Action triggered!");
		});

		// Network Events
		network.clickEvent.connect(() => {
			// Play a sound
			this.playSFX(7153930903);

			// Recording API (undo/redo)
			const recording = this.record("Spawned Part");

			// Just an example. This pcall should never error
			const [s, e] = pcall(() => {
				const part = new Instance("Part", Workspace);
			});

			if (s) recording.commit();
			else recording.cancel();
		});

		// Selection changes
		this.onSelectionChanged((selected) => {
			print("Selection changed: ", ...selected);
		});
	}

	onStart(): void | Promise<void> {
		print("Plugin ready to go!");
	}

	onRender(dt: number): void {
		// Do something on render stepped.
	}

	onEnd(): void {
		warn("Plugin has been deactivated.");
	}
}
