import { AssetService } from "@rbxts/services";
import { ArrayTools } from "includes/tools/array_tools";
import { TableTools } from "includes/tools/table_tools";

export namespace Meshes {
  export function GetMeshes() {
    return meshes;
  }

  export function GetMeshData(mesh: EMesh) {
    return meshes.get(mesh)!;
  }

  export function CreateMesh(mesh: EMesh, parent?: Instance) {
    const mesh_data = GetMeshData(mesh);
    const mesh_part = AssetService.CreateMeshPartAsync(mesh_data.mesh_id);
    mesh_part.Anchored = true;
    mesh_part.Size = mesh_data.size;
    mesh_part.Parent = parent;
    return mesh_part
  }

  export interface IMesh {
    readonly name: string,
    readonly mesh_id: string,
    readonly size: Vector3
    readonly key: EMesh
  }

  export const enum EMesh {
    wall_window,
    fence_wood,
    fence3,
    ladder,
    ladder1,
    wall_corner_top1,
    wall_window1,
    fence,
    stairs_corner1,
    stairs1,
    stairs2,
    wall_corner_top,
    wall_corner_bottom1,
    wall_door1,
    fence2,
    stairs_corner,
    wall_corner1,
    wall_corner_bottom2,
    wall_door,
    wall1,
    coin,
    cube7,
    fence_edge,
    railing_edge,
    ramp,
    ramp1,
    stairs,
    spike,
    spikes_big,
    spikes_small,
    toggle_switch,
    wall,
    wall_corner_bottom,
    wall_door2,
    cube5,
    key,
    railing,
    arrow,
    door,
    door2,
    wall_corner,
    wall_corner4,
    cube8,
    cube9,
    window,
    box,
    ground1,
    cube6,
    door1,
    window1,
    cube,
    cube4,
    door3,
    pillar,
    ground,
    pillar1,
    cone,
    cone1,
    cone2,
    pillar2,
    pillar3,
    pillar4,
    ground_corner,
    cone3,
    cone4,
    torus,
    cylinder,
    cylinder1,
    cylinder2,
    cylinder3,
    cylinder4,
    cylinder5,
    sphere,
    sphere1,
    sphere2,
  }

  const meshes = new Map<EMesh, IMesh>([
    [EMesh.wall_window, {
      name: "wall_window",
      mesh_id: "rbxassetid://17821202464",
      size: new Vector3(12.000, 12.000, 3.000),
      key: EMesh.wall_window
    }],
    [EMesh.fence_wood, {
      name: "fence_wood",
      mesh_id: "rbxassetid://17821212246",
      size: new Vector3(1.218, 6.000, 1.500),
      key: EMesh.fence_wood
    }],
    [EMesh.fence3, {
      name: "fence3",
      mesh_id: "rbxassetid://17821211692",
      size: new Vector3(11.400, 4.200, 0.900),
      key: EMesh.fence3
    }],
    [EMesh.ladder, {
      name: "ladder",
      mesh_id: "rbxassetid://17821210636",
      size: new Vector3(6.000, 6.000, 0.600),
      key: EMesh.ladder
    }],
    [EMesh.ladder1, {
      name: "ladder1",
      mesh_id: "rbxassetid://17821210435",
      size: new Vector3(6.000, 12.000, 0.600),
      key: EMesh.ladder1
    }],
    [EMesh.wall_corner_top1, {
      name: "wall_corner_top1",
      mesh_id: "rbxassetid://17821204331",
      size: new Vector3(12.000, 12.000, 12.000),
      key: EMesh.wall_corner_top1
    }],
    [EMesh.wall_window1, {
      name: "wall_window1",
      mesh_id: "rbxassetid://17821202124",
      size: new Vector3(12.000, 12.000, 3.000),
      key: EMesh.wall_window1
    }],
    [EMesh.fence, {
      name: "fence",
      mesh_id: "rbxassetid://17821212064",
      size: new Vector3(12.009, 6.000, 1.500),
      key: EMesh.fence
    }],
    [EMesh.stairs_corner1, {
      name: "stairs_corner1",
      mesh_id: "rbxassetid://17821206782",
      size: new Vector3(6.000, 6.000, 6.000),
      key: EMesh.stairs_corner1
    }],
    [EMesh.stairs1, {
      name: "stairs1",
      mesh_id: "rbxassetid://17821206139",
      size: new Vector3(6.000, 3.000, 6.000),
      key: EMesh.stairs1
    }],
    [EMesh.stairs2, {
      name: "stairs2",
      mesh_id: "rbxassetid://17821205743",
      size: new Vector3(6.000, 6.000, 6.000),
      key: EMesh.stairs2
    }],
    [EMesh.wall_corner_top, {
      name: "wall_corne_top",
      mesh_id: "rbxassetid://17821204514",
      size: new Vector3(12.000, 12.000, 12.000),
      key: EMesh.wall_corner_top
    }],
    [EMesh.wall_corner_bottom1, {
      name: "wall_corner_bottom1",
      mesh_id: "rbxassetid://17821204908",
      size: new Vector3(12.000, 12.000, 12.000),
      key: EMesh.wall_corner_bottom1
    }],
    [EMesh.wall_door1, {
      name: "wall_door1",
      mesh_id: "rbxassetid://17821202998",
      size: new Vector3(12.000, 12.038, 3.000),
      key: EMesh.wall_door1
    }],
    [EMesh.fence2, {
      name: "fence2",
      mesh_id: "rbxassetid://17821211899",
      size: new Vector3(12.018, 6.000, 1.500),
      key: EMesh.fence2
    }],
    [EMesh.stairs_corner, {
      name: "stairs_corner",
      mesh_id: "rbxassetid://17821206921",
      size: new Vector3(6.000, 6.000, 6.000),
      key: EMesh.stairs_corner
    }],
    [EMesh.wall_corner1, {
      name: "wall_corner1",
      mesh_id: "rbxassetid://17821203763",
      size: new Vector3(12.000, 12.000, 12.000),
      key: EMesh.wall_corner1
    }],
    [EMesh.wall_corner_bottom2, {
      name: "wall_corner_bottom2",
      mesh_id: "rbxassetid://17821204735",
      size: new Vector3(12.000, 12.000, 12.000),
      key: EMesh.wall_corner_bottom2
    }],
    [EMesh.wall_door, {
      name: "wall_door",
      mesh_id: "rbxassetid://17821203208",
      size: new Vector3(12.000, 12.000, 3.000),
      key: EMesh.wall_door
    }],
    [EMesh.wall1, {
      name: "wall1",
      mesh_id: "rbxassetid://17821201617",
      size: new Vector3(12.000, 12.000, 0.001),
      key: EMesh.wall1
    }],
    [EMesh.coin, {
      name: "coin",
      mesh_id: "rbxassetid://17821217073",
      size: new Vector3(2.287, 2.641, 0.466),
      key: EMesh.coin
    }],
    [EMesh.cube7, {
      name: "cube7",
      mesh_id: "rbxassetid://17821214951",
      size: new Vector3(6.000, 3.000, 6.000),
      key: EMesh.cube7
    }],
    [EMesh.fence_edge, {
      name: "fence_edge",
      mesh_id: "rbxassetid://17821212497",
      size: new Vector3(12.009, 6.000, 13.209),
      key: EMesh.fence_edge
    }],
    [EMesh.railing_edge, {
      name: "railing_edge",
      mesh_id: "rbxassetid://17821209384",
      size: new Vector3(12.000, 6.000, 12.000),
      key: EMesh.railing_edge
    }],
    [EMesh.ramp, {
      name: "ramp",
      mesh_id: "rbxassetid://17821208849",
      size: new Vector3(6.000, 6.000, 6.000),
      key: EMesh.ramp
    }],
    [EMesh.ramp1, {
      name: "ramp1",
      mesh_id: "rbxassetid://17821208630",
      size: new Vector3(6.000, 3.000, 6.000),
      key: EMesh.ramp1
    }],
    [EMesh.stairs, {
      name: "stairs",
      mesh_id: "rbxassetid://17821206505",
      size: new Vector3(6.000, 6.000, 6.000),
      key: EMesh.stairs
    }],
    [EMesh.spike, {
      name: "spike",
      mesh_id: "rbxassetid://17821207586",
      size: new Vector3(0.264, 1.197, 0.264),
      key: EMesh.spike
    }],
    [EMesh.spikes_big, {
      name: "spikes_big",
      mesh_id: "rbxassetid://17821207280",
      size: new Vector3(0.864, 2.697, 0.864),
      key: EMesh.spikes_big
    }],
    [EMesh.spikes_small, {
      name: "spikes_small",
      mesh_id: "rbxassetid://17821207093",
      size: new Vector3(0.864, 1.197, 0.864),
      key: EMesh.spikes_small
    }],
    [EMesh.toggle_switch, {
      name: "toggle_switch",
      mesh_id: "rbxassetid://17821205402",
      size: new Vector3(0.707, 0.649, 0.707),
      key: EMesh.toggle_switch
    }],
    [EMesh.wall, {
      name: "wall",
      mesh_id: "rbxassetid://17821201839",
      size: new Vector3(12.000, 12.000, 3.000),
      key: EMesh.wall
    }],
    [EMesh.wall_corner_bottom, {
      name: "wall_corner_bottom",
      mesh_id: "rbxassetid://17821205090",
      size: new Vector3(12.000, 12.000, 12.000),
      key: EMesh.wall_corner_bottom
    }],
    [EMesh.wall_door2, {
      name: "wall_door2",
      mesh_id: "rbxassetid://17821202695",
      size: new Vector3(12.000, 12.038, 7.683),
      key: EMesh.wall_door2
    }],
    [EMesh.cube5, {
      name: "cube5",
      mesh_id: "rbxassetid://17821215207",
      size: new Vector3(6.000, 1.500, 6.000),
      key: EMesh.cube5
    }],
    [EMesh.key, {
      name: "key",
      mesh_id: "rbxassetid://17821210835",
      size: new Vector3(2.635, 1.327, 0.230),
      key: EMesh.key
    }],
    [EMesh.railing, {
      name: "railing",
      mesh_id: "rbxassetid://17821209009",
      size: new Vector3(12.000, 6.000, 1.500),
      key: EMesh.railing
    }],
    [EMesh.arrow, {
      name: "arrow",
      mesh_id: "rbxassetid://17821217357",
      size: new Vector3(3.000, 4.950, 0.900),
      key: EMesh.arrow
    }],
    [EMesh.door, {
      name: "door",
      mesh_id: "rbxassetid://17821213366",
      size: new Vector3(6.000, 6.000, 3.000),
      key: EMesh.door
    }],
    [EMesh.door2, {
      name: "door2",
      mesh_id: "rbxassetid://17821212947",
      size: new Vector3(6.000, 9.000, 3.000),
      key: EMesh.door2
    }],
    [EMesh.wall_corner, {
      name: "wall_corner",
      mesh_id: "rbxassetid://17821204070",
      size: new Vector3(12.000, 12.000, 12.000),
      key: EMesh.wall_corner
    }],
    [EMesh.wall_corner4, {
      name: "wall_corner4",
      mesh_id: "rbxassetid://17821203552",
      size: new Vector3(12.000, 3.000, 12.000),
      key: EMesh.wall_corner4
    }],
    [EMesh.cube8, {
      name: "cube8",
      mesh_id: "rbxassetid://17821214784",
      size: new Vector3(6.000, 6.000, 3.000),
      key: EMesh.cube8
    }],
    [EMesh.cube9, {
      name: "cube9",
      mesh_id: "rbxassetid://17821214621",
      size: new Vector3(6.000, 6.000, 6.000),
      key: EMesh.cube9
    }],
    [EMesh.window, {
      name: "window",
      mesh_id: "rbxassetid://17821201474",
      size: new Vector3(6.000, 6.000, 3.000),
      key: EMesh.window
    }],
    [EMesh.box, {
      name: "box",
      mesh_id: "rbxassetid://17821217180",
      size: new Vector3(6.000, 6.000, 6.000),
      key: EMesh.box
    }],
    [EMesh.ground1, {
      name: "ground1",
      mesh_id: "rbxassetid://17821210996",
      size: new Vector3(9.000, 0.001, 9.000),
      key: EMesh.ground1
    }],
    [EMesh.cube6, {
      name: "cube6",
      mesh_id: "rbxassetid://17821215121",
      size: new Vector3(6.000, 6.000, 1.500),
      key: EMesh.cube6
    }],
    [EMesh.door1, {
      name: "door1",
      mesh_id: "rbxassetid://17821213122",
      size: new Vector3(6.000, 6.000, 1.500),
      key: EMesh.door1
    }],
    [EMesh.window1, {
      name: "window1",
      mesh_id: "rbxassetid://17821201321",
      size: new Vector3(6.000, 6.000, 1.500),
      key: EMesh.window1
    }],
    [EMesh.cube, {
      name: "cube",
      mesh_id: "rbxassetid://17821215499",
      size: new Vector3(6.000, 6.000, 6.000),
      key: EMesh.cube
    }],
    [EMesh.cube4, {
      name: "cube4",
      mesh_id: "rbxassetid://17821215352",
      size: new Vector3(6.000, 6.000, 6.000),
      key: EMesh.cube4
    }],
    [EMesh.door3, {
      name: "door3",
      mesh_id: "rbxassetid://17821212632",
      size: new Vector3(6.000, 9.000, 1.500),
      key: EMesh.door3
    }],
    [EMesh.pillar, {
      name: "pillar",
      mesh_id: "rbxassetid://17821210241",
      size: new Vector3(3.000, 6.000, 3.000),
      key: EMesh.pillar
    }],
    [EMesh.ground, {
      name: "ground",
      mesh_id: "rbxassetid://17821211289",
      size: new Vector3(6.000, 0.001, 6.000),
      key: EMesh.ground
    }],
    [EMesh.pillar1, {
      name: "pillar1",
      mesh_id: "rbxassetid://17821210102",
      size: new Vector3(3.000, 6.000, 6.000),
      key: EMesh.pillar1
    }],
    [EMesh.cone, {
      name: "cone",
      mesh_id: "rbxassetid://17821216883",
      size: new Vector3(6.000, 6.000, 6.000),
      key: EMesh.cone
    }],
    [EMesh.cone1, {
      name: "cone1",
      mesh_id: "rbxassetid://17821216634",
      size: new Vector3(6.000, 6.000, 6.000),
      key: EMesh.cone1
    }],
    [EMesh.cone2, {
      name: "cone2",
      mesh_id: "rbxassetid://17821216324",
      size: new Vector3(6.000, 3.000, 6.000),
      key: EMesh.cone2
    }],
    [EMesh.pillar2, {
      name: "pillar2",
      mesh_id: "rbxassetid://17821209905",
      size: new Vector3(3.000, 12.000, 3.000),
      key: EMesh.pillar2
    }],
    [EMesh.pillar3, {
      name: "pillar3",
      mesh_id: "rbxassetid://17821209767",
      size: new Vector3(3.000, 12.000, 3.000),
      key: EMesh.pillar3
    }],
    [EMesh.pillar4, {
      name: "pillar4",
      mesh_id: "rbxassetid://17821209627",
      size: new Vector3(12.000, 12.000, 3.000),
      key: EMesh.pillar4
    }],
    [EMesh.ground_corner, {
      name: "ground_corner",
      mesh_id: "rbxassetid://17821211516",
      size: new Vector3(6.000, 0.001, 6.000),
      key: EMesh.ground_corner
    }],
    [EMesh.cone3, {
      name: "cone3",
      mesh_id: "rbxassetid://17821215896",
      size: new Vector3(5.196, 6.000, 6.000),
      key: EMesh.cone3
    }],
    [EMesh.cone4, {
      name: "cone4",
      mesh_id: "rbxassetid://17821215672",
      size: new Vector3(6.000, 6.000, 6.000),
      key: EMesh.cone4
    }],
    [EMesh.torus, {
      name: "torus",
      mesh_id: "rbxassetid://17821205283",
      size: new Vector3(7.500, 1.299, 6.495),
      key: EMesh.torus
    }],
    [EMesh.cylinder, {
      name: "cylinder",
      mesh_id: "rbxassetid://17821214452",
      size: new Vector3(5.196, 3.000, 6.000),
      key: EMesh.cylinder
    }],
    [EMesh.cylinder1, {
      name: "cylinder1",
      mesh_id: "rbxassetid://17821214296",
      size: new Vector3(6.000, 3.000, 6.000),
      key: EMesh.cylinder1
    }],
    [EMesh.cylinder2, {
      name: "cylinder2",
      mesh_id: "rbxassetid://17821214122",
      size: new Vector3(5.196, 6.000, 6.000),
      key: EMesh.cylinder2
    }],
    [EMesh.cylinder3, {
      name: "cylinder3",
      mesh_id: "rbxassetid://17821213991",
      size: new Vector3(6.000, 6.000, 6.000),
      key: EMesh.cylinder3
    }],
    [EMesh.cylinder4, {
      name: "cylinder4",
      mesh_id: "rbxassetid://17821213824",
      size: new Vector3(5.196, 12.000, 6.000),
      key: EMesh.cylinder4
    }],
    [EMesh.cylinder5, {
      name: "cylinder5",
      mesh_id: "rbxassetid://17821213661",
      size: new Vector3(6.000, 12.000, 6.000),
      key: EMesh.cylinder5
    }],
    [EMesh.sphere, {
      name: "sphere",
      mesh_id: "rbxassetid://17821208360",
      size: new Vector3(5.037, 5.037, 5.037),
      key: EMesh.sphere
    }],
    [EMesh.sphere1, {
      name: "sphere1",
      mesh_id: "rbxassetid://17821208089",
      size: new Vector3(5.037, 5.037, 5.037),
      key: EMesh.sphere1
    }],
    [EMesh.sphere2, {
      name: "sphere2",
      mesh_id: "rbxassetid://17821207873",
      size: new Vector3(5.037, 5.037, 5.037),
      key: EMesh.sphere2
    }],
  ])

  const mesh_keys = TableTools.GetKeys(meshes);
  export function SetRecentMeshKey(mesh: EMesh) {
    ArrayTools.RemoveElementFromArray(mesh_keys, mesh);
    mesh_keys.unshift(mesh);
  }
  export function GetMeshKeys() {
    return table.clone(mesh_keys);
  }
}