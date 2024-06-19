import { atom } from "@rbxts/charm";
import { EDropDownMenuType } from "gui/drop_down_menu/drop_down_menu";
import { Meshes } from "metadata/meshes";
import { Textures } from "metadata/textures";

export namespace GuiState {

  export const gui_visible = atom(false);
  export const drop_down_visible = atom(false);
  export const gui_position = atom(Vector2.zero);

  export const mouse_world_position = atom(Vector3.zero);

  export const selected_mesh = atom(Meshes.EMesh.box);
  export const selected_color = atom(Textures.EColor.Orange);
  export const selected_texture = atom(Textures.ETexture.Texture02);

  export const drop_down_menu_visible = atom(false);
  export const drop_down_menu_type = atom(EDropDownMenuType.Meshes);
  export const drop_down_menu_track_button = atom<ImageButton | undefined>(undefined);
}