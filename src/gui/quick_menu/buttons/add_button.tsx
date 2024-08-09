import React from "@rbxts/react";
import { GuiState } from "gui/state_control/gui_state";
import { Spawning } from "spawning/spawning";
import Button from "./button";

export default function AddButton() {
	return (
		<Button
			OnClick={() => {
				GuiState.gui_visible(false);
				GuiState.drop_down_menu_visible(false);
				Spawning.Spawn(
					GuiState.mouse_world_position(),
					GuiState.selected_mesh(),
					GuiState.selected_texture(),
					GuiState.selected_color(),
				);
			}}
		>
			<imagelabel
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={new Color3(1, 1, 1)}
				BackgroundTransparency={1}
				BorderColor3={new Color3(0, 0, 0)}
				BorderSizePixel={0}
				Position={new UDim2(new UDim(0.5, 0), new UDim(0.5, 0))}
				Size={new UDim2(new UDim(0.5, 0), new UDim(0.5, 0))}
				Image={"rbxassetid://17897250729"}
			/>
		</Button>
	);
}
