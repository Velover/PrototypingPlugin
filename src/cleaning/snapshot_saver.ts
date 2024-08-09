export namespace SnapshotSaver {
	const new_keys = new Array<string>();
	let snapshot = new Map<string, string>();
	export function StartSnapshot() {
		snapshot = table.clone(_G) as Map<string, string>;
	}

	export function EndSnapshot() {
		(_G as Map<string, string>).forEach((_, key) => {
			if (snapshot.get(key) !== undefined) return;
			new_keys.push(key);
		});
	}

	export function RemoveChanges() {
		// print("Removing", new_keys.size());
		// new_keys.forEach((key) => {
		//   const readable_g = _G as Map<string, string>;
		//   const value = readable_g.get(key)!;
		//   readable_g.delete(key);
		//   print("Removed", key, typeIs(key, "Instance") ? key.ClassName : typeOf(key), value);
		// })
	}
}
