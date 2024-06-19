import { subscribe } from "@rbxts/charm";
import { GuiState } from "./gui_state";
import { Meshes } from "metadata/meshes";
import { Textures } from "metadata/textures";

subscribe(GuiState.selected_mesh, (mesh) => {
  Meshes.SetRecentMeshKey(mesh);
  plugin.SetSetting(mesh_save_name, mesh);
})
subscribe(GuiState.selected_color, (color) => {
  Textures.SetRecentColorKey(color);
  plugin.SetSetting(color_save_name, color);
})
subscribe(GuiState.selected_texture, (texture) => {
  Textures.SetRecentTextureKey(texture);
  plugin.SetSetting(texture_save_name, texture);
})

const mesh_save_name = "SavedMesh";
const color_save_name = "SavedColor";
const texture_save_name = "SavedTexture";

GuiState.selected_mesh(<Meshes.EMesh>plugin.GetSetting(mesh_save_name) ?? Meshes.EMesh.box);
GuiState.selected_color(<Textures.EColor>plugin.GetSetting(color_save_name) ?? Textures.EColor.Orange);
GuiState.selected_texture(<Textures.ETexture>plugin.GetSetting(texture_save_name) ?? Textures.ETexture.Texture02);
