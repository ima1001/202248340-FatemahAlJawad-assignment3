# Technical Documentation

**Course:** Web Development  
**Assignment:** Assignment 2 — Interactive Portfolio Website  
**Student:** Fatemah Al Jawad  

---

## Project Overview

This is a static personal portfolio website built with HTML, CSS, and JavaScript. It uses Bootstrap 5 for layout utilities and Google Fonts for typography. No build tools or frameworks are required — the project runs directly in the browser.

---

## File Structure

```
assignment-2/
├── index.html                  # Main HTML file
├── css/
│   └── styles.css              # All custom styles
├── js/
│   └── script.js               # Form validation + project filter
├── src/
│   └── assets/
│       └── images/             # Project screenshots, school logos, social icons
├── docs/
│   ├── ai-usage-report.md      # Detailed AI tool usage
│   └── technical-documentation.md
└── README.md
```

---

## Technologies Used

| Technology | Version | Purpose |
|---|---|---|
| HTML5 | — | Page structure and content |
| CSS3 | — | Styling, layout, animations |
| JavaScript (ES6) | — | Interactivity and DOM manipulation |
| Bootstrap | 5.3.3 | Navbar, grid utilities, base styles |
| Google Fonts | — | Inter font family |

All external libraries are loaded via CDN — no local installation needed.

---

## External Dependencies (CDN)

```html
<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap" rel="stylesheet">

<!-- Bootstrap JS (bottom of body) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
```

---

## Page Sections

The site is organized into the following sections, each as a `<section>` element:

| Section ID | Class | Description |
|---|---|---|
| — | `.name` | Hero / landing panel |
| `#about` | `.panel.light` | Short personal introduction |
| `#education` | `.panel.dark` | Education timeline |
| `#projects` | `.panel.light` | Project gallery with filter |
| `#skills` | `.panel.dark` | Technical skills by category |
| `#contact-panel` | `.panel.light` | Contact form and social links |

---

## Layout System

### Scroll Snap

The site uses CSS scroll snapping to create a full-page scroll experience:

```css
body {
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
}

.panel {
    height: 100vh;
    scroll-snap-align: start;
    position: sticky;
    top: 0;
}
```

Sections with variable height content (Projects, Skills, Contact) override this:

```css
#projects, #skills, #contact-panel {
    height: auto;
    min-height: 100vh;
    position: relative;       /* overrides sticky */
    scroll-snap-align: none;  /* excluded from snapping */
}
```

### Panel Colors

Two base panel themes are used throughout:

```css
.light { background: #0d1117; color: whitesmoke; }
.dark  { background: rgb(34, 40, 49); color: white; }
```

---

## Header Section

The header background is built entirely with CSS — no image file is used.

Three layers are stacked:
1. **Base** — solid dark background (`#0d1117`) on `.name`
2. **Dot grid** — via `.name::before` using `radial-gradient` repeating every 24px
3. **Purple glow** — via `.name::after` using a centered elliptical gradient

```css
.name::before {
    background-image: radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 24px 24px;
}

.name::after {
    background: radial-gradient(ellipse at center, rgba(80,100,180,0.18) 0%, transparent 70%);
}
```

The name content sits above both layers using `z-index: 2`.

---

## Navigation

The navbar uses Bootstrap's `navbar` component with custom CSS overrides:

```css
#main-nav {
    background: rgba(13, 17, 23, 0.85) !important;
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    z-index: 100;
}
```

- `backdrop-filter: blur(10px)` creates a frosted glass effect
- `position: sticky` keeps it visible while scrolling
- `z-index: 100` ensures it sits above all page content

---

## Education Timeline

The timeline is built using CSS positioning with no external library.

**Structure:**
```
.timeline                  ← relative container, holds the dashed line via ::before
  .timeline-item           ← relative wrapper for each entry
    .timeline-dot          ← absolute positioned circle on the left
    .timeline-card         ← the card content
```

**Dashed line** is created using `repeating-linear-gradient`:
```css
.timeline::before {
    background: repeating-linear-gradient(
        to bottom,
        rgba(255,255,255,0.25) 0px,
        rgba(255,255,255,0.25) 6px,
        transparent 6px,
        transparent 12px
    );
}
```

**Active dot** (current institution) uses a filled white circle:
```css
.timeline-dot.active {
    border-color: white;
    background: white;
}
```

---

## Project Gallery

### Grid Layout

```css
.projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
}
```

`auto-fill` with `minmax` makes the grid automatically responsive — 3 columns on wide screens, 2 on tablets, 1 on mobile.

### Category Filter

Each project card has a `data-category` attribute:
```html
<div class="card project-card" data-category="java">
```

Each filter button has a `data-filter` attribute:
```html
<button class="filter-btn" data-filter="java">Java</button>
```

JavaScript reads these attributes and toggles a `hidden` class:
```javascript
projectCards.forEach(card => {
    if (selected === 'all' || card.dataset.category === selected) {
        card.classList.remove('hidden');
    } else {
        card.classList.add('hidden');
    }
});
```

```css
.project-card.hidden {
    display: none;
}
```

### Badge Colors by Category

Each category has a distinct color scheme:

```css
.cat-java     { background: #dde0ff; color: #2d31a6; }
.cat-database { background: #ffeedd; color: #a65d00; }
.cat-hardware { background: #ffdde0; color: #a62d31; }
.cat-ai       { background: #ddffe8; color: #0d7a3c; }
.cat-web      { background: #ddf0ff; color: #0a5fa6; }
```

---

## Skills Section

Skills are grouped into three cards (Languages, Web Development, Tools) displayed in a responsive grid:

```css
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 16px;
}
```

Each skill badge uses the same `.skill-badge` base class with a category-specific color class (`.language`, `.web-dev`, `.tools`).

---

## Contact Section

### Layout

The contact section uses a flex row layout with two columns:
- **Left** — heading, description, and social links
- **Right** — contact form card

```css
.contact-wrapper {
    display: flex;
    flex-direction: row;
    gap: 60px;
    align-items: flex-start;
    justify-content: space-between;
}
```

The form has a fixed width to prevent it from stretching:
```css
.simple-form {
    width: 380px;
    flex-shrink: 0;
}
```

### Form Validation

Validation is handled in `script.js` with three checks:

1. **Empty fields** — checks if username, email, or message is empty
2. **Email format** — checks for presence of `@` and `.`
3. **Success state** — resets the form and shows a success message

Feedback is shown via a `<span>` that toggles between `.success` and `.fail` classes:

```javascript
if (username === "" || email === "" || message === "") {
    messageDisplay.classList.add("fail");
    return;
}
messageDisplay.classList.add("success");
form.reset();
```

---

## CSS Architecture

### Specificity Strategy

Bootstrap is loaded before `styles.css` so custom styles always win. Where Bootstrap's specificity is too high, `!important` is used selectively (only on navbar background and a few badge overrides).

### Button Override

The global `button` style is scoped to avoid overriding Bootstrap and badge elements:

```css
button:not(.skill-badge):not(.filter-btn):not(.btn) {
    background-color: rgb(34, 40, 49);
    border-radius: 999px;
}
```

### Responsive Design

The grid layouts use `auto-fill` + `minmax` for automatic responsiveness without media queries. The contact section uses `flex-wrap: wrap` so it stacks on smaller screens.

---

## JavaScript Structure

All JavaScript is contained in a single `DOMContentLoaded` listener in `script.js`:

```
DOMContentLoaded
├── Form validation
│   ├── Empty field check
│   ├── Email format check
│   └── Success state + form reset
└── Project filter
    ├── Click listener on each filter button
    ├── Active class toggle
    └── Show/hide cards based on data-category
```

---

## Known Limitations

- The contact form does not actually send data — it simulates submission with a success message only
- No backend or API integration is included

---

## Browser Compatibility

Tested and working on:
- Google Chrome (latest)
- Microsoft Edge (latest)
- Different devices dimensions

Note: `backdrop-filter` (frosted glass navbar) is not supported in older Firefox versions — the navbar will still display correctly but without the blur effect.
