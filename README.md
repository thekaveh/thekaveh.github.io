# thekaveh.github.io

Interactive Tokyo Night developer profile for [Kaveh Razavi](https://github.com/thekaveh).

**Live:** https://thekaveh.github.io

## What's here

A single self-contained `index.html` (HTML + embedded CSS + a small inline `<script>` that renders the skills section from a data array). No build step.

- **Palette:** Tokyo Night, exact values from the approved `q5-skill-expansion-v7` mockup.
- **Hero block-art KAVEH:** real JetBrains Mono Bold (loaded from Google Fonts), per-row gradient from the genai-vanilla `BlockLogo` Textual widget — `#74A6F4` at the top monotonically darkening to `#0A1A55`. Subtle breathing glow + blinking cursor on the prompt line.
- **Sections:** terminal-windowed Hero (block-art + tagline + identity TS card + mission), Projects (grid of repo cards), Skills (7 categories · 135 badges), Connect (LinkedIn / Email / GitHub service cards).
- **Responsive:** grid collapses 3→2→1 columns on narrower viewports.

## Where the markdown-rendered profile lives

The plain-markdown profile (constrained to GitHub's HTML sanitizer) lives at [github.com/thekaveh](https://github.com/thekaveh). This Pages site is the unconstrained version.

## Editing

Edit `index.html`. Everything is in one file. The skills data is a JS array near the bottom — add / remove / reorder badges there.
