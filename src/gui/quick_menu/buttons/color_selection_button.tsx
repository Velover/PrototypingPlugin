import { useAtom } from "@rbxts/charm";
import React from "@rbxts/react";
import { EDropDownMenuType } from "gui/drop_down_menu/drop_down_menu";
import SetDropDownMenuTypeOrToggle from "gui/extras/set_drop_down_menu_type";
import { GuiState } from "gui/state_control/gui_state";
import { Textures } from "metadata/textures";
import Button from "./button";

export default function ColorSelectionButton() {
	const current_color = useAtom(GuiState.selected_color);
	const frame_color = Textures.GetColor(current_color);
	return (
		<Button
			OnClick={(button) => {
				SetDropDownMenuTypeOrToggle(EDropDownMenuType.Colors);
				GuiState.drop_down_menu_track_button(button);
			}}
		>
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={frame_color}
				BorderColor3={new Color3(0, 0, 0)}
				BorderSizePixel={0}
				Position={new UDim2(new UDim(0.5, 0), new UDim(0.5, 0))}
				Size={
					new UDim2(
						new UDim(0.8999999761581421, 0),
						new UDim(0.8999999761581421, 0),
					)
				}
			/>
		</Button>
	);
}
