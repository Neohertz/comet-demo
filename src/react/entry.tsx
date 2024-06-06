import React, { Fragment, StrictMode } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import PluginUI from "./pluginUI";

export function mountUI(parent: Instance) {
	const root = createRoot(new Instance("Folder"));

	root.render(<StrictMode>{createPortal(<PluginUI />, parent)}</StrictMode>);

	return () => root.unmount();
}
