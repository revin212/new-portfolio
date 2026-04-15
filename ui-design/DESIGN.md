```markdown
# Design System Document

## 1. Overview & Creative North Star: "The Precision Architect"

This design system is built for the 'Product Engineer'—a persona that sits at the intersection of rigorous logic and aesthetic empathy. While inspired by the clean utility of shadcn/ui, this system evolves into a **High-End Editorial** experience. 

The Creative North Star is **"The Precision Architect."** We move away from the generic "dashboard" look by embracing intentional asymmetry, expansive breathing room, and a tactile sense of depth. This isn't just a portfolio; it is a technical blueprint rendered with the elegance of a premium boutique. By utilizing tonal layering over rigid borders, we create a UI that feels grown, not assembled.

---

## 2. Color & Tonal Architecture

Our palette is grounded in a sophisticated neutral range, punctuated by a singular, vibrant Indigo (`primary: #494bd6`).

### The "No-Line" Rule
Standard 1px borders are an admission of failure in spatial design. In this system, **sectioning must be achieved through background shifts.** 
- To separate a hero from a project grid, transition from `surface` (#f7f9fb) to `surface-container-low` (#f0f4f7).
- Visual boundaries are defined by the collision of two distinct tonal planes, never a solid stroke.

### Surface Hierarchy & Nesting
Treat the screen as a physical workspace with stacked layers of fine paper and frosted glass.
- **Base Plane:** `surface` (#f7f9fb) for the main viewport.
- **Sectional Plane:** `surface-container-low` (#f0f4f7) for large background blocks.
- **Interactive Plane:** `surface-container-lowest` (#ffffff) for primary cards and floating elements to provide maximum "lift."

### The "Glass & Gradient" Rule
To add "soul" to the engineering aesthetic:
- **Glassmorphism:** Use `surface-container-lowest` at 70% opacity with a `24px` backdrop-blur for navigation bars or floating action menus.
- **Signature Textures:** Main CTAs should use a subtle linear gradient from `primary` (#494bd6) to `primary_dim` (#3c3dca) at a 135-degree angle to avoid the "flat" default look.

---

## 3. Typography: Editorial Authority

We pair the geometric precision of **Manrope** (Display/Headlines) with the functional clarity of **Inter** (Body/Labels).

*   **Display (Manrope):** Massive, low-kerning scales (`display-lg`: 3.5rem) used for impact. Don't center-align; use left-aligned, asymmetrical placement to create a "technical journal" feel.
*   **Headline/Title (Manrope):** Strong and authoritative. Use `headline-md` (1.75rem) for project titles.
*   **Body (Inter):** Optimized for readability. Use `body-md` (0.875rem) for descriptions, ensuring a line height of 1.6 for an airy, premium feel.
*   **Labels (Inter):** Use `label-md` (0.75rem) in All-Caps with 0.05em letter spacing for tech tags and metadata.

---

## 4. Elevation & Depth: Tonal Layering

Traditional shadows are often too "dirty." We use natural, ambient light.

*   **The Layering Principle:** Instead of a shadow, place a `surface-container-lowest` card on a `surface-container` background. The contrast in hex values provides all the "lift" required.
*   **Ambient Shadows:** For floating elements, use a multi-layered shadow: `0px 10px 40px rgba(42, 52, 57, 0.06)`. Note the use of `on-surface` (#2a3439) as the shadow base rather than pure black.
*   **The "Ghost Border":** If a container sits on a background of the same color, use a 1px stroke of `outline-variant` (#a9b4b9) at **15% opacity**. It should be felt, not seen.

---

## 5. Components

### Cards & Projects
- **Style:** No borders. Background: `surface-container-lowest`. 
- **Interaction:** On hover, the card should not lift with a shadow; instead, it should transition its background to `primary_container` (#e1e0ff) at 30% opacity or subtly scale (1.02x).
- **Spacing:** Use 32px (xl) internal padding to ensure the content feels "curated."

### Tech Badges (Sleek Badges)
- **Style:** Pill-shaped (`rounded-full`). 
- **Color:** `secondary_container` (#d8e3fb) background with `on_secondary_container` (#475266) text. 
- **Constraint:** No borders. Use `label-sm` typography.

### Input Fields
- **Style:** Minimalist. `surface-container-high` background with a `2px` bottom-only border using `outline-variant`.
- **Focus State:** The bottom border transitions to `primary` (#494bd6) with a subtle `primary_container` glow.

### Buttons
- **Primary:** Gradient fill (Primary to Primary-Dim), `rounded-md`, `on-primary` text.
- **Secondary:** `surface-container-highest` background, no border.
- **Tertiary:** Ghost style. Text-only with an underline that appears on hover using the `primary` color.

### The "Breadcrumb" Progress (Unique Component)
- For long-form case studies, use a vertical "code-line" on the left margin. As the user scrolls, a thin `primary` colored line tracks their progress, grounding the engineering theme.

---

## 6. Do’s and Don’ts

### Do:
- **Do** use negative space as a functional element. Allow 80px-120px of vertical space between major sections.
- **Do** use `primary_fixed_dim` (#d1d0ff) for subtle highlights in code snippets or technical diagrams.
- **Do** treat typography as imagery. Large, semi-transparent letters behind content can act as subtle textures.

### Don’t:
- **Don’t** use dividers or horizontal rules (`<hr>`). Use a 48px gap instead.
- **Don’t** use pure black (#000) for text. Use `on_surface` (#2a3439) to maintain a soft, premium grey-scale.
- **Don’t** use sharp corners. Stick strictly to the `md` (0.375rem) or `lg` (0.5rem) roundedness scale to keep the "Precision Architect" feel approachable.

---
**Director's Final Note:** This system succeeds when it feels "quiet." The engineering prowess is shown through the perfect alignment of elements and the sophisticated use of whites and greys. Let the Indigo accent be the heartbeat of the UI—rare, intentional, and high-impact.```