#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { baseCss } from "../src/styles.mjs";

const [, , outputPathArg = "dist/html-doc.css"] = process.argv;
const outputPath = path.resolve(outputPathArg);

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, baseCss());
console.log(`output_path=${outputPathArg}`);
