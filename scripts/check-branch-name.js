import { execSync } from "node:child_process";

const branchName = execSync("git rev-parse --abbrev-ref HEAD")
	.toString()
	.trim();

const validPrefixes = [
	"feat/",
	"fix/",
	"docs/",
	"refactor/",
	"chore/",
	"test/",
	"ci/",
];

const mainBranches = ["main", "dev"];

const isValid = validPrefixes.some((prefix) => branchName.startsWith(prefix));

if (mainBranches.includes(branchName)) {
	console.error(`Direct pushes to ${branchName} are not allowed.`);
}

if (!isValid) {
	console.error(`
Invalid branch name: "${branchName}"

Branch names must start with one of:

- feat/
- fix/
- docs/
- refactor/
- chore/
- test/
- ci/
`);
	process.exit(1);
}

console.log(`Valid branch name: ${branchName}`);
