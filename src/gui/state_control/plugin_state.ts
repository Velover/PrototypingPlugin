import { atom } from "@rbxts/charm";
import { PlguinGetter } from "plugin_getter";

export namespace PluginState {
  const plugin = PlguinGetter.GetPlugin();
  const plugin_active_save_name = "PluginActive"

  export const plugin_active = atom(<boolean>plugin.GetSetting(plugin_active_save_name) ?? true);
  export function SetPluginActive(value: boolean, save_to_settings: boolean = true) {
    if (plugin_active() === value) return;
    plugin_active(value);
    if (!save_to_settings) return;
    plugin.SetSetting(plugin_active_save_name, value);
  }
}