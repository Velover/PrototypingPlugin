//!native
import React, { useEffect, useRef } from "@rbxts/react";
import { InstanceTools } from "includes/tools/instance_tools";
import { Meshes } from "metadata/meshes";
import ConvertMouseMoveToScale, { MouseMovedCallback } from "./convert_mouse_move_to_scale";
import CallRefference from "./call_refference";
import { useAsyncEffect } from "@rbxts/pretty-react-hooks";
import Maid from "@rbxts/maid";

const tau = math.pi * 2;
export default function ViewportMesh(
  { mesh, size = UDim2.fromScale(1, 1) }:
    { mesh: Meshes.EMesh, size?: UDim2 }) {

  const mesh_data = Meshes.GetMeshData(mesh);
  const viewport_frame_ref = useRef<ViewportFrame>();

  const mouse_move_callback = useRef<MouseMovedCallback>();
  const mouse_left_callback = useRef<Callback>();

  const maid_ref = useRef<Maid>();

  useAsyncEffect(async () => {
    if (viewport_frame_ref.current === undefined) return;
    const maid = new Maid();
    maid_ref.current = maid;

    const model = new Instance("Model");
    maid.GiveTask(model);

    const mesh_part = Meshes.CreateMesh(mesh_data.key, model);
    mesh_part.DoubleSided = true;

    model.Parent = viewport_frame_ref.current;
    model.PivotTo(CFrame.identity);

    const [_, size] = model.GetBoundingBox();
    const longest_side = math.max(size.X, size.Y, size.Z);
    //adds 40% to the longest side
    const offset = longest_side * .40;

    const camera = InstanceTools.Create("Camera", {
      Focus: CFrame.identity
    })
    maid.GiveTask(camera);
    viewport_frame_ref.current.CurrentCamera = camera;

    function SetCameraAngle(scale: Vector2) {
      const yaw = -scale.Y * tau;
      const pitch = scale.X * tau;
      const distance = longest_side + offset
      const camera_cframe = new CFrame(0, 0, -distance).mul(CFrame.fromOrientation(0, -math.pi, 0));
      camera.CFrame = CFrame.fromOrientation(yaw, pitch, 0).mul(camera_cframe);
    }

    SetCameraAngle(new Vector2(-.1, -1 / 16));
    mouse_left_callback.current = () => {
      SetCameraAngle(new Vector2(-.1, -1 / 16));
    }
    mouse_move_callback.current = (scale) => {
      SetCameraAngle(scale.sub(Vector2.one.mul(.5)));
    }
  }, [mesh]);

  //async effect doesnt use on unmount
  useEffect(() => {
    return () => {
      maid_ref.current?.DoCleaning();
      maid_ref.current?.Destroy();
    }
  }, [mesh]);

  return (
    <viewportframe
      ref={viewport_frame_ref}
      BackgroundColor3={new Color3(1, 1, 1)}
      BackgroundTransparency={1}
      BorderColor3={new Color3(0, 0, 0)}
      Ambient={new Color3(0.729412, 0.729412, 0.729412)}
      LightColor={new Color3(1, 1, 1)}
      LightDirection={new Vector3(1, -1, 1)}
      BorderSizePixel={0}
      Size={size}
      Event={
        {
          MouseLeave: CallRefference(mouse_left_callback),
          MouseMoved: ConvertMouseMoveToScale(CallRefference(mouse_move_callback))
        }
      } />
  )
}