import { CleanUp } from "cleaning/clean_up";

export namespace PlguinGetter {
	let plugin: Plugin;
	export function SetPlugin(plugin_: Plugin) {
		plugin = plugin_;
		Initialize();
	}

	export function GetPlugin() {
		while (plugin === undefined) {
			task.wait();
		}
		return plugin;
	}

	function Initialize() {
		plugin.Activate(true);

		plugin.Unloading.Connect(() => {
			print("Unloading");
			CleanUp.DoCleaning();
		});
	}
}
