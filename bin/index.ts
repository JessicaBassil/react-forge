import { isCancel, text } from "@clack/prompts";

function validateEmpty(value?: string) {
	if (!value || value.trim().length < 1) {
		return "Value can not be empty";
	}
}

async function main() {
	try {
		const projectName = await text({
			message: "What is your project name?",
			placeholder: "Please enter project name",
			validate: validateEmpty,
			defaultValue: "my-project",
		});

		if (isCancel(projectName)) {
			console.log("Operation cancelled");
			process.exit(0);
		}

		console.log(`Creating project: ${projectName}`);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
}

main();
