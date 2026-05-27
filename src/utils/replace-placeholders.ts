import path from "node:path";
import fs from "fs-extra";
import {
	SKIP_DIRS,
	SKIP_FILES,
	TEXT_EXTENSIONS,
	TEXT_FILE_NAMES,
} from "../constants/files.js";

function isTextFile(filePath: string): boolean {
	const base = path.basename(filePath);
	if (TEXT_FILE_NAMES.has(base)) {
		return true;
	}
	return TEXT_EXTENSIONS.has(path.extname(filePath));
}

function applyReplacements(
	content: string,
	replacements: Record<string, string>,
): string {
	let result = content;
	for (const [placeholder, value] of Object.entries(replacements)) {
		result = result?.replaceAll?.(placeholder, value);
	}
	return result;
}

async function replacePlaceholdersInDir(
	dir: string,
	replacements: Record<string, string>,
): Promise<void> {
	const entries = await fs.readdir(dir, { withFileTypes: true });

	for (const entry of entries) {
		const fullPath = path.join(dir, entry?.name);

		if (entry.isDirectory()) {
			if (SKIP_DIRS.has(entry?.name)) {
				continue;
			}
			await replacePlaceholdersInDir(fullPath, replacements);
			continue;
		}

		if (SKIP_FILES.has(entry.name) || !isTextFile(fullPath)) {
			continue;
		}

		const content = await fs.readFile(fullPath, "utf8");
		const updated = applyReplacements(content, replacements);

		if (updated !== content) {
			await fs.writeFile(fullPath, updated, "utf8");
		}
	}
}

export default replacePlaceholdersInDir;
