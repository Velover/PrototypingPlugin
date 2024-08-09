import { PlguinGetter } from "plugin_getter";

const plguin = PlguinGetter.GetPlugin();
export const toolbar = plguin.CreateToolbar("Prototype");
