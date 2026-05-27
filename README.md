# React Forge

A modern CLI tool for scaffolding production-ready React applications.

## Features

- Interactive project setup via terminal prompts
- Template-based scaffolding
- Placeholder replacement for project metadata
- Production-focused starter defaults

## Current Template

- `vite-biome` (Vite + React + TypeScript + Tailwind + Biome + Vitest + Husky)

## Getting Started (Development)

```bash
npm install
npm run dev
```

The dev command runs the CLI locally with `tsx`.

## Build

```bash
npm run build
```

Compiled output is generated in `dist/`.

## Publish Artifacts

Package metadata includes:

- CLI binary: `react-forge`
- published files: `dist`, `README.md`, `LICENSE`

## Usage (after publishing or linking)

```bash
react-forge
```

Then follow the prompts to choose a project name and template.

## License

MIT - see [LICENSE](./LICENSE).
