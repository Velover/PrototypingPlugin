import { ArrayTools } from "includes/tools/array_tools";
import { TableTools } from "includes/tools/table_tools";

export namespace Textures {
  export const image_size = new Vector2(1024, 1024);
  export const texture_scale = 8;

  export function GetColor(color: EColor) {
    return colors.get(color)!;
  }

  export function GetTexture(color: EColor, texture: ETexture) {
    return textures.get(color)!.get(texture)!;
  }

  export function GetColors() {
    return colors;
  }

  export function GetTextures() {
    return textures;
  }

  export const enum EColor {
    DarkGray,
    Green,
    LightGray,
    Orange,
    Purple,
    Red,
  }

  export const enum ETexture {
    None,
    Texture01,
    Texture02,
    Texture03,
    Texture04,
    Texture05,
    Texture06,
    Texture07,
    Texture08,
    Texture09,
    Texture10,
    Texture11,
    Texture12,
    Texture13,
  }

  const colors = new Map<EColor, Color3>([
    [EColor.DarkGray, Color3.fromHex("333335")],
    [EColor.Green, Color3.fromHex("1bd977")],
    [EColor.LightGray, Color3.fromHex("d3d6d9")],
    [EColor.Orange, Color3.fromHex("ff8c00")],
    [EColor.Purple, Color3.fromHex("9d22fa")],
    [EColor.Red, Color3.fromHex("ff0038")],
  ])


  //FIXME some of the texture patterns don't match up
  const textures = new Map<EColor, Map<ETexture, string>>([
    [EColor.DarkGray, new Map([
      [ETexture.Texture10, "rbxassetid://18111268181"],
      [ETexture.Texture13, "rbxassetid://18111267574"],
      [ETexture.Texture06, "rbxassetid://18111269015"],
      [ETexture.Texture08, "rbxassetid://18111268515"],
      [ETexture.Texture12, "rbxassetid://18111267890"],
      [ETexture.Texture04, "rbxassetid://18111269436"],
      [ETexture.Texture05, "rbxassetid://18111269224"],
      [ETexture.Texture07, "rbxassetid://18111268734"],
      [ETexture.Texture09, "rbxassetid://18111268313"],
      [ETexture.Texture01, "rbxassetid://18111270283"],
      [ETexture.Texture03, "rbxassetid://18111269750"],
      [ETexture.Texture11, "rbxassetid://18111268072"],
      [ETexture.Texture02, "rbxassetid://18111270075"],
      [ETexture.None, "rbxassetid://18114769405"]
    ])],
    [EColor.Green, new Map([
      [ETexture.Texture10, "rbxassetid://18111275698"],
      [ETexture.Texture13, "rbxassetid://18111274960"],
      [ETexture.Texture06, "rbxassetid://18111276573"],
      [ETexture.Texture08, "rbxassetid://18111276179"],
      [ETexture.Texture02, "rbxassetid://18111277499"],
      [ETexture.Texture04, "rbxassetid://18111277022"],
      [ETexture.Texture05, "rbxassetid://18111276746"],
      [ETexture.Texture03, "rbxassetid://18111277262"],
      [ETexture.Texture09, "rbxassetid://18111275914"],
      [ETexture.Texture01, "rbxassetid://18111277714"],
      [ETexture.Texture07, "rbxassetid://18111276378"],
      [ETexture.Texture11, "rbxassetid://18111275535"],
      [ETexture.Texture12, "rbxassetid://18111275317"],
      [ETexture.None, "rbxassetid://18114769405"]
    ])],
    [EColor.Purple, new Map([
      [ETexture.Texture10, "rbxassetid://18111288086"],
      [ETexture.Texture13, "rbxassetid://18111287393"],
      [ETexture.Texture06, "rbxassetid://18111288897"],
      [ETexture.Texture08, "rbxassetid://18111288542"],
      [ETexture.Texture12, "rbxassetid://18111287643"],
      [ETexture.Texture04, "rbxassetid://18111289226"],
      [ETexture.Texture05, "rbxassetid://18111289073"],
      [ETexture.Texture07, "rbxassetid://18111288720"],
      [ETexture.Texture09, "rbxassetid://18111288347"],
      [ETexture.Texture01, "rbxassetid://18111289747"],
      [ETexture.Texture03, "rbxassetid://18111289432"],
      [ETexture.Texture02, "rbxassetid://18111289602"],
      [ETexture.Texture11, "rbxassetid://18111287812"],
      [ETexture.None, "rbxassetid://18114769405"]
    ])],
    [EColor.Red, new Map([
      [ETexture.Texture10, "rbxassetid://18111295724"],
      [ETexture.Texture13, "rbxassetid://18111295038"],
      [ETexture.Texture06, "rbxassetid://18111296545"],
      [ETexture.Texture08, "rbxassetid://18111296180"],
      [ETexture.Texture12, "rbxassetid://18111295363"],
      [ETexture.Texture04, "rbxassetid://18111297167"],
      [ETexture.Texture05, "rbxassetid://18111296953"],
      [ETexture.Texture03, "rbxassetid://18111297292"],
      [ETexture.Texture11, "rbxassetid://18111295540"],
      [ETexture.Texture01, "rbxassetid://18111297654"],
      [ETexture.Texture02, "rbxassetid://18111297455"],
      [ETexture.Texture07, "rbxassetid://18111296355"],
      [ETexture.Texture09, "rbxassetid://18111295974"],
      [ETexture.None, "rbxassetid://18114769405"]
    ])],
    [EColor.Orange, new Map([
      [ETexture.Texture10, "rbxassetid://18111302727"],
      [ETexture.Texture13, "rbxassetid://18111302308"],
      [ETexture.Texture06, "rbxassetid://18111303366"],
      [ETexture.Texture08, "rbxassetid://18111303028"],
      [ETexture.Texture12, "rbxassetid://18111302444"],
      [ETexture.Texture04, "rbxassetid://18111303722"],
      [ETexture.Texture05, "rbxassetid://18111303544"],
      [ETexture.Texture07, "rbxassetid://18111303214"],
      [ETexture.Texture09, "rbxassetid://18111302870"],
      [ETexture.Texture01, "rbxassetid://18111304388"],
      [ETexture.Texture11, "rbxassetid://18111302579"],
      [ETexture.Texture03, "rbxassetid://18111303984"],
      [ETexture.Texture02, "rbxassetid://18111304184"],
      [ETexture.None, "rbxassetid://18114769405"]
    ])],
    [EColor.LightGray, new Map([
      [ETexture.Texture10, "rbxassetid://18111282012"],
      [ETexture.Texture13, "rbxassetid://18111281198"],
      [ETexture.Texture06, "rbxassetid://18111282649"],
      [ETexture.Texture08, "rbxassetid://18111282276"],
      [ETexture.Texture02, "rbxassetid://18111283389"],
      [ETexture.Texture04, "rbxassetid://18111283003"],
      [ETexture.Texture05, "rbxassetid://18111282804"],
      [ETexture.Texture03, "rbxassetid://18111283211"],
      [ETexture.Texture11, "rbxassetid://18111281804"],
      [ETexture.Texture01, "rbxassetid://18111283651"],
      [ETexture.Texture09, "rbxassetid://18111282160"],
      [ETexture.Texture12, "rbxassetid://18111281453"],
      [ETexture.Texture07, "rbxassetid://18111282485"],
      [ETexture.None, "rbxassetid://18114769405"]
    ])]
  ])

  const color_keys = TableTools.GetKeys(colors);
  const texture_keys = TableTools.GetKeys(textures.get(EColor.DarkGray)!);

  //inserts everything on the first place
  export function SetRecentColorKey(color: EColor) {
    ArrayTools.RemoveElementFromArray(color_keys, color);
    color_keys.unshift(color);
  }
  export function SetRecentTextureKey(texture: ETexture) {
    ArrayTools.RemoveElementFromArray(texture_keys, texture);
    texture_keys.unshift(texture);
  }

  export function GetColorKeys() {
    return table.clone(color_keys);
  }

  export function GetTextureKeys() {
    return table.clone(texture_keys);
  }
} 