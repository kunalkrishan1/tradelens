---
name: Luminous Fintech
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bac9cc'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#849396'
  outline-variant: '#3b494c'
  surface-tint: '#00daf3'
  primary: '#c3f5ff'
  on-primary: '#00363d'
  primary-container: '#00e5ff'
  on-primary-container: '#00626e'
  inverse-primary: '#006875'
  secondary: '#46fa9c'
  on-secondary: '#00391d'
  secondary-container: '#04dd83'
  on-secondary-container: '#005b33'
  tertiary: '#ffe7e5'
  on-tertiary: '#68000b'
  tertiary-container: '#ffc1bc'
  on-tertiary-container: '#b30b1d'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#9cf0ff'
  primary-fixed-dim: '#00daf3'
  on-primary-fixed: '#001f24'
  on-primary-fixed-variant: '#004f58'
  secondary-fixed: '#59ffa4'
  secondary-fixed-dim: '#1ce388'
  on-secondary-fixed: '#00210f'
  on-secondary-fixed-variant: '#00522d'
  tertiary-fixed: '#ffdad7'
  tertiary-fixed-dim: '#ffb3ae'
  on-tertiary-fixed: '#410004'
  on-tertiary-fixed-variant: '#930014'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
  surface-bg-light: '#F9F9F7'
  surface-card-dark: '#141414'
  surface-glass: rgba(255, 255, 255, 0.05)
  text-on-dark: '#F4F4F4'
  text-on-light: '#0D0C22'
  market-up: '#00DC82'
  market-down: '#FF4B4B'
typography:
  display-xl:
    fontFamily: Geist
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
  body-md:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  data-lg:
    fontFamily: JetBrains Mono
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
  container-max: 1440px
---

## Brand & Style

The design system is engineered for high-stakes financial clarity and professional authority. The brand personality is "The Precise Observer"—sophisticated, insightful, and calm under market volatility. It bridges the gap between high-frequency trading terminals and modern, accessible SaaS interfaces.

The visual style is **Corporate Modern with 3D Depth**. It utilizes a "Lenticular" design philosophy, where UI layers appear to float at varying Z-heights to separate critical data from background noise. Subtle glassmorphism provides a sense of transparency and lightness, while high-performance typography ensures every decimal point is legible. The aesthetic response should be one of "Premium Reliability"—the feeling of using an expensive, precision-tuned instrument.

## Colors

The palette is optimized for long-duration "eyes-on-glass" sessions. The default mode is **Dark**, utilizing a deep charcoal (#0A0A0A) to minimize eye strain and maximize the vibrance of functional data colors.

- **Primary (Cyan):** Used for focus states, primary actions, and "active lens" highlights. It represents the tech-forward nature of the platform.
- **Secondary/Tertiary (Functional):** Green and Red are reserved strictly for market movement and status indicators. Their saturation is high to ensure immediate cognitive recognition against the dark backdrop.
- **Neutral:** A range of near-blacks and off-whites are used to build depth. In light mode, the background shifts to a warm, "paper-like" off-white (#F9F9F7) to maintain a premium feel without the clinical harshness of pure white.

## Typography

This design system prioritizes data density and numerical precision. We use **Geist** for its technical, minimalist character in headlines and body copy. 

For all financial figures, price tickers, and table data, **JetBrains Mono** (or a similar high-quality monospaced font) is mandatory. This ensures tabular numbers align perfectly vertically, allowing traders to compare magnitudes at a glance without "character-width jitter."

- **Scale:** Aggressive contrast between display titles and data labels.
- **Micro-copy:** Small labels should always use slightly increased letter spacing and uppercase styling for maximum legibility at small sizes.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. Dashboards utilize a fluid grid to maximize the "terminal" feel, while landing and marketing pages conform to a 12-column fixed grid (1440px max-width).

- **Rhythm:** A 4px baseline grid governs all spacing.
- **Density:** Financial views should use "Compact" spacing (8px-12px gutters) to keep data within the viewport. Marketing views should use "Spacious" padding (64px+) to emphasize the premium nature of the brand.
- **Breakpoints:**
  - **Mobile (<768px):** Single column, condensed headers, bottom-docked navigation.
  - **Tablet (768px - 1024px):** 2-column masonry for widgets.
  - **Desktop (>1024px):** Full multi-pane terminal layout with persistent sidebar.

## Elevation & Depth

Hierarchy is established through **Tonal Layering and Soft 3D Depth** rather than traditional heavy shadows.

- **Level 0 (Background):** Pure #0A0A0A.
- **Level 1 (Cards/Panels):** #141414 with a 1px subtle inner border (opacity 10% white).
- **Level 2 (Floating Widgets/Modals):** Glassmorphic surfaces using a `backdrop-filter: blur(12px)` and a slightly lighter fill.
- **Depth Cues:** Use "Global Light Source" logic. Elements at higher elevations have a subtle top-down 1px highlight and a soft, wide-spread cyan-tinted ambient shadow (`box-shadow: 0 20px 40px rgba(0, 229, 255, 0.05)`).

## Shapes

The shape language is **Selective Geometric**. We use "Rounded" (0.5rem) corners for standard containers to keep the interface feeling modern and approachable.

- **Standard Buttons/Inputs:** 8px (0.5rem) radius.
- **Data Cards:** 16px (1rem) radius to create a distinct "pod" look for 3D widgets.
- **Functional Tags:** Pill-shaped (fully rounded) to distinguish them from interactive buttons.
- **Market Charts:** Use sharp lines for price action, but rounded corners for the "hover state" tooltips to maintain the lens-based visual theme.

## Components

- **Buttons:** Primary buttons use a solid Cyan (#00E5FF) fill with dark text. Secondary buttons are "Ghost" style with a 1px border and subtle hover glow.
- **3D Market Widgets:** These are the centerpiece. They should feature a subtle gradient mesh background and "floated" typography that appears 2-4px above the widget surface.
- **Inputs:** Darker than the card surface with a high-contrast focus ring in Cyan. Use JetBrains Mono for all numerical inputs.
- **Lens-based Icons:** Icons are thin-stroke (1.5pt), geometric, and often enclosed in circular frames to mimic camera or telescope lenses.
- **Data Viz:** Charts should use "Glow Lines"—semi-transparent paths with a 2px blur duplicate underneath to simulate a high-end CRT terminal or neon display.
- **Chips/Status:** Use low-opacity fills of the functional colors (e.g., 10% Green) with solid text on top for a refined "glass" status indicator.