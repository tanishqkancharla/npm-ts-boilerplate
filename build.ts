import esbuild from "esbuild";
import fs from "node:fs/promises";
import path from "path";
import * as ts from "typescript";

function compileDts(fileNames: string[]): void {
	const options: ts.CompilerOptions = {
		allowJs: true,
		declaration: true,
		emitDeclarationOnly: true,
		moduleResolution: ts.ModuleResolutionKind.NodeJs,
		outDir: "dist",
	};

	const program = ts.createProgram(fileNames, options);
	program.emit();
}

async function build() {
	const srcFiles = await fs.readdir("./src");

	const entryPoints = srcFiles
		.filter((filePath) => !filePath.endsWith(".test.ts"))
		.map((name) => path.join(__dirname, "src", name));

	await Promise.all([
		esbuild.build({
			entryPoints,
			outdir: "dist",
			format: "esm",
			sourcemap: true,
		}),
		compileDts(entryPoints),
	]);
}

build();
