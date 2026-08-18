import fs from "node:fs/promises";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const nodeModulesPath = process.env.NODE_PATH?.split(path.delimiter).find(Boolean);
const sharp = require(nodeModulesPath ? path.join(nodeModulesPath, "sharp") : "sharp");

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");
const postsDir = path.join(rootDir, "_posts");
const sourceRoot = path.join(rootDir, "assets", "images");
const outputRoot = path.join(sourceRoot, "activity-thumbnails");
const dataPath = path.join(rootDir, "_data", "activity_thumbnails.yml");

const postFiles = (await fs.readdir(postsDir))
  .filter((name) => /\.(md|markdown)$/i.test(name))
  .sort();

const mappings = new Map();
const failures = [];

for (const postFile of postFiles) {
  const source = await fs.readFile(path.join(postsDir, postFile), "utf8");
  const frontMatter = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---/);
  if (!frontMatter) continue;

  const firstImage = frontMatter[1].match(
    /^images:\s*\r?\n\s*-\s*["']?([^"'\r\n]+)["']?\s*$/m,
  );
  if (!firstImage) continue;

  const publicSource = firstImage[1].trim().replace(/\\/g, "/");
  if (!publicSource.startsWith("/assets/images/")) {
    failures.push(`${postFile}: unsupported image path ${publicSource}`);
    continue;
  }

  const relativeSource = publicSource.slice("/assets/images/".length);
  if (relativeSource.startsWith("activity-thumbnails/")) continue;

  const sourcePath = path.resolve(sourceRoot, ...relativeSource.split("/"));
  if (!sourcePath.startsWith(`${sourceRoot}${path.sep}`)) {
    failures.push(`${postFile}: image path escaped assets/images`);
    continue;
  }

  const relativeOutput = relativeSource.replace(/\.[^.\/]+$/, ".webp");
  const outputPath = path.resolve(outputRoot, ...relativeOutput.split("/"));
  const publicOutput = `/assets/images/activity-thumbnails/${relativeOutput}`;

  try {
    await fs.access(sourcePath);
    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await sharp(sourcePath)
      .rotate()
      .resize(320, 240, {
        fit: "cover",
        position: "attention",
        withoutEnlargement: true,
      })
      .webp({ quality: 72, effort: 5 })
      .toFile(outputPath);
    mappings.set(publicSource, publicOutput);
  } catch (error) {
    failures.push(`${postFile}: ${error.message}`);
  }
}

const quoteYaml = (value) => JSON.stringify(value);
const yaml = [
  "# 活動一覧専用サムネイルの自動生成対応表。",
  "# scripts/generate_activity_thumbnails.mjs で再生成する。",
  "thumbnails:",
  ...[...mappings.entries()]
    .sort(([left], [right]) => left.localeCompare(right, "ja"))
    .map(([source, thumbnail]) => `  ${quoteYaml(source)}: ${quoteYaml(thumbnail)}`),
  "",
].join("\n");

await fs.writeFile(dataPath, yaml, "utf8");

console.log(`Generated ${mappings.size} activity thumbnails.`);
if (failures.length) {
  console.warn(`Skipped ${failures.length} image(s):`);
  failures.forEach((failure) => console.warn(`- ${failure}`));
  process.exitCode = 1;
}
