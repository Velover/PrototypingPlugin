import React, { PropsWithChildren } from "@rbxts/react";

function NonImplementedCallback() {
  warn("Not implemented");
}

export default function Button(
  { children, OnClick = NonImplementedCallback, }:
    PropsWithChildren & { OnClick?: (button: ImageButton) => void }) {
  return (
    <imagebutton
      BackgroundColor3={new Color3(0.145098, 0.145098, 0.145098)}
      BorderColor3={new Color3(0, 0, 0)}
      BorderSizePixel={0}
      Size={new UDim2(new UDim(1, 0), new UDim(1, 0))}
      Event={
        {
          MouseButton1Click: OnClick,
        }
      }>
      <uiaspectratioconstraint />
      <uicorner
        CornerRadius={new UDim(0, 5)} />
      {children}
    </imagebutton>
  )
}