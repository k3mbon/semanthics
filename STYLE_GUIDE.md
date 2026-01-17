# Semanthics Game Style Guide

This document outlines the shared design patterns, CSS classes, and structure for the Semanthics math games (Penjumlahan, Pengurangan, Perkalian, Pembagian).

## Typography

- **Font Family**: 'Fredoka', sans-serif
- **Import**: `@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;600&display=swap');`

## Layout Structure

The game pages follow a consistent flexbox-based layout:

```html
<div className="game-bg">
  <div className="header-bar">
    {/* Question Card & Exit Button */}
  </div>
  <div className="main-layout">
    <div className="sidebar">
       {/* Draggable Icons */}
    </div>
    <div className="game-center">
       {/* Game Area (Grids/Counting) */}
       {/* Bottom Area (Equation & Controls) */}
    </div>
  </div>
</div>
```

### Core Classes

| Class Name | Description |
|xy|xy|
| `.header-bar` | Top bar containing the question and exit button. Fixed height (approx 15vh). |
| `.main-layout` | Flex container for Sidebar and Game Center. Fills remaining height. |
| `.sidebar` | Left panel containing draggable helper icons. Fixed width (~100px). |
| `.game-center` | Main interactive area. Flex column. |
| `.counting-area` | Area for visual counting aids (grids, drop zones). |
| `.bottom-area` | Container for the equation bar, check button, and number strip. |

## Components

### Question Card
- **Class**: `.question-card`
- **Style**: White background, rounded corners, colored border (operation specific).
- **Content**: Navigation arrows (`.nav-arrow`) and question text (`.question-text`).

### Sidebar Icons
- **Class**: `.sidebar-icon`
- **Behavior**: Draggable source items.
- **Hover**: Scale effect.

### Drop Zones (Equation)
- **Class**: `.dropzone`
- **Variants**: 
  - `.eq-slot`: Standard equation slot.
  - `.operator`: For operator symbols (+, -, x, :).
  - `.result`: For the answer slot.
- **States**: 
  - `.correct` (Green background/border)
  - `.incorrect` (Red background/border)

### Grid/Grouping (Perkalian/Pembagian)
- **Class**: `.grid-group`
- **Usage**: Groups of items for visualization.
- **Children**: `.grid-slot` (Individual cells).

### Buttons
- **Exit Button**: `.exit-button` (Red, top-right).
- **Check Button**: `.check-button` (Operation primary color, large pill shape).
- **FAQ Button**: `.faq-button` (Round, question mark).

## Color Palette

### Operation Themes
Each game mode has a primary accent color:

- **Penjumlahan (+)**: Green (Tailwind-like colors, e.g., `#22c55e`)
- **Pengurangan (-)**: Red/Pink (e.g., `#ef4444`)
- **Perkalian (x)**: Purple (`#9333ea`)
- **Pembagian (:)**: Orange (`#f97316`)

### Status Colors
- **Success**: `#22c55e` (Green)
- **Error**: `#ef4444` (Red)
- **Neutral**: `#f3f4f6` (Gray)

## Responsive Breakpoints

- **Tablet (< 1024px)**: Adjust question card width.
- **Mobile (< 768px)**:
  - Layout switches to column (`.main-layout`).
  - Sidebar becomes horizontal scroll at top.
  - Header becomes compact.
  - Bottom area stacks elements.
- **Small Mobile (< 480px)**:
  - Reduce font sizes.
  - Smaller grid slots and buttons.

## Best Practices

1. **Consistency**: Always use the shared class names for structural elements.
2. **Feedback**: Use `playSound('correct')` or `playSound('wrong')` and update UI state (`.correct`/`.incorrect` classes) immediately after checking.
3. **Accessibility**: Ensure images have `alt` text and buttons have clear labels.
