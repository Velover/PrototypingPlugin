const Workspace = game.GetService("Workspace");
const MarketplaceService = game.GetService("MarketplaceService");

const textures_list = new Map<string, Map<string, string>>();
const textures = Workspace.WaitForChild("Textures");
textures.GetChildren().forEach(async (folder) => {
	const list = new Map<string, string>();
	folder.GetChildren().forEach((decal) => {
		if (!decal.IsA("Decal")) return;
		const string_id = decal.Texture;
		const id = tonumber(string_id.match("%d+")[0])!;
		print(string_id, id);
		const info = MarketplaceService.GetProductInfo(id);

		const name = info.Name.split(" ")[0];
		list.set(name, string_id);
	});
	textures_list.set(folder.Name, list);
});

task.wait(5);
let categories = "";
textures_list.forEach((list, name) => {
	let content = "";
	list.forEach((string_id, name) => {
		return (content += `\n["${name}", "${string_id}"],`);
	});
	categories += `\n["${name}", new Map([${content}])],`;
});
const code = `const textures = new Map<string, Map<string, string>>([${categories}])`;
print(code);
