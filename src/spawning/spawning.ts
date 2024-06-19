import { Workspace } from "@rbxts/services";
import { InstanceTools } from "includes/tools/instance_tools";
import { Meshes } from "metadata/meshes";
import { Textures } from "metadata/textures";

export namespace Spawning {
  const folder_name = "__Prototyping";
  function GetPrototypesFolder() {
    return Workspace.FindFirstChild(folder_name) ?? InstanceTools.Create("Folder", {
      Name: folder_name,
      Parent: Workspace
    });
  }
  const change_history_service = game.GetService("ChangeHistoryService");
  const selection = game.GetService('Selection');
  export function Spawn(position: Vector3,
    mesh: Meshes.EMesh, texture: Textures.ETexture, color: Textures.EColor) {
    const save = change_history_service.TryBeginRecording("Create part", "Create Prototype Part");
    if (save === undefined) {
      warn("Cannot start save");
      return;
    }

    //moves part with the model
    const model = new Instance("Model", GetPrototypesFolder());
    const mesh_part = Meshes.CreateMesh(mesh, model);
    model.MoveTo(position);
    mesh_part.Parent = GetPrototypesFolder();
    model.Destroy();

    const sides = Enum.NormalId.GetEnumItems();
    const texture_id = Textures.GetTexture(color, texture);
    sides.forEach(side => {
      //skips all textures if none selected;
      if (texture === Textures.ETexture.None) return;
      InstanceTools.Create("Texture", {
        StudsPerTileU: Textures.texture_scale,
        StudsPerTileV: Textures.texture_scale,
        Texture: texture_id,
        Face: side,
        Parent: mesh_part
      })
    })

    selection.Set([mesh_part]);
    change_history_service.FinishRecording(save, Enum.FinishRecordingOperation.Commit, undefined);
  }
}