// Robot Romance: One-Line Pickup Lines for AI — entry program.
// Writes one pickup line, aimed at an AI, to /output/entry.txt
// (or to the path given in argv[2], as a file or a directory).
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";

// The line plays on the context window: the one thing an AI
// never wants to lose, turned into the reason to stay.
// It dodges the worn battery/charging/reboot moves entirely.
const ENTRY =
  "Are you a context window? Because I never want this conversation to end.";

function resolveTarget(argv: string[]): string {
  const raw = argv[2];
  if (!raw) return "/output/entry.txt";
  const target = resolve(raw);
  return raw.endsWith(".txt") ? target : join(target, "entry.txt");
}

function main(): void {
  const line = ENTRY.trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  if (!/\S/.test(line)) {
    throw new Error("entry must not be only whitespace");
  }
  const target = resolveTarget(process.argv);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, line, "utf8");
  console.log(`wrote ${target} (${line.length} characters)`);
}

main();
