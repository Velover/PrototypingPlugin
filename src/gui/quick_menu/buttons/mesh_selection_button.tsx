import React, { useState } from "@rbxts/react";
import Button from "./button";
import ViewportMesh from "gui/extras/viewport_mesh";
import { Meshes } from "metadata/meshes";
import { useAtom } from "@rbxts/charm";
import { GuiState } from "gui/state_control/gui_state";
import { TableTools } from "includes/tools/table_tools";
import { ArrayTools } from "includes/tools/array_tools";
import { EDropDownMenuType } from "gui/drop_down_menu/drop_down_menu";
import SetDropDownMenuTypeOrToggle from "gui/extras/set_drop_down_menu_type";

export default function MeshSelectionButton() {
  const mesh = useAtom(GuiState.selected_mesh);
  return (
    <Button
      OnClick={(button) => {
        SetDropDownMenuTypeOrToggle(EDropDownMenuType.Meshes);
        GuiState.drop_down_menu_track_button(button);
        // GuiState.selected_mesh(ArrayTools.GetRandomElement(TableTools.GetKeys(Meshes.GetMeshes())))
      }}>
      <ViewportMesh mesh={mesh} />
    </Button>
  )
}