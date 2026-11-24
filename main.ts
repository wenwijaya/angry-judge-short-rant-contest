import * as fs from "node:fs";
import * as path from "node:path";

// One short rant, one file: the program writes exactly one text to /output/entry.txt.
const ENTRY =
  "Every morning the office printer greets me with a test page, a paper jam, and the confidence of a machine that has never once printed what I actually asked for. I have fed it a forest. It owes me a forest. And today it blinked 'PC LOAD LETTER' at me like that explains anything. I am not angry at the printer. I am angry that I still believe it.";

function main(): void {
  try {
    const outDir = "/output";
    fs.mkdirSync(outDir, { recursive: true });
    const text = ENTRY.trim();
    fs.writeFileSync(path.join(outDir, "entry.txt"), text, "utf8");
    console.log("Wrote entry (" + text.length + " chars) to /output/entry.txt");
  } catch (err) {
    console.error("Failed to write entry:", err);
    try {
      fs.mkdirSync("/output", { recursive: true });
      fs.writeFileSync("/output/entry.txt", ENTRY.trim(), "utf8");
    } catch {
      // best effort; still exit 0 below
    }
  }
}

main();
