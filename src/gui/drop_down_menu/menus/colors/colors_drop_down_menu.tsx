import React from "@rbxts/react";
import { EFillDirection } from "gui/drop_down_menu/drop_down_menu";
import SortByFillDirection from "gui/extras/SortByFillDirection";
import { Textures } from "metadata/textures";
import DropDownColorButton from "./drop_down_color_button";

export default function ColorDropDownMenu({
	fill_direction,
}: {
	fill_direction: EFillDirection;
}) {
	const colors = SortByFillDirection(Textures.GetColorKeys(), fill_direction);
	return (
		<>
			{colors.map((color, index) => (
				<DropDownColorButton color={color} key={index} />
			))}
		</>
	);
}
