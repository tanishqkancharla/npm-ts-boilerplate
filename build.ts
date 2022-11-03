import { exec as callbackExec } from "child_process";
import esbuild from "esbuild";
import util from "util";

const exec = util.promisify(callbackExec);

async function build() {
	await Promise.all([
		esbuild.build({
			entryPoints: ["src/index.ts"],
			outdir: "dist",
			format: "esm",
			bundle: true,
		}),
		exec("npx tsc"),
		esbuild.build({
			entryPoints: ["src/index.ts"],
			outdir: "dist",
			format: "cjs",
			bundle: true,
			outExtension: {
				".js": ".cjs",
			},
		}),
	]);
}

build();
