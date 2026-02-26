#!/usr/bin/env bun
import { existsSync } from "fs";
import { rm } from "fs/promises";
import { cp } from "fs/promises";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { execSync } from "child_process";

if (process.argv.includes("--help") || process.argv.includes("-h")) {
  console.log(`
 🏗️  Bun Build Script

Usage: bun run build.ts [options]

Common Options:
  --outdir <path>          Output directory (default: "dist")
  --minify                 Enable minification (or --minify.whitespace, --minify.syntax, etc)
  --sourcemap <type>      Sourcemap type: none|linked|inline|external
  --target <target>        Build target: browser|bun|node
  --format <format>        Output format: esm|cjs|iife
  --splitting              Enable code splitting
  --packages <type>        Package handling: bundle|external
  --public-path <path>     Public path for assets
  --env <mode>             Environment handling: inline|disable|prefix*
  --conditions <list>      Package.json export conditions (comma separated)
  --external <list>        External packages (comma separated)
  --define <obj>           Define global constants (e.g. --define.VERSION=1.0.0)
  --help, -h               Show this help message

Example:
  bun run build.ts --outdir=dist --minify --sourcemap=linked --external=react,react-dom
 `);
  process.exit(0);
}

const toCamelCase = (str: string): string => str.replace(/-([a-z])/g, g => g[1].toUpperCase());

const parseValue = (value: string): any => {
  if (value === "true") return true;
  if (value === "false") return false;

  if (/^\d+$/.test(value)) return parseInt(value, 10);
  if (/^\d*\.\d+$/.test(value)) return parseFloat(value);

  if (value.includes(",")) return value.split(",").map(v => v.trim());

  return value;
};

function parseArgs(): Partial<Bun.BuildConfig> {
  const config: Partial<Bun.BuildConfig> = {};
  const args = process.argv.slice(2);

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === undefined) continue;
    if (!arg.startsWith("--")) continue;

    if (arg.startsWith("--no-")) {
      const key = toCamelCase(arg.slice(5));
      config[key] = false;
      continue;
    }

    if (!arg.includes("=") && (i === args.length - 1 || args[i + 1]?.startsWith("--"))) {
      const key = toCamelCase(arg.slice(2));
      config[key] = true;
      continue;
    }

    let key: string;
    let value: string;

    if (arg.includes("=")) {
      [key, value] = arg.slice(2).split("=", 2) as [string, string];
    } else {
      key = arg.slice(2);
      value = args[++i] ?? "";
    }

    key = toCamelCase(key);

    if (key.includes(".")) {
      const [parentKey, childKey] = key.split(".");
      config[parentKey] = config[parentKey] || {};
      config[parentKey][childKey] = parseValue(value);
    } else {
      config[key] = parseValue(value);
    }
  }

  return config;
}

const formatFileSize = (bytes: number): string => {
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

console.log("\n🚀 Starting build process...\n");

const cliConfig = parseArgs();
const outdir = cliConfig.outdir || path.join(process.cwd(), "dist");

if (existsSync(outdir)) {
  console.log(`🗑️ Cleaning previous build at ${outdir}`);
  await rm(outdir, { recursive: true, force: true });
}

const start = performance.now();

console.log("🎨 Compiling CSS with Tailwind...");
execSync("npx @tailwindcss/cli -i src/index.css -o " + path.join(outdir, "style.css"), {
  stdio: "inherit"
});
console.log("✅ CSS compiled\n");

const svgFiles = [...new Bun.Glob("src/**/*.svg").scanSync()];
console.log(`📄 Copying ${svgFiles.length} SVG file(s)\n`);

for (const svgFile of svgFiles) {
  const dest = path.join(outdir, path.basename(svgFile));
  await cp(svgFile, dest);
}

const entrypoints = [...new Bun.Glob("src/**/*.html").scanSync()]
  .map(a => path.resolve(a));

console.log(`📄 Copying ${entrypoints.length} HTML file(s)\n`);

for (const htmlFile of entrypoints) {
  let html = await readFile(htmlFile, "utf-8");
  
  html = html.replace(
    '<script type="module" src="./frontend.tsx" async></script>',
    '<link rel="stylesheet" href="./style.css" />\n    <script type="module" src="./src/frontend.js" async></script>'
  );
  
  const dest = path.join(outdir, path.basename(htmlFile));
  await writeFile(dest, html);
}

const jsEntrypoints = [...new Bun.Glob("src/**/*.{tsx,ts}").scanSync()]
  .filter(f => !f.includes("node_modules") && !f.includes("index.ts"));
console.log(`📄 Found ${jsEntrypoints.length} JS/TS file(s) to process\n`);

const result = await Bun.build({
  entrypoints: jsEntrypoints,
  outdir,
  minify: true,
  target: "browser",
  sourcemap: "linked",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  ...cliConfig,
});

const end = performance.now();

const outputTable = result.outputs.map(output => ({
  File: path.relative(process.cwd(), output.path),
  Type: output.kind,
  Size: formatFileSize(output.size),
}));

console.table(outputTable);
const buildTime = (end - start).toFixed(2);

console.log(`\n✅ Build completed in ${buildTime}ms\n`);
