import { useAtom } from "@rbxts/charm";
import React from "@rbxts/react";
import { EFillDirection } from "gui/drop_down_menu/drop_down_menu";
import SortByFillDirection from "gui/extras/SortByFillDirection";
import { GuiState } from "gui/state_control/gui_state";
import { Textures } from "metadata/textures";
import DropDownTextureButton from "./drop_down_texture_button";

export default function TexturesDropDownMenu({ fill_direction }: { fill_direction: EFillDirection }) {
  const textures = SortByFillDirection(Textures.GetTextureKeys(), fill_direction);
  const color = useAtom(GuiState.selected_color);
  return (
    <>
      {textures.map((texture, index) => <DropDownTextureButton texture={texture} color={color} key={index} />)}
    </>
  )
}