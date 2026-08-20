# Design System — Roberto Minghi (Global Source of Truth)

Derived from `ui-ux-pro-max`: color `Developer Tool / IDE`, typography `Developer Mono`,
landing pattern `portfolio-grid`, style `dark-mode-oled` (tempered — slate, not pure black).

Page-level deviations live in `pages/<page>.md` and override this file.

## 1. Identity

Dark technical. The site should read like a well-made developer tool: precise, dense with
signal, no decoration that does not carry meaning. The work is the hero; the chrome recedes.

## 2. Color tokens

Defined once in `site/app/globals.css` under `@theme`. Never write a raw hex in a component.

| Token | Value | Use | Contrast on bg |
|---|---|---|---|
| `--color-bg` | `#0F172A` | page background | — |
| `--color-bg-deep` | `#020617` | footer, code blocks | — |
| `--color-surface` | `#1B2336` | cards, inputs | — |
| `--color-surface-hover` | `#232C42` | card hover | — |
| `--color-fg` | `#F8FAFC` | primary text | 15.9:1 |
| `--color-fg-muted` | `#94A3B8` | secondary text, meta | 7.4:1 AA ✓ |
| `--color-border` | `#334155` | dividers, card edges | 3.1:1 non-text ✓ |
| `--color-border-strong` | `#475569` | inputs, focused edges | 4.4:1 ✓ |
| `--color-accent` | `#22C55E` | primary CTA, links, active nav | 8.0:1 ✓ |
| `--color-accent-hover` | `#16A34A` | CTA hover | 5.3:1 ✓ |
| `--color-on-accent` | `#0F172A` | text on accent fill | 8.0:1 ✓ |
| `--color-danger` | `#EF4444` | form errors | 4.9:1 ✓ |
| `--color-ring` | `#F8FAFC` | focus ring | — |

Rules:
- Green is the **only** accent. CTAs, links, active nav state. Never decorative.
- Error and success states pair color with an icon and text — never color alone.
- Dark-only UI. The CV print stylesheet is the single light-mode surface.

## 3. Typography

- **Display / headings / nav / labels / tags / code:** JetBrains Mono (400, 500, 700)
- **Body prose:** IBM Plex Sans (400, 500, 600)
- Loaded via `next/font/google` → downloaded at build, self-hosted. No runtime Google request.

Scale: `12 / 14 / 16 / 20 / 24 / 32 / 48` px. Body 16px minimum (prevents iOS auto-zoom).
Line-height 1.6 for prose, 1.2 for display. Prose measure capped at `68ch`.
Tabular figures (`font-variant-numeric: tabular-nums`) on all dates and CV year columns.

## 4. Spacing & layout

4/8px rhythm: `4 8 12 16 24 32 48 64 96`. Section rhythm `64` mobile / `96` desktop.
Container `max-width: 72rem`, gutters `24px` mobile → `48px` ≥1024px.
Breakpoints: `375 / 768 / 1024 / 1440`.

## 5. Motion

CSS only — no animation library. Reveal on scroll: `opacity 0→1`, `translateY 12px→0`,
`300ms cubic-bezier(.16,1,.3,1)`, `50ms` stagger, fires once via `IntersectionObserver`.
Hover transitions `200ms`. Under `prefers-reduced-motion: reduce` every reveal renders
in its final state immediately and all transitions drop to `0ms`.

## 6. Components

- **Icons:** Phosphor (`@phosphor-icons/react`), regular weight, 20px default. Decorative icons
  get `aria-hidden="true"`; icon-only controls get an `aria-label`. Never emoji.
- **Buttons:** primary = accent fill + `--color-on-accent`; secondary = 1px border, transparent
  fill. Min height 44px. Visible 2px focus ring with 2px offset. `cursor: pointer`.
- **Cards:** `--color-surface`, 1px `--color-border`, radius 8px, no shadow (flat, technical).
  Hover raises to `--color-surface-hover` + border to `--color-border-strong`. No transform.
- **Links in prose:** accent color + 1px underline offset 3px.

## 7. Page structure (portfolio-grid)

Hero (name / role / positioning line / dual CTA) → Selected work grid → About →
Experience highlights → Contact. One primary CTA per screen.

## 8. Anti-patterns

Emoji as icons · text glow · hover-only affordances · gray-on-gray secondary text ·
pure `#000` background · bold weights on monospace body · decorative clutter competing
with the work · animating `width`/`height`/`top`/`left`.

## 9. Accessibility floor (non-negotiable)

Body text ≥ 4.5:1 · focus ring visible on every interactive element and never obscured by
sticky UI · tab order matches visual order · sequential heading levels · skip-to-content link ·
`hreflang` alternates for EN/IT · touch targets ≥ 44×44 CSS px · form errors below the field,
wired with `aria-describedby`, announced with `role="alert"`.
