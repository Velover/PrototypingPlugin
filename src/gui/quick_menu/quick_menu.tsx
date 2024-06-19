import React, { useEffect, useRef, useState } from "@rbxts/react";
import Button from "./buttons/button";
import { Workspace } from "@rbxts/services";
import AddButton from "./buttons/add_button";
import MeshSelectionButton from "./buttons/mesh_selection_button";
import ColorSelectionButton from "./buttons/color_selection_button";
import TextureSelectionButton from "./buttons/texture_selection_button";

export default function QuickMenu({ position }: { position: UDim2 }) {
  const frame_ref = useRef<Frame>();
  const [anchor_point, SetAchorPoint] = useState(Vector2.zero);
  useEffect(() => {
    SetAchorPoint(Vector2.zero);
    if (frame_ref.current === undefined) return;
    const frame = frame_ref.current;
    const viewport_size = Workspace.CurrentCamera!.ViewportSize;
    const vector_position = new Vector2(position.X.Offset, position.Y.Offset);
    const absolute_size = frame.AbsoluteSize;

    // calculates the offset and uses math.max on X and Y with 0, 0 to calculate offset behind the viewport
    const offset = vector_position.add(absolute_size).sub(viewport_size);
    SetAchorPoint(new Vector2(
      offset.X > 0 ? 1 : 0,
      offset.Y > 0 ? 1 : 0
    ))
  }, [position]);

  return (
    <frame
      ref={frame_ref}
      AutomaticSize={Enum.AutomaticSize.X}
      BackgroundColor3={new Color3(0.180392, 0.180392, 0.180392)}
      BorderColor3={new Color3(0, 0, 0)}
      BorderSizePixel={0}
      AnchorPoint={anchor_point}
      Position={position}
      Size={new UDim2(new UDim(0, 0), new UDim(0, 70))}
    >
      <uicorner
        CornerRadius={new UDim(0, 5)} />
      <uilistlayout
        FillDirection={Enum.FillDirection.Horizontal}
        HorizontalAlignment={Enum.HorizontalAlignment.Center}
        SortOrder={Enum.SortOrder.LayoutOrder}
        Padding={new UDim(0, 10)} />
      <uipadding
        PaddingBottom={new UDim(0, 5)}
        PaddingLeft={new UDim(0, 5)}
        PaddingRight={new UDim(0, 5)}
        PaddingTop={new UDim(0, 5)} />

      <AddButton key="AddButton" />
      <MeshSelectionButton />
      <ColorSelectionButton />
      <TextureSelectionButton />
    </frame>
  )
}