#!/usr/bin/env node
import fs from "node:fs";
import { renderArtifact } from "../src/renderer.mjs";

const [, , inputPath, outputPathArg] = process.argv;

if (!inputPath) {
  console.error("Usage: node scripts/render-html-doc.mjs artifact.json [output.html]");
  process.exit(1);
}

const spec = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const outputPath = outputPathArg || inputPath.replace(/\.json$/i, ".html");

fs.writeFileSync(outputPath, renderArtifact(spec));
console.log(`output_path=${outputPath}`);
