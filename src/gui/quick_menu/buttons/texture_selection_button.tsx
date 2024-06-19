import { useAtom } from "@rbxts/charm";
import React from "@rbxts/react";
import { GuiState } from "gui/state_control/gui_state";
import Button from "./button";
import TextureDisplay from "gui/extras/texture_display";
import { EDropDownMenuType } from "gui/drop_down_menu/drop_down_menu";
import SetDropDownMenuTypeOrToggle from "gui/extras/set_drop_down_menu_type";

export default function TextureSelectionButton() {
  const color = useAtom(GuiState.selected_color);
  const texture = useAtom(GuiState.selected_texture);
  return (
    <Button
      OnClick={
        (button) => {
          SetDropDownMenuTypeOrToggle(EDropDownMenuType.Textures);
          GuiState.drop_down_menu_track_button(button);
        }
      }>
      {/* FIXME switch some textures because then all in order */}
      <TextureDisplay color={color} texture={texture} />
    </Button>
  )
}