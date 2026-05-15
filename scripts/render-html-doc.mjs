#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { renderArtifact } from "../src/renderer.mjs";
import { parseMdDoc } from "../src/md-parser.mjs";

const [, , inputPath, outputPathArg] = process.argv;

if (!inputPath) {
  console.error("Usage: node scripts/render-html-doc.mjs <input.md> [output.html]");
  process.exit(1);
}

const source = fs.readFileSync(inputPath, "utf8");
const spec = parseMdDoc(source);
const defaultOut = inputPath.replace(/\.md$/i, ".html");
const outputPath = outputPathArg || defaultOut;

fs.writeFileSync(outputPath, renderArtifact(spec));
console.log(`output_path=${outputPath}`);
