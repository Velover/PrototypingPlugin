import React from "@rbxts/react";
import DropDownButton from "gui/drop_down_menu/drop_down_button";
import TextureDisplay from "gui/extras/texture_display";
import { GuiState } from "gui/state_control/gui_state";
import { Textures } from "metadata/textures";

export default function DropDownTextureButton({
	texture,
	color,
}: {
	texture: Textures.ETexture;
	color: Textures.EColor;
}) {
	return (
		<DropDownButton
			OnClick={() => {
				GuiState.selected_texture(texture);
			}}
		>
			<frame
				BackgroundColor3={new Color3(0.145098, 0.145098, 0.145098)}
				BorderColor3={new Color3(0, 0, 0)}
				BorderSizePixel={0}
				Size={new UDim2(new UDim(0, 100), new UDim(0, 100))}
			>
				<TextureDisplay texture={texture} color={color} />
			</frame>
		</DropDownButton>
	);
}
