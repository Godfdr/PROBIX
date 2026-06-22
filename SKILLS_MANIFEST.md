# PROBIX Agent Skills Manifest

This manifest documents the high-quality UI/UX and Design Engineering skills installed for this agent. These principles guide all interface development for the PROBIX project.

## 1. Emil Kowalski: Design Engineering
**Focus:** Animation decisions, tactile feedback, and perceived performance.
- **Rules:**
    - UI animations < 300ms.
    - Never animate keyboard-initiated actions.
    - Use `transform: scale(0.97)` on `:active` states.
    - Avoid `scale(0)`; start from `scale(0.95)` with opacity.

## 2. pbakaus: Impeccable (Neo Kinpaku)
**Focus:** High-end technical aesthetics, OKLCH color spaces, and visual hierarchy.
- **Rules:**
    - Use **Neo Kinpaku** palette (Gold and Verdigris accents).
    - Hairline-first rule: Use 1px hairlines before shadows.
    - Weight Inversion: h2 anchors are heavier than h1 heroes.
    - No decorative glassmorphism or purple gradients (technical/lacquer feel).

## 3. jakubkrehel: Make Interfaces Feel Better
**Focus:** Visual geometry and micro-interactions.
- **Rules:**
    - **Concentric Radius:** Outer radius = Inner radius + Padding.
    - **Tabular Numbers:** Always use monospaced digits for dynamic data.
    - **Text-Wrap:** Use `balance` or `pretty` for headlines.
    - Optical alignment over strict geometric centering.

## 4. Leonxlnx: Taste Skill
**Focus:** Elimination of "AI-slop" and premium intentionality.
- **Rules:**
    - Elimination of "AI-slop" design patterns.
    - Preference for custom cubic-bezier easings.
    - Intentional whitespace and typography-first layouts.

## 5. NextLevelBuilder: UI/UX Pro Max
**Focus:** Industry-specific reasoning and high-fidelity design systems.
- **Rules:**
    - Use **Fintech Reasoning** (stable, precise, authoritative).
    - 67+ UI Styles: Selective use of Glassmorphism and Bento-Grid.
    - 99 UX Best Practices: Accessibility, data stability, and anti-pattern prevention.
