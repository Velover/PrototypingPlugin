import React from "@rbxts/react";
import DropDownButton from "gui/drop_down_menu/drop_down_button";
import ViewportMesh from "gui/extras/viewport_mesh";
import { GuiState } from "gui/state_control/gui_state";
import { Meshes } from "metadata/meshes";

export default function DropDownMeshButton({ mesh }: { mesh: Meshes.EMesh }) {
  const mesh_name = Meshes.GetMeshData(mesh).name;
  return (
    <DropDownButton
      OnClick={() => {
        GuiState.selected_mesh(mesh);
      }}
    >
      <frame
        BackgroundColor3={new Color3(1, 1, 1)}
        BackgroundTransparency={1}
        BorderColor3={new Color3(0, 0, 0)}
        BorderSizePixel={0}
        Size={new UDim2(new UDim(0, 100), new UDim(0, 100))}
      >
        <ViewportMesh mesh={mesh} />
        <textlabel
          AnchorPoint={new Vector2(0, 1)}
          AutomaticSize={Enum.AutomaticSize.Y}
          BackgroundColor3={new Color3(1, 1, 1)}
          BackgroundTransparency={1}
          BorderColor3={new Color3(0, 0, 0)}
          BorderSizePixel={0}
          Position={new UDim2(new UDim(0, 0), new UDim(1, 0))}
          Size={new UDim2(new UDim(1, 0), new UDim(0, 20))}
          FontFace={new Font("rbxasset://fonts/families/RobotoMono.json", Enum.FontWeight.SemiBold, Enum.FontStyle.Normal)}
          RichText={true}
          Text={mesh_name}
          TextColor3={new Color3(1, 1, 1)}
          TextSize={12}
          TextWrapped={true} />
      </frame>
    </DropDownButton>

  )
}