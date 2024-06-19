import React, { useEffect, useRef } from "@rbxts/react";
import { Textures } from "metadata/textures";
import ConvertMouseMoveToScale, { MouseMovedCallback } from "./convert_mouse_move_to_scale";
import CallRefference from "./call_refference";

export default function TextureDisplay({ color, texture }: { color: Textures.EColor, texture: Textures.ETexture }) {
  const image = Textures.GetTexture(color, texture);

  const image_label_ref = useRef<ImageLabel>();
  const mouse_move_callback = useRef<MouseMovedCallback>();
  const mouse_left_callback = useRef<Callback>();
  useEffect(() => {
    if (image_label_ref.current === undefined) return;
    const image_label = image_label_ref.current;

    const zoom = 4;
    function SetScale(scale: Vector2, in_frame: boolean = true) {
      if (!in_frame) {
        image_label.ImageRectOffset = Vector2.zero;
        image_label.ImageRectSize = Vector2.zero;
        return;
      }

      const zoom_size = Textures.image_size.div(zoom);
      const max_size = Textures.image_size.sub(zoom_size);
      image_label.ImageRectSize = zoom_size;
      image_label.ImageRectOffset = max_size.mul(scale);
    }
    SetScale(Vector2.zero, false);
    mouse_move_callback.current = (scale) => {
      SetScale(scale);
    }

    mouse_left_callback.current = () => {
      SetScale(Vector2.zero, false);
    }

  }, []);
  return (
    <imagelabel
      ref={image_label_ref}
      AnchorPoint={new Vector2(0.5, 0.5)}
      BorderColor3={new Color3(0, 0, 0)}
      BorderSizePixel={0}
      BackgroundTransparency={1}
      Position={new UDim2(new UDim(0.5, 0), new UDim(0.5, 0))}
      Size={new UDim2(new UDim(0.8999999761581421, 0), new UDim(0.8999999761581421, 0))}
      Image={image}
      Event={
        {
          MouseMoved: ConvertMouseMoveToScale(CallRefference(mouse_move_callback)),
          MouseLeave: CallRefference(mouse_left_callback)
        }
      }
    />
  )
}