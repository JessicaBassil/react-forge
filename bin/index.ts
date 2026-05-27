#!/usr/bin/env node

import createProject from "../src/utils/create-project.js";
import promptProjectName from "../src/utils/prompt-project-name.js";
import promptTemplate from "../src/utils/prompt-template.js";

async function main() {
	try {
		const projectName = await promptProjectName();

		const template = await promptTemplate();

		await createProject({ projectName, template });
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

main();
