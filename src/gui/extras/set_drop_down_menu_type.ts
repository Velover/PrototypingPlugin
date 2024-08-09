import { EDropDownMenuType } from "gui/drop_down_menu/drop_down_menu";
import { GuiState } from "gui/state_control/gui_state";

export default function SetDropDownMenuTypeOrToggle(
	menu_type: EDropDownMenuType,
) {
	const current_menu_type = GuiState.drop_down_menu_type();
	if (current_menu_type === menu_type) {
		GuiState.drop_down_menu_visible(!GuiState.drop_down_menu_visible());
		return;
	}

	GuiState.drop_down_menu_type(menu_type);
	GuiState.drop_down_menu_visible(true);
}
