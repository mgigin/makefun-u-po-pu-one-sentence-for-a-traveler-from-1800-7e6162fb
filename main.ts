import { mkdirSync, writeFileSync } from "node:fs";

// One sentence for make.fun's "One Sentence for a Traveler from 1800":
// explain the modern internet to someone arriving from the year 1800,
// using only things they already know. A coffee house was the 1800
// reader's newsroom, debating club and post room in one — so the whole
// internet becomes one coffee house where everyone on earth has gathered:
// whatever you ask, someone there knows it, and your letter reaches any
// table before your cup cools. One image, one sentence, 164 characters.
const text =
  "Imagine a coffee house where every soul on earth has gathered, so whatever you ask, someone there knows it, and your letter reaches any table before your cup cools.";

// Words coined after 1800 have no place in the traveler's sentence:
// the gate is the judge's second criterion, so the program refuses to
// write a text carrying one of them. (The sentence above carries none.)
const post1800 = [
  "internet", "computer", "website", "online", "digital", "email",
  "smartphone", "wifi", "wi-fi", "software", "download", "stream",
  "pixel", "server", "browser", "google", "telephone", "electric",
];
const words = text.toLowerCase().replace(/[^a-z ]/g, " ").split(/\s+/);
for (const w of post1800) {
  if (words.includes(w)) {
    throw new Error(`entry text uses a post-1800 word: ${w}`);
  }
}
if (text.split(".").length !== 2 || !text.endsWith(".")) {
  throw new Error("entry text must be exactly one sentence");
}

const chars = [...text];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`entry text must be 1-200 characters, got ${chars.length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");
