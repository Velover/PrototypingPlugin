import React from "@rbxts/react";
import DropDownButton from "gui/drop_down_menu/drop_down_button";
import { GuiState } from "gui/state_control/gui_state";
import { Textures } from "metadata/textures";

export default function DropDownColorButton({ color }: { color: Textures.EColor }) {
  const background_color = Textures.GetColor(color);
  return (
    <DropDownButton OnClick={() => {
      GuiState.selected_color(color);
    }}>
      <frame
        BackgroundColor3={background_color}
        BorderColor3={new Color3(0, 0, 0)}
        BorderSizePixel={0}
        Size={new UDim2(new UDim(0, 50), new UDim(0, 50))} />
      <uicorner
        CornerRadius={new UDim(0, 5)} />
    </DropDownButton>
  )
}