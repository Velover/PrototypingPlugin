import React, { PropsWithChildren } from "@rbxts/react";
import { GuiState } from "gui/state_control/gui_state";

export default function DropDownButton({
	children,
	OnClick,
}: PropsWithChildren & { OnClick: () => void }) {
	return (
		<imagebutton
			Active={false}
			AutomaticSize={Enum.AutomaticSize.XY}
			BackgroundColor3={new Color3(0.145098, 0.145098, 0.145098)}
			BorderColor3={new Color3(0, 0, 0)}
			BorderSizePixel={0}
			Selectable={false}
			Event={{
				MouseButton1Click: () => {
					//hides the menu
					GuiState.drop_down_menu_visible(false);
					OnClick();
				},
			}}
		>
			{children}
		</imagebutton>
	);
}
