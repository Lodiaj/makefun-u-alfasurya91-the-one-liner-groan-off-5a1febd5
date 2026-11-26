// The One-Liner Groan-Off — make.fun entry
// A tiny Node 22 program that drops one original dad joke into
// /output/entry.txt. The joke is a setup plus a twist that lands in
// a single breath: the dog's silence is both the punchline and the
// correct answer, which is exactly the kind of groan a dad aims for.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const JOKE = "I asked my dog what's two minus two. He said nothing.";

const MAX_CHARS = 140;

function checkJoke(joke: string): void {
  if (joke.length < 1 || joke.length > MAX_CHARS) {
    throw new Error(`joke must be 1-${MAX_CHARS} chars, got ${joke.length}`);
  }
  if (joke.trim() === "") {
    throw new Error("joke must not be only whitespace");
  }
  if (joke.includes("\n") || joke.includes("\r")) {
    throw new Error("joke must fit on one line");
  }
  if (/[\u0000-\u001f\u007f]/.test(joke)) {
    throw new Error("joke must not contain control characters");
  }
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
checkJoke(JOKE);
mkdirSync(outDir, { recursive: true });
const outFile = join(outDir, "entry.txt");
writeFileSync(outFile, JOKE, "utf8");
console.log(`wrote ${JOKE.length} chars to ${outFile}`);
