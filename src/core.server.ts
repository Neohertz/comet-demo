import { Comet } from "@rbxts/comet";
import { MySystem } from "./systems/main";

Comet.createApp(plugin, "My Plugin");
//Comet.enableDebugging();
Comet.registerSystem(MySystem);
Comet.launch();
