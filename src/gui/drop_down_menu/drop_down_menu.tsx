import { useAtom } from "@rbxts/charm";
import React, { useEffect, useRef, useState } from "@rbxts/react";
import { GuiState } from "gui/state_control/gui_state";
import { FunctionTools } from "includes/tools/function_tools";
import ColorDropDownMenu from "./menus/colors/colors_drop_down_menu";
import MeshDropDownMenu from "./menus/meshes/mesh_drop_down_menu";
import TexturesDropDownMenu from "./menus/textures/textures_drop_down_menu";

export const enum EDropDownMenuType {
	Meshes,
	Colors,
	Textures,
}

export const enum EFillDirection {
	Top,
	Bottom,
}

export default function DropDownMenu() {
	const drop_menu_type = useAtom(GuiState.drop_down_menu_type);

	const track_button = useAtom(GuiState.drop_down_menu_track_button);
	const [position, SetPosition] = useState(new UDim2());
	const [fill_dirrection, SetFillDirection] = useState(EFillDirection.Bottom);
	const [size, SetSize] = useState(new UDim2());
	const [anchor_point, SetAnchorPoint] = useState(new Vector2(0.5, 0));
	const [canvas_position, SetCanvasPosition] = useState(Vector2.zero);

	const scrolling_frame_ref = useRef<ScrollingFrame>();

	useEffect(() => {
		if (track_button === undefined) return;
		if (scrolling_frame_ref.current === undefined) return;

		const scrolling_frame = scrolling_frame_ref.current;
		const absolute_position = track_button.AbsolutePosition;
		const absolute_size = track_button.AbsoluteSize;

		const top = absolute_position.add(absolute_size.mul(new Vector2(0.5, 0)));
		const bottom = absolute_position.add(
			absolute_size.mul(new Vector2(0.5, 1)),
		);

		//sets the size to 0 to measure the canvas size
		const stored_size = scrolling_frame.Size;
		scrolling_frame.Size = new UDim2();

		const max_y_size = 300;
		//uses canvas size Y to track the max size Y;
		//ui size constraint doesnt work
		const expected_size_y = math.min(
			scrolling_frame.AbsoluteCanvasSize.Y,
			max_y_size,
		);
		const offset_from_bottom = absolute_position.Y - expected_size_y;
		scrolling_frame.Size = stored_size;

		SetSize(UDim2.fromOffset(0, expected_size_y));
		const fill_direction =
			offset_from_bottom < 0 ? EFillDirection.Top : EFillDirection.Bottom;
		SetFillDirection(fill_direction);
		const top_position = UDim2.fromOffset(top.X, top.Y);
		const bottom_position = UDim2.fromOffset(bottom.X, bottom.Y);

		SetPosition(
			fill_direction === EFillDirection.Top ? bottom_position : top_position,
		);
		SetAnchorPoint(
			fill_direction === EFillDirection.Top
				? new Vector2(0.5, 0)
				: new Vector2(0.5, 1),
		);

		const canvas_size_y_vector = new Vector2(
			0,
			scrolling_frame.AbsoluteCanvasSize.Y,
		);
		SetCanvasPosition(
			fill_direction === EFillDirection.Bottom
				? canvas_size_y_vector
				: Vector2.zero,
		);
	}, [track_button]);

	return (
		<scrollingframe
			ref={scrolling_frame_ref}
			Position={position}
			CanvasPosition={canvas_position}
			AnchorPoint={anchor_point}
			Size={size}
			SelectionGroup={false}
			AutomaticSize={Enum.AutomaticSize.X}
			BackgroundColor3={new Color3(0.180392, 0.180392, 0.180392)}
			BorderColor3={new Color3(0, 0, 0)}
			BorderSizePixel={0}
			Selectable={false}
			AutomaticCanvasSize={Enum.AutomaticSize.Y}
			CanvasSize={new UDim2(new UDim(0, 0), new UDim(0, 0))}
			ScrollBarImageColor3={new Color3(0, 0, 0)}
			ScrollBarThickness={5}
			ScrollingDirection={Enum.ScrollingDirection.Y}
			VerticalScrollBarInset={Enum.ScrollBarInset.ScrollBar}
		>
			<uicorner CornerRadius={new UDim(0, 5)} />
			<uilistlayout
				HorizontalAlignment={Enum.HorizontalAlignment.Center}
				SortOrder={Enum.SortOrder.LayoutOrder}
				Padding={new UDim(0, 5)}
			/>
			{FunctionTools.SwitchValueIfEquals(
				drop_menu_type,
				[
					EDropDownMenuType.Meshes,
					EDropDownMenuType.Colors,
					EDropDownMenuType.Textures,
				],
				[
					<MeshDropDownMenu fill_direction={fill_dirrection} />,
					<ColorDropDownMenu fill_direction={fill_dirrection} />,
					<TexturesDropDownMenu fill_direction={fill_dirrection} />,
				],
				undefined,
			)}
		</scrollingframe>
	);
}
