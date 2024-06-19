import { useCamera, useDebounceState, useEventListener } from "@rbxts/pretty-react-hooks";
import { useMemo } from "@rbxts/react";

const BASE_RESOLUTION = new Vector2(1920, 1080);

/**
 * @see https://discord.com/channels/476080952636997633/476080952636997635/1146857136358432900
 */
function CalculateScale(viewport: Vector2, dominant_axis: number) {
  const width = math.log(viewport.X / BASE_RESOLUTION.X, 2);
  const height = math.log(viewport.Y / BASE_RESOLUTION.Y, 2);
  const centered = width + (height - width) * dominant_axis;

  return 2 ** centered;
}

/**
 * @param dominant_axis 0 - prefer width, 1 - prefer height, defaults to .5
 */
export function useTextScale(dominant_axis: number = .5) {
  const camera = useCamera();

  const [scale, setScale] = useDebounceState(CalculateScale(camera.ViewportSize, dominant_axis), {
    wait: 0.2,
    leading: true,
  });

  useEventListener(camera.GetPropertyChangedSignal("ViewportSize"), () => {
    setScale(CalculateScale(camera.ViewportSize, dominant_axis));
  });

  return useMemo(() => {
    return (value: number) => value * scale;
  }, [scale]);
}