import React, { StrictMode, useEffect, useState } from "@rbxts/react";
import { createPortal, createRoot } from "@rbxts/react-roblox";
import { toolbar } from "toolbar";
import { GuiState } from "./state_control/gui_state";
import { useAtom } from "@rbxts/charm";
import { useEventListener, useKeyPress } from "@rbxts/pretty-react-hooks";
import QuickMenu from "./quick_menu/quick_menu";
import { ArrayTools } from "includes/tools/array_tools";
import { PluginState } from "./state_control/plugin_state";
import { CleanUp } from "cleaning/clean_up";
import { Players, Workspace } from "@rbxts/services";
import DropDownMenu from "./drop_down_menu/drop_down_menu";

const button = toolbar.CreateButton("TogglePlugin", "Activate", "rbxassetid://18111302308", "Shift+F");
//initialize;
button.SetActive(PluginState.plugin_active());
function UpdatePlugin() {
  const new_active = !PluginState.plugin_active();
  button.SetActive(new_active);
  GuiState.gui_visible(false);
  PluginState.SetPluginActive(new_active);
}
button.Click.Connect(UpdatePlugin);

const max_no_target_distance = 100;
function GetMouseWorldPosition() {
  const target = mouse.Target;
  if (target !== undefined) return mouse.Hit.Position;

  const camera_position = Workspace.CurrentCamera!.CFrame.Position;
  const direction = mouse.Hit.Position.sub(camera_position).Unit;
  return camera_position.add(direction.mul(max_no_target_distance));
}

const mouse = Players.LocalPlayer.GetMouse();
function Content({ gui_ref }: { gui_ref: React.MutableRefObject<ScreenGui | undefined> }) {
  const [menu_position, SetMenuPosition] = useState(new UDim2());
  const menu_visible = useAtom(GuiState.gui_visible);
  const drop_down_menu_visible = useAtom(GuiState.drop_down_menu_visible);

  const open_menu = useKeyPress(["LeftShift+F"], { actionName: "OpenMenu" });
  useEffect(() => {
    if (!open_menu) return;
    const mouse_position = UDim2.fromOffset(mouse.X, mouse.Y);

    GuiState.gui_visible(true);
    GuiState.drop_down_menu_visible(false);
    GuiState.drop_down_menu_track_button(undefined);

    const mouse_world_position = GetMouseWorldPosition();
    GuiState.mouse_world_position(mouse_world_position);

    SetMenuPosition(mouse_position);
  }, [open_menu]);


  useEventListener(mouse.Button1Down, () => {
    if (gui_ref.current === undefined) return;
    const objects = core_gui.GetGuiObjectsAtPosition(mouse.X, mouse.Y);
    const on_gui = ArrayTools.IncludesOneOf(objects, gui_ref.current.GetDescendants());
    if (on_gui) return;

    GuiState.gui_visible(false);
    GuiState.drop_down_menu_track_button(undefined);
    GuiState.drop_down_menu_visible(false);
  }, {
    connected: menu_visible
  })

  return (
    <>
      {menu_visible ? <QuickMenu key={"QuickMenu"} position={menu_position} /> : undefined}
      {drop_down_menu_visible ? <DropDownMenu key={"DropDownMenu"} /> : undefined}
    </>
  )
}

function App() {
  const plugin_active = useAtom(PluginState.plugin_active);
  const gui_ref = CleanUp.useInstanceRefWithCleanUp<ScreenGui>();
  return (
    <screengui
      ref={gui_ref}
      ZIndexBehavior={Enum.ZIndexBehavior.Sibling}>
      {plugin_active ? <Content gui_ref={gui_ref} /> : undefined}
    </screengui>
  )
}

const root = createRoot(new Instance("Folder"));
const core_gui = game.GetService("CoreGui");
root.render(<StrictMode>
  {createPortal(<App />, core_gui)}
</StrictMode>)