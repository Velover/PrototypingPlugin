import { Vector2Tools } from "includes/tools/vector2_tools";

export type MouseMovedCallback<T extends GuiBase2d = GuiBase2d> = (
	scale: Vector2,
	gui_element: T,
) => void;

export default function ConvertMouseMoveToScale<
	T extends GuiBase2d = GuiBase2d,
>(callback: MouseMovedCallback<T>) {
	return (gui_element: T, x: number, y: number) => {
		const mouse_position = new Vector2(x, y);
		const absolute_position = gui_element.AbsolutePosition;
		const relative_position = mouse_position.sub(absolute_position);
		const absolute_size = gui_element.AbsoluteSize;
		callback(
			Vector2Tools.Clamp(relative_position.div(absolute_size), 0, 1),
			gui_element,
		);
	};
}
