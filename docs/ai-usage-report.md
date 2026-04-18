# AI Usage Report

**Course:** Web Development  
**Assignment:** Assignment 2 — Interactive Portfolio Website  
**Student:** Fatemah Al Jawad  

---

## Overview

This report documents how AI tools were used during the development of my personal portfolio website for Assignment 2. Two AI tools were used: **Claude (claude.ai)** and **GitHub Copilot**. Both were used to support and accelerate development — all output was reviewed, understood, and adapted before being included in the project.

---

## Tools Used

| Tool | Provider | Primary Use |
|---|---|---|
| Claude (claude.ai) | Anthropic | Design guidance, debugging, code generation, explanations |
| GitHub Copilot | GitHub / Microsoft | In-editor code completion, repetitive code patterns |

---

## Claude (claude.ai)

### How it was used

Claude was used conversationally throughout the project. I shared my actual code, described problems I was facing, and iterated based on Claude's feedback. I did not copy output directly — I adapted suggestions to fit my design and learned from the explanations.

---

### 1. Hero Section Background

**What I asked:** I wanted something better than a plain photo background for the hero section.

**What Claude suggested:** Using CSS `::before` and `::after` pseudo-elements to layer a dot grid and a purple glow on top of a dark background — no image file needed.

**What ended up in my code:**
```css
.name::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 24px 24px;
}

.name::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, rgba(80,100,180,0.18) 0%, transparent 70%);
}
```

**What I learned:** How CSS pseudo-elements work as invisible layered divs, and how `radial-gradient` can create both dot patterns and soft glows.

---

### 2. Navbar Styling

**What I asked:** I was unhappy with the default Bootstrap navbar appearance (white background, didn't match my dark theme).

**What Claude suggested:** Overriding Bootstrap's navbar with a dark semi-transparent background and `backdrop-filter: blur()` for a frosted glass effect.

**What ended up in my code:**
```css
#main-nav {
    background: rgba(13, 17, 23, 0.85) !important;
    backdrop-filter: blur(10px);
    border-bottom: 0.5px solid rgba(255,255,255,0.08);
    position: sticky;
    top: 0;
    z-index: 100;
}
```

**What I learned:** How `backdrop-filter` works, and why `!important` is sometimes necessary to override Bootstrap's default styles.

---

### 3. Project Filter Feature

**What I asked:** How to implement a category filter so users can show only Java, Database, Hardware, AI, or Web projects.

**What Claude suggested:** Using `data-category` on each card and `data-filter` on each button, then toggling a `hidden` class with JavaScript.

**What ended up in my HTML:**
```html
<div class="card project-card" data-category="java">
<button class="filter-btn active" data-filter="all">All</button>
```

**What ended up in my JS:**
```javascript
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        const selected = this.dataset.filter;
        projectCards.forEach(card => {
            if (selected === 'all' || card.dataset.category === selected) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});
```

**What I learned:** How `data-*` attributes work in HTML and how to read them in JavaScript using `dataset`. Also how toggling CSS classes is cleaner than directly manipulating styles.

---

### 4. Form Validation & Feedback

**What I asked:** Help improving my form validation and making the feedback messages look better.

**What Claude identified:** My original code had two nested `DOMContentLoaded` listeners — meaning the filter code never actually ran. Claude also suggested using a styled `<span>` with CSS classes instead of plain text color changes.

**What ended up in my code:**
```javascript
// Single DOMContentLoaded wrapping all JS
document.addEventListener("DOMContentLoaded", function () {
    // form code here
    // filter code here — no longer nested
});
```

```css
.form-message.fail {
    background-color: #ffe0e0;
    color: #a62d31;
}
.form-message.success {
    background-color: #ddffe8;
    color: #0d7a3c;
}
```

**What I learned:** Why nested event listeners are a bug, and how CSS class-based state management is cleaner than imperative style changes.

---

### 5. Education Timeline

**What I asked:** How to build a visual dashed timeline with circles representing each education entry.

**What Claude suggested:** Using `::before` on `.timeline` for the dashed line via `repeating-linear-gradient`, and absolutely positioned `.timeline-dot` elements for the circles.

**What ended up in my code:**
```css
.timeline::before {
    content: '';
    position: absolute;
    left: 7px;
    top: 8px;
    bottom: 8px;
    width: 1.5px;
    background: repeating-linear-gradient(
        to bottom,
        rgba(255,255,255,0.25) 0px,
        rgba(255,255,255,0.25) 6px,
        transparent 6px,
        transparent 12px
    );
}

.timeline-dot {
    position: absolute;
    left: -32px;
    top: 6px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
}
```

**What I learned:** How `repeating-linear-gradient` creates dashed lines, and how `position: absolute` inside a `position: relative` parent is used to overlay decorative elements precisely.

---

### 6. Project Cards & Skills Layout

**What I asked:** How to make project cards consistent in height and well laid out in a grid.

**What Claude suggested:** Using CSS Grid with `auto-fill` and `minmax`, capping description text with `-webkit-line-clamp`, and using `flex-grow: 1` on the description to push badges to the bottom.

**What ended up in my code:**
```css
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
    width: 100%;
}

.card-desc {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    flex-grow: 1;
}
```

**What I learned:** How `-webkit-line-clamp` truncates text to a fixed number of lines, and how `flex-grow` distributes space inside a flex column to keep card bottoms aligned.

---

### 7. Debugging & Bug Fixes

Throughout development I shared code with Claude when something wasn't working. Key bugs identified:

| Bug | Root Cause | Fix Applied |
|---|---|---|
| Skill badges had no color | Global `button {}` rule overriding `.skill-badge` | Changed to `button:not(.skill-badge):not(.filter-btn):not(.btn)` |
| Project filter not working | Two nested `DOMContentLoaded` listeners | Merged all JS into one listener |
| Contact section not side by side | `simple-form` had `width: 100%` breaking flex row | Changed to `width: 380px` with `flex-shrink: 0` |
| Skills grid broken | `.skills-grid` defined twice with conflicting values | Removed duplicate CSS rule |
| Badges unstyled | Using `id="pCat"` on multiple elements (IDs must be unique) | Changed to `class="pCat"` |
| Projects section clipping content | `.panel` had `position: sticky` and `height: 100vh` | Added `position: relative` and `height: auto` to `#projects` |

---

### 8. Code Quality Review

**What I asked:** Claude to review my HTML and CSS for structural issues.

**What Claude identified:**
- `<image>` is not a valid HTML tag — should be `<img>`
- Scripts were placed before page content inside `<body>` instead of at the bottom
- Duplicate CSS selectors (`#skills` and `.skills-grid` defined twice)
- Mismatched closing `</div>` tags in the skills and contact sections

**What I did:** Fixed all issues and used VS Code's auto-format (`Shift + Alt + F`) to keep indentation consistent going forward.

---

## GitHub Copilot

### How it was used

GitHub Copilot was used directly inside VS Code as an inline suggestion tool. It did not explain concepts — it suggested code as I typed, which I then accepted, rejected, or modified.

---

### 1. Repetitive HTML Structures

**Situation:** Writing multiple project cards and skill badges, each with the same structure but different content.

**What Copilot did:** After I wrote the first project card, Copilot suggested the full structure of the next card automatically. I filled in the correct content (project name, description, badges) for each.

**Example:** After writing the Facelite card structure, Copilot suggested a nearly identical structure for the Quadtree Compression card, which I accepted and updated with the correct details.

---

### 2. Consistent Edits Across Similar Elements

**Situation:** When I changed a class name or attribute on one element and needed to apply the same change to all similar elements.

**What Copilot did:** Detected the pattern and suggested the same edit on subsequent similar elements. For example, when I changed `id="pCat"` to `class="pCat"` on one badge button, Copilot suggested the same change on the following badge buttons.

**What I did:** Reviewed each suggestion before accepting to confirm it was contextually correct.

---

### 3. CSS Property Completion

**Situation:** Writing CSS rules with multiple properties.

**What Copilot did:** Suggested common property-value pairs based on the selector context. For example, after typing `border-radius:` on a badge element, it suggested `999px` because it detected other pill-shaped elements in the file.

---

## Reflection

Using AI tools in this project helped me work faster and understand concepts more deeply. Claude was most valuable for explaining *why* something works — not just giving code, but reasoning through the problem. GitHub Copilot was most useful for *speed* — reducing repetitive typing on similar structures.

The most important habit I developed is treating AI suggestions critically. Every suggestion required evaluation: Does this fit my design? Do I understand what it does? Is it correct in this specific context? In several cases (like the nested `DOMContentLoaded` bug), the AI also helped me find mistakes I had made myself — which required understanding the code well enough to recognize the problem when it was pointed out.

---

## Summary Table

| Area | Claude | Copilot | Done Manually |
|---|---|---|---|
| Design decisions | Suggestions provided | — | Final choices were mine |
| Hero background | Generated | — | Adjusted values |
| Navbar styling | Generated | — | Color choices mine |
| Project filter JS | Pattern provided | — | Written and integrated |
| Form validation | Debugged and improved | — | Original code was mine |
| Timeline CSS | Generated | — | Adapted to my theme |
| HTML structure | Reviewed and fixed | Repetitive elements | Writing and organizing |
| CSS layout | Generated | Property completion | Customization |
| Content (text, projects) | — | — | Entirely manual |
