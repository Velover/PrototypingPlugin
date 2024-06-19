import Maid from "@rbxts/maid";
import { useEffect, useRef } from "@rbxts/react";
import { SnapshotSaver } from "./snapshot_saver";

export namespace CleanUp {
  const maid = new Maid();
  maid.GiveTask(() => {
    SnapshotSaver.RemoveChanges();
  })
  maid.GiveTask(() => {
    instances_to_destroy.forEach((instance) => {
      instance.Destroy();
    })
  })
  export function DoCleaning() {
    maid.DoCleaning();
    maid.Destroy();
  }

  const instances_to_destroy = new Set<Instance>();
  export function useInstanceRefWithCleanUp<T extends Instance>() {
    const ref = useRef<T>();
    useEffect(() => {
      const instance = ref.current;
      if (instance === undefined) return;
      instances_to_destroy.add(instance);
      return () => {
        instances_to_destroy.delete(instance)
      }
    }, [ref.current]);

    return ref;
  }
}