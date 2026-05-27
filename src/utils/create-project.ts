import path from "node:path";
import { fileURLToPath } from "node:url";
import fs from "fs-extra";
import pc from "picocolors";
import replacePlaceholdersInDir from "./replace-placeholders.js";

// Replace "my-awesome-project" with "My Awesome Project"
function projectNameToTitle(name: string): string {
	return name
		?.split(/[-_]/)
		?.filter(Boolean)
		?.map(
			(word) =>
				word?.charAt?.(0)?.toUpperCase?.() + word?.slice?.(1)?.toLowerCase?.(),
		)
		?.join(" ");
}

async function createProject({ projectName = "", template = "" }) {
	const targetDir = path.resolve(String(projectName));

	const __filename = fileURLToPath(import.meta.url);
	const __dirname = path.dirname(__filename);

	const templateDir = path.resolve(
		__dirname,
		"../../../templates",
		String(template),
	);

	if (fs.existsSync(targetDir)) {
		console.log(pc.red("Folder already exists"));
		process.exit(1);
	}

	fs.copySync(templateDir, targetDir);

	const projectTitle = projectNameToTitle(String(projectName));
	const replacements = {
		__PROJECT_NAME__: String(projectName),
		__PROJECT_TITLE__: projectTitle,
		__SITE_URL__: "https://example.com",
	};

	await replacePlaceholdersInDir(targetDir, replacements);

	const packageJsonPath = path.join(targetDir, "package.json");
	const packageJson = await fs.readJson(packageJsonPath);
	packageJson.name = projectName;
	await fs.writeJson(packageJsonPath, packageJson, { spaces: "\t" });

	console.log(pc.green(`Project created at ${targetDir}`));
	console.log(`
Next steps:
	cd ${projectName}
	npm install
	npm run dev
`);
}

export default createProject;
