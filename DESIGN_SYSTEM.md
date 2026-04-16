# SAMPRA Development Fund - Design System

A comprehensive design system for the SAMPRA Development Fund web application, ensuring consistency, scalability, and maintainability across all pages and components.

---

## Table of Contents

1. [Color Palette](#color-palette)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Components](#components)
5. [Implementation Guidelines](#implementation-guidelines)

---

## Color Palette

### Primary Brand Colors

The SAMPRA brand is built on a warmwelcoming yellow that represents energy, optimism, and cultural vibrancy.

#### Sampra Yellow
```
Primary:      #FEC838
Dark Variant: #F59E0B
Light:        #FCD34D
```

**Usage:**
- Buttons (primary actions)
- Links and emphasis text
- Accent elements
- Focus states
- Interactive hover states

---

### Neutral Colors (Grayscale)

The neutralcolor palette provides a clean, professional foundation for the design.

| Shade | Hex     | Use Case |
|-------|---------|----------|
| 50    | #FAFAFA | Backgrounds, subtle section dividers |
| 100   | #F5F5F5 | Light section backgrounds |
| 200   | #E5E5E5 | Light borders, dividers |
| 300   | #D4D4D4 | Secondary borders |
| 400   | #A3A3A3 | Disabled states |
| 500   | #737373 | Tertiary text |
| 600   | #525252 | Secondary text |
| 700   | #404040 | Secondary text |
| 800   | #262626 | Rarely used |
| 900   | #171717 | Rarely used |

**Tailwind Classes:** `gray-50` through `gray-900`

---

### Semantic Colors

#### Success
- Primary: `#22C55E` (`green-500`)
- Accent: `#10B981` (`emerald-500`)
- Background: `#F0FDF4` (`green-50`)
- **Usage:** Success messages, completion states, confirmed actions

#### Warning
- Primary: `#F59E0B` (`amber-500`)
- Light: `#FCD34D` (`yellow-300`)
- Background: `#FFFBEB` (`yellow-50`)
- **Usage:** Caution messages, pending states, alerts

#### Danger
- Primary: `#EF4444` (`red-500`)
- Dark: `#DC2626` (`red-600`)
- Background: `#FEE2E2` (`red-100`)
- **Usage:** Errors, deletions, critical actions

#### Info
- Primary: `#0EA5E9` (`sky-500`)
- Background: `#F0F9FF` (`blue-50`)
- **Usage:** Information, guidance, supplementary content

---

### Background Colors

| Purpose | Color | Tailwind |
|---------|-------|----------|
| Primary background | White | `white` / `bg-white` |
| Section background (light) | #F9FAFB | `bg-gray-50` |
| Section background (slightly darker) | #F3F4F6 | `bg-gray-100` |
| Dark section background | #111827 | `bg-gray-900` |
| Yellow accent section | #FFFBF0 | `bg-yellow-50` |

---

### Text Colors

| Level | Color | Tailwind | Use Case |
|-------|-------|----------|----------|
| Primary (Headings) | #111827 Gray-900 | `text-gray-900` | Main headings, important text |
| Secondary (Body) | #4B5563 Gray-600 | `text-gray-600` | Body text, descriptions |
| Tertiary (Meta) | #9CA3AF Gray-400 | `text-gray-500` | Labels, captions, hints |
| Disabled | #D1D5DB Gray-300 | `text-gray-400` | Disabled states |
| Inverted (on dark) | #F9FAFB Gray-50 | `text-gray-50` | Text on dark backgrounds |

---

## Typography

### Font Family

**Primary Font Stack:**
```css
font-family: 'Geist Sans', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
```

The application uses Geist Sans as the primary font, with system UI fonts as fallbacks for optimal performance.

---

### Font Sizes & Line Heights

Responsive sizing ensures readability across all device sizes.

| Size | Mobile | Desktop | Line Height | Use Case |
|------|--------|---------|-------------|----------|
| **6XL** | - | 3.75rem (60px) | 1.2 | Extra large headings |
| **5XL** | 3rem (48px) | 3rem (48px) | 1.2 | Main page titles |
| **4XL** | 2.25rem (36px) | 2.25rem (36px) | 1.2 | Large section headings |
| **3XL** | 1.875rem (30px) | 1.875rem (30px) | 1.25 | Section headings |
| **2XL** | 1.5rem (24px) | 1.5rem (24px) | 1.29 | Subsection titles |
| **XL** | 1.25rem (20px) | 1.25rem (20px) | 1.75 | Card titles |
| **LG** | 1.125rem (18px) | 1.125rem (18px) | 1.75 | Emphasis text, UI labels |
| **Base** | 1rem (16px) | 1rem (16px) | 1.5 | Body text (default) |
| **SM** | 0.875rem (14px) | 0.875rem (14px) | 1.25 | Secondary text, form labels |
| **XS** | 0.75rem (12px) | 0.75rem (12px) | 1rem | Captions, meta information |

---

### Font Weights

| Weight | Value | CSS | Tailwind | Use Case |
|--------|-------|-----|----------|----------|
| Light | 300 | `font-light` | `.font-light` | Decorative, large text only |
| Normal | 400 | `font-normal` | `.font-normal` | Body text (default) |
| Medium | 500 | `font-medium` | `.font-medium` | Form labels, secondary headings |
| Semibold | 600 | `font-semibold` | `.font-semibold` | Button text, section labels |
| Bold | 700 | `font-bold` | `.font-bold` | Headings, emphasis |
| Extrabold | 800 | `font-extrabold` | `.font-extrabold` | Main page titles, hero text |

---

## Spacing & Layout

### Container & Grid System

#### Max-Width Container
```
Max content width: 1280px (Tailwind: max-w-7xl)
```

All main content sections use this constraint for optimal reading width.

```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>
```

#### Horizontal Padding (Responsive)
| Breakpoint | Padding | Class |
|------------|---------|-------|
| Mobile | 1rem (16px) | `px-4` |
| Tablet | 1.5rem (24px) | `sm:px-6` |
| Desktop | 2rem (32px) | `lg:px-8` |

---

### Vertical Spacing

#### Section Padding
| Spacing | Rem | Pixels | Class | Use Case |
|---------|-----|--------|-------|----------|
| Small | 3rem | 48px | `py-12` | Small sections |
| Standard | 4rem | 64px | `py-16` | Most sections |
| Large | 5rem | 80px | `py-20` | Hero, featured sections |

**Responsive variants:**
- `py-12 lg:py-16` - Smaller on mobile, standard on desktop
- `py-16 lg:py-20` - Standard on mobile, larger on desktop

#### Margin Between Elements
| Size | Value | Class | Usage |
|------|-------|-------|-------|
| XS | 4px | `m-1` | Minimal spacing |
| Small | 8px | `m-2` | Compact spacing |
| Medium | 16px | `m-4` | Default spacing |
| Standard | 24px | `m-6` | Section groups |
| Large | 32px | `m-8` | Major sections |

---

### Gap (Component Spacing)

Used in flex and grid layouts for even distribution of spacing.

| Gap | Size | Tailwind | Use Case |
|-----|------|----------|----------|
| Compact | 1rem (16px) | `gap-4` | Card grids, lists |
| Standard | 1.5rem (24px) | `gap-6` | Component rows |
| Spacious | 2rem (32px) | `gap-8` | Main grid layouts |
| Extra spacious | 3rem (48px) | `gap-12` | Hero sections, major layouts |

---

## Components

### Buttons

#### Primary Button (Yellow - CTA)
```html
<button class="btn-primary">
  APPLY FOR FUNDING
</button>
```

**CSS:**
```css
.btn-primary {
  @apply inline-flex items-center justify-center px-6 py-3 
         bg-yellow-400 hover:bg-yellow-500 
         text-gray-900 font-bold rounded-full 
         transition-all duration-200 
         shadow-sm hover:shadow-md 
         whitespace-nowrap;
}

.btn-primary:active {
  @apply scale-95;
}
```

**Variant - Small:**
```html
<button class="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-full">
  Click Me
</button>
```

---

#### Secondary Button (Bordered)
```html
<button class="btn-secondary">
  EXPLORE OPPORTUNITIES
</button>
```

**CSS:**
```css
.btn-secondary {
  @apply inline-flex items-center justify-center px-6 py-3 
         border-2 border-gray-900 
         text-gray-900 font-bold rounded-full 
         hover:bg-gray-900 hover:text-white 
         transition-all duration-200 
         whitespace-nowrap;
}
```

---

#### Tertiary Button (Ghost)
```html
<a href="#" class="btn-tertiary">
  Learn More
</a>
```

**CSS:**
```css
.btn-tertiary {
  @apply inline-flex items-center justify-center px-4 py-2 
         text-gray-900 font-semibold 
         hover:text-yellow-400 
         transition-colors duration-200 
         whitespace-nowrap;
}
```

---

### Form Components

#### Text Input
```html
<input 
  type="text"
  class="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 
         focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 
         transition-all"
  placeholder="Enter your name"
/>
```

**Styling:**
- Border: `border border-gray-200`
- Focus state: `focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200`
- Text color: `text-gray-900`
- Placeholder: `placeholder-gray-500`

#### Textarea
```html
<textarea 
  class="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 
         focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 
         transition-all"
  rows="5"
  placeholder="Enter your message"
></textarea>
```

#### Form Label
```html
<label class="block text-sm font-semibold text-gray-900 mb-2">
  Email Address
</label>
```

---

### Cards

#### Feature Card
```html
<div class="bg-white rounded-lg p-8 border border-gray-100 hover:shadow-lg transition-shadow">
  <div class="text-5xl mb-4">🎵</div>
  <h3 class="text-lg font-bold text-gray-900 mb-3">Feature Title</h3>
  <p class="text-gray-600 text-sm leading-relaxed">
    Feature description goes here.
  </p>
</div>
```

**Styling:**
- Background: `bg-white`
- Border: `border border-gray-100`
- Padding: `p-8`
- Rounded: `rounded-lg`
- Hover: `hover:shadow-lg transition-shadow`

#### Stat Card
```html
<div class="bg-white rounded-xl p-6 border border-gray-100">
  <p class="text-gray-600 text-sm">Total Users</p>
  <p class="text-2xl font-bold text-gray-900 mt-2">542</p>
</div>
```

---

### Containers & Sections

#### Hero Section
```html
<section class="bg-white py-12 lg:py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Hero content */}
  </div>
</section>
```

#### Light Background Section
```html
<section class="bg-gray-50 py-16 lg:py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section content */}
  </div>
</section>
```

#### Accent Background Section (Yellow)
```html
<section class="bg-yellow-50 py-16 lg:py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section content */}
  </div>
</section>
```

#### Dark Section (Footer)
```html
<footer class="bg-gray-900 text-white py-12 lg:py-16">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Footer content */}
  </div>
</footer>
```

---

### Loading States

#### Spinner
```html
<div class="spinner h-8 w-8 border-4"></div>
```

**CSS:**
```css
.spinner {
  @apply animate-spin rounded-full border-4 border-gray-200 border-t-yellow-400;
}
```

---

## Implementation Guidelines

### When Building New Pages

1. **Always use the container pattern:**
   ```html
   <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
   ```

2. **Use established spacing:**
   - Section padding: `py-12 lg:py-16` or `py-16 lg:py-20`
   - Component gaps: `gap-8` (standard), `gap-12` (spacious)

3. **Use semantic background colors:**
   - White sections: `bg-white`
   - Light sections: `bg-gray-50`
   - Accent sections: `bg-yellow-50`
   - Dark sections: `bg-gray-900`

4. **Use color-coded text:**
   - Headings: `text-gray-900`
   - Body: `text-gray-600`
   - Secondary: `text-gray-500`

5. **Use button utilities:**
   - Primary CTAs: `.btn-primary`
   - Secondary actions: `.btn-secondary`
   - Links/tertiary: `.btn-tertiary`

6. **Use consistent typography:**
   - Headings: `font-bold` weights
   - Body: `font-normal` weight
   - Labels: `font-semibold` weight

7. **Maintain responsive design:**
   - Use Tailwind breakpoints: `sm:`, `lg:`, etc.
   - Test on mobile, tablet, desktop
   - Use responsive padding and sizing

---

### Color Usage Summary

| Element | Color | Tailwind Class |
|---------|-------|---------------|
| Primary buttons | Yellow-400 | `bg-yellow-400` |
| Primary button text | Gray-900 | `text-gray-900` |
| Secondary buttons | Gray-900 (border) | `border-gray-900` |
| Main headings | Gray-900 | `text-gray-900` |
| Body text | Gray-600 | `text-gray-600` |
| Secondary text | Gray-500 | `text-gray-500` |
| Borders | Gray-100/Gray-200 | `border-gray-100` |
| Light backgrounds | Gray-50 | `bg-gray-50` |
| White sections | White | `bg-white` |
| Dark sections | Gray-900 | `bg-gray-900` |
| Focus rings | Yellow-200 | `focus:ring-yellow-200` |
| Hover text links | Yellow-400 | `hover:text-yellow-400` |

---

### Typography Usage Summary

| Element | Font Size | Weight | Class Example |
|---------|-----------|--------|---------------|
| Hero title | 5xl-6xl | Bold (700) | `text-5xl font-bold` |
| Section heading | 4xl | Bold (700) | `text-4xl font-bold` |
| Card title | lg-xl | Bold (700) | `text-lg font-bold` |
| Body text | base | Normal (400) | `text-base` |
| Labels | sm | Semibold (600) | `text-sm font-semibold` |
| Captions | xs | Normal (400) | `text-xs` |
| Buttons | base | Bold (700) | `font-bold` |

---

## Global CSS Variables (CSS Custom Properties)

```css
:root {
  /* Primary Colors */
  --color-primary-yellow: #FEC838;
  --color-primary-yellow-dark: #F59E0B;
  --color-primary-yellow-light: #FCD34D;
  
  /* Backgrounds */
  --background: #ffffff;
  --background-secondary: #f9fafb;
  --background-tertiary: #f3f4f6;
  
  /* Text */
  --foreground: #111827;
  --foreground-secondary: #4b5563;
  --foreground-tertiary: #9ca3af;
}
```

---

## Design System Files

- **Tailwind Configuration:** `/tailwind.config.js` - Color and spacing tokens
- **Global Styles:** `/app/globals.css` - Utility classes and form elements
- **Design System:** `/DESIGN_SYSTEM.md` - This document

---

## Quick Reference: Copy-Paste Components

### Primary Button
```html
<button class="btn-primary">
  ACTION LABEL
</button>
```

### Card
```html
<div class="bg-white rounded-lg p-8 border border-gray-100 hover:shadow-lg transition-shadow">
  {/* Content */}
</div>
```

### Section
```html
<section class="py-16 lg:py-20 bg-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Content */}
  </div>
</section>
```

### Light Section
```html
<section class="py-16 lg:py-20 bg-gray-50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Content */}
  </div>
</section>
```

### Grid Layout
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Items */}
</div>
```

### Form Input
```html
<input 
  type="text"
  class="w-full px-4 py-3 border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 
         focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-200 
         transition-all"
  placeholder="Placeholder text"
/>
```

---

## Notes

- All color values use Tailwind color classes for consistency
- Maintain the 4px spacing scale for all measurements
- Use utility classes first; create custom classes only when necessary
- Test all pages on mobile, tablet, and desktop
- Ensure sufficient color contrast for accessibility (WCAG AA standard)

---

**Last Updated:** April 2026  
**Version:** 1.0
