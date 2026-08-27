import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";

const html = fs.readFileSync(new URL("../index.html", import.meta.url), "utf8");

function skillData() {
  const start = html.indexOf("const SKILLS = ") + "const SKILLS = ".length;
  const end = html.indexOf("\n\nconst host", start);
  assert.ok(start > "const SKILLS = ".length, "SKILLS data is present");
  assert.ok(end > start, "SKILLS data has a renderer boundary");
  const expression = html.slice(start, end).replace(/;\s*$/, "");
  return vm.runInNewContext(`(${expression})`);
}

assert.match(html, /Lead Staff Software Engineer \| Data Platforms, ML Systems &amp; GenAI/);
assert.match(html, /20\+ years building software; 12 years at Comscore/);
assert.doesNotMatch(html, /15\+ years/);
assert.doesNotMatch(html, /BLOCKLOGO · LOGO_GRADIENT/);
assert.doesNotMatch(html, /render_name --text KAVEH --style block-logo/);

assert.match(html, /Seven RAG strategies/);
assert.match(html, /LightRAG graph/);
assert.match(html, /experimental lazy-graph/);
assert.match(html, /five idiomatic, full-parity implementations/);
assert.match(html, /401 shared conformance scenarios/);
assert.match(html, /Rust/);
assert.match(html, /crates\.io/);

const connectStart = html.indexOf('<section id="connect"');
const connectEnd = html.indexOf('</section>', connectStart);
assert.ok(connectStart >= 0 && connectEnd > connectStart, "connect section is present");
const connectCards = [...html.slice(connectStart, connectEnd).matchAll(
  /<a class="service[^\"]*" href="([^\"]+)">[\s\S]*?<span>([^<]+)<\/span>/g,
)].map(([, href, label]) => ({ href, label }));
assert.deepEqual(connectCards, [
  { href: "mailto:kaveh.razavi@gmail.com", label: "Email" },
  { href: "https://sepanta.ai/", label: "Sepanta.ai" },
  { href: "https://github.com/thekaveh", label: "GitHub" },
  { href: "https://linkedin.com/in/kavehrazavi", label: "LinkedIn" },
], "connect cards use the canonical order");

const skills = skillData();
assert.equal(skills.length, 7, "profile keeps seven visual skill groups");

const categoryNames = skills.flatMap(([, , , , categories]) => categories.map(([name]) => name));
const expectedCategories = [
  "Programming Languages",
  "Data Engineering & Big Data",
  "Machine Learning & Data Science",
  "Generative AI & LLMs",
  "Deep Learning, Model Training & Optimization",
  "Cloud, DevOps & Build",
  "Databases, Data Stores & ORMs",
  "IDEs, AI Coding Tools & Workflows",
  "Backend & APIs",
  "Reactive & Architecture",
  "Web, Desktop & UI",
  "Testing & QA",
  "Mobile & Cross-Platform",
  "Methods, Optimization & Security",
  "Version Control, PM & Docs",
  "Networking & Diagnostics",
];
assert.deepEqual([...categoryNames].sort(), [...expectedCategories].sort());

const badges = skills.flatMap(([, , , , categories]) => categories.flatMap(([, items]) => items));
assert.equal(badges.length, 174, "profile exposes the canonical CV skill count");
assert.equal(new Set(badges.map((item) => item.toLowerCase())).size, badges.length, "skills are deduplicated");

console.log("profile CV sync contract passed");
