import React from "@rbxts/react"
import { Meshes } from "metadata/meshes"
import DropDownMeshButton from "./drop_down_mesh_button";
import { EFillDirection } from "gui/drop_down_menu/drop_down_menu";
import SortByFillDirection from "gui/extras/SortByFillDirection";

export default function MeshDropDownMenu({ fill_direction }: { fill_direction: EFillDirection }) {
  //reverses lost 
  const meshes = SortByFillDirection(Meshes.GetMeshKeys(), fill_direction);
  return (
    <>
      {
        meshes.map((mesh, index) => <DropDownMeshButton mesh={mesh} key={index} />)
      }
    </>
  )
}