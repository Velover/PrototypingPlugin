import { useAtom } from "@rbxts/charm";
import React from "@rbxts/react";
import { EDropDownMenuType } from "gui/drop_down_menu/drop_down_menu";
import SetDropDownMenuTypeOrToggle from "gui/extras/set_drop_down_menu_type";
import TextureDisplay from "gui/extras/texture_display";
import { GuiState } from "gui/state_control/gui_state";
import Button from "./button";

export default function TextureSelectionButton() {
	const color = useAtom(GuiState.selected_color);
	const texture = useAtom(GuiState.selected_texture);
	return (
		<Button
			OnClick={(button) => {
				SetDropDownMenuTypeOrToggle(EDropDownMenuType.Textures);
				GuiState.drop_down_menu_track_button(button);
			}}
		>
			{/* TODO use only the dark gray color in preview, otherwise the texture is not visible */}
			<TextureDisplay color={color} texture={texture} />
		</Button>
	);
}
