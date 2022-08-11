import esbuild from "esbuild";
import fs from "node:fs";
import path from "path";

const entryPoints = fs
	.readdirSync("./src")
	.filter((filePath) => !filePath.endsWith(".test.ts"))
	.map((name) => path.join("./src", name));

function buildEsm() {
	return esbuild.build({
		entryPoints,
		outdir: "dist",
		format: "esm",
		outExtension: {
			".js": ".mjs",
		},
	});
}

function buildCjs() {
	return esbuild.build({
		entryPoints,
		outdir: "dist",
		format: "cjs",
		sourcemap: true,
	});
}

async function build() {
	await Promise.all([buildEsm(), buildCjs()]);
}

build();