import { EFillDirection } from "gui/drop_down_menu/drop_down_menu";
import { ArrayTools } from "includes/tools/array_tools";

export default function SortByFillDirection<T extends defined>(array: T[], fill_direction: EFillDirection) {
  return (fill_direction === EFillDirection.Bottom) ? ArrayTools.Reverse(array) : array;
}