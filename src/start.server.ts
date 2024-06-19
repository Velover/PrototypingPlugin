import { PlguinGetter } from "plugin_getter";

PlguinGetter.SetPlugin(plugin);

//small hardcoded way of reinabling the plugin, if focus lost plugin deactivates itself
//if plugin is not active mouse will not work;
plugin.Activate(true);
//reactivates the plugin
plugin.Deactivation.Connect(() => {
  plugin.Activate(true);
})
