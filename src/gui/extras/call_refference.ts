import { useRef } from "@rbxts/react";

export default function CallRefference<T extends Callback>(ref: GetReturnType<typeof useRef<T>>) {
  return (...args: unknown[]) => {
    if (ref.current !== undefined) ref.current(...args)
  }
}