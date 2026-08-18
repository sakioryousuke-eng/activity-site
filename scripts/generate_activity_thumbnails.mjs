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
const thumbnailRoot = path.join(sourceRoot, "activity-thumbnails");
const postImageRoot = path.join(sourceRoot, "activity-post-images");
const thumbnailDataPath = path.join(rootDir, "_data", "activity_thumbnails.yml");
const postImageDataPath = path.join(rootDir, "_data", "activity_post_images.yml");

const postFiles = (await fs.readdir(postsDir))
  .filter((name) => /\.(md|markdown)$/i.test(name))
  .sort();

const thumbnailMappings = new Map();
const postImageMappings = new Map();
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
  const thumbnailPath = path.resolve(thumbnailRoot, ...relativeOutput.split("/"));
  const postImagePath = path.resolve(postImageRoot, ...relativeOutput.split("/"));
  const publicThumbnail = `/assets/images/activity-thumbnails/${relativeOutput}`;
  const publicPostImage = `/assets/images/activity-post-images/${relativeOutput}`;

  try {
    await fs.access(sourcePath);
    await fs.mkdir(path.dirname(thumbnailPath), { recursive: true });
    await fs.mkdir(path.dirname(postImagePath), { recursive: true });
    try {
      await fs.access(thumbnailPath);
    } catch {
      await sharp(sourcePath)
        .rotate()
        .resize(320, 240, {
          fit: "cover",
          position: "attention",
          withoutEnlargement: true,
        })
        .webp({ quality: 72, effort: 5 })
        .toFile(thumbnailPath);
    }
    try {
      await fs.access(postImagePath);
    } catch {
      await sharp(sourcePath)
        .rotate()
        .resize({
          width: 1440,
          height: 1440,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 80, effort: 5 })
        .toFile(postImagePath);
    }
    thumbnailMappings.set(publicSource, publicThumbnail);
    postImageMappings.set(publicSource, publicPostImage);
  } catch (error) {
    failures.push(`${postFile}: ${error.message}`);
  }
}

const quoteYaml = (value) => JSON.stringify(value);
const thumbnailYaml = [
  "# 活動一覧専用サムネイルの自動生成対応表。",
  "# scripts/generate_activity_thumbnails.mjs で再生成する。",
  "thumbnails:",
  ...[...thumbnailMappings.entries()]
    .sort(([left], [right]) => left.localeCompare(right, "ja"))
    .map(([source, thumbnail]) => `  ${quoteYaml(source)}: ${quoteYaml(thumbnail)}`),
  "",
].join("\n");

const postImageYaml = [
  "# 活動記事本文用WebPの自動生成対応表。",
  "# scripts/generate_activity_thumbnails.mjs で再生成する。",
  "images:",
  ...[...postImageMappings.entries()]
    .sort(([left], [right]) => left.localeCompare(right, "ja"))
    .map(([source, postImage]) => `  ${quoteYaml(source)}: ${quoteYaml(postImage)}`),
  "",
].join("\n");

await fs.writeFile(thumbnailDataPath, thumbnailYaml, "utf8");
await fs.writeFile(postImageDataPath, postImageYaml, "utf8");

console.log(`Prepared ${thumbnailMappings.size} activity thumbnails.`);
console.log(`Prepared ${postImageMappings.size} activity post images.`);
if (failures.length) {
  console.warn(`Skipped ${failures.length} image(s):`);
  failures.forEach((failure) => console.warn(`- ${failure}`));
  process.exitCode = 1;
}
