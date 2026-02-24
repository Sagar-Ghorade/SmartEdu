# SmartEdu Style Guide 🎨

A comprehensive guide to the modern design system, components, and usage patterns.

---

## 🎨 Color System

### Primary Colors (Indigo)
Used for main actions, navigation, and primary elements.

```
primary-50:   #f0f4ff  (Lightest - backgrounds)
primary-100:  #e0e7ff
primary-200:  #c7d2fe
primary-300:  #a5b4fc
primary-400:  #818cf8
primary-500:  #6366f1  (Standard)
primary-600:  #4f46e5  (Default - buttons, links)
primary-700:  #4338ca
primary-800:  #3730a3
primary-900:  #312e81  (Darkest)
```

**Usage**: Primary buttons, active navigation, main CTAs, form focus states

### Secondary Colors (Purple)
Used for secondary actions and accents.

```
secondary-50:   #faf5ff
secondary-100:  #f3e8ff
secondary-200:  #e9d5ff
secondary-300:  #d8b4fe
secondary-400:  #c084fc
secondary-500:  #a855f7
secondary-600:  #9333ea
secondary-700:  #7e22ce
secondary-800:  #6b21a8
secondary-900:  #581c87
```

**Usage**: Secondary buttons, alternative actions, hover states

### Accent Colors (Orange)
Used for highlights, success states, and attention-grabbing elements.

```
accent-50:  #fef3c7
accent-100: #fde68a
accent-200: #fcd34d
accent-300: #fbbf24
accent-400: #f59e0b (Standard)
accent-500: #f97316
accent-600: #ea580c
accent-700: #c2410c
accent-800: #92400e
accent-900: #78350f
```

**Usage**: High emphasis CTAs, notifications, alerts

### Status Colors

```
success: #10b981 (Green)   - Success states, checkmarks
warning: #f59e0b (Yellow)  - Warnings, pending states
danger:  #ef4444 (Red)     - Errors, destructive actions
```

### Neutral/Dark Colors

```
dark-50:   #f9fafb
dark-100:  #f3f4f6
dark-200:  #e5e7eb
dark-300:  #d1d5db
dark-400:  #9ca3af
dark-500:  #6b7280
dark-600:  #4b5563
dark-700:  #374151
dark-800:  #1f2937  (Dark mode background)
dark-900:  #111827  (Darker background)
dark-950:  #030712  (Darkest)
```

---

## 📝 Typography

### Fonts
- **Display Font**: `Poppins` (Headers, large text)
- **Body Font**: `Inter` (Content, descriptions)

### Font Sizes

```
xs:      0.75rem   (12px)  - Small labels, hints
sm:      0.875rem  (14px)  - Secondary text
base:    1rem      (16px)  - Body text
lg:      1.125rem  (18px)  - Large text
xl:      1.25rem   (20px)  - Section headers
2xl:     1.5rem    (24px)  - Page subheadings
3xl:     1.875rem  (30px)  - Section titles
4xl:     2.25rem   (36px)  - [Page headers
5xl:     3rem      (48px)  - Hero titles
6xl:     3.75rem   (60px)  - Large hero text
```

### Font Weights

```
100 (Thin)      - Rarely used
300 (Light)     - Subtle text
400 (Regular)   - Body text (default)
500 (Medium)    - UI labels, secondary text
600 (Semibold)  - Headings, emphasis
700 (Bold)      - Strong emphasis
800 (Extrabold) - Hero titles
900 (Black)     - Maximum emphasis
```

### Typography Classes

```css
.text-h1    /* 4xl-6xl, bold, tracking-tight     */
.text-h2    /* 3xl-4xl, bold, tracking-tight     */
.text-h3    /* 2xl-3xl, semibold, tracking-tight */
.text-h4    /* xl-2xl, semibold                   */
.text-body-lg   /* lg, regular, text-gray-600    */
.text-body      /* base, regular, text-gray-600  */
.text-body-sm   /* sm, regular, text-gray-500    */
```

---

## 🎛️ Component Library

### Buttons

#### Primary Button
```jsx
<button className="btn-primary">
  Click me
</button>
```
**Style**: Solid primary color background
**States**: Hover (darker), Active (darker still), Disabled (opacity)
**Usage**: Main CTAs, form submissions

#### Secondary Button
```jsx
<button className="btn-secondary">
  Secondary action
</button>
```
**Style**: Solid secondary (purple) background
**Usage**: Alternative actions

#### Outline Button
```jsx
<button className="btn-outline">
  Learn more
</button>
```
**Style**: Bordered primary color, transparent background
**Usage**: Less prominent actions, links

#### Ghost Button
```jsx
<button className="btn-ghost">
  Minor action
</button>
```
**Style**: Minimal styling, hover background only
**Usage**: Navigation, menu items

#### Size Variants
```jsx
<button className="btn-primary btn-sm">Small</button>
<button className="btn-primary">Default</button>
<button className="btn-primary btn-lg">Large</button>
```

### Cards

#### Basic Card
```jsx
<div className="card">
  <h3 className="text-h4">Card Title</h3>
  <p>Card content goes here</p>
</div>
```
**Style**: White background with shadow, rounded corners
**Padding**: p-6 (default)

#### Interactive Card
```jsx
<div className="card-interactive">
  Hover to see lift effect
</div>
```
**Style**: Card with hover animation (-translateY-1)

#### Glass Card (Frosted)
```jsx
<div className="glass">
  Frosted glass effect
</div>
```
**Style**: Semi-transparent background with backdrop blur

### Inputs

#### Standard Input
```jsx
<input 
  type="text" 
  placeholder="Enter text"
  className="input-field"
/>
```
**Style**: Gray border, focus ring, dark mode support
**States**: Focus (ring + border), Error, Disabled

#### With Icon
```jsx
<div className="relative">
  <FiMail className="absolute left-3 top-3.5 w-5 h-5" />
  <input className="input-field pl-10" />
</div>
```

### Badges

```jsx
<span className="badge-primary">Primary</span>
<span className="badge-success">Success</span>
<span className="badge-warning">Warning</span>
<span className="badge-danger">Danger</span>
```

**Styles**: Color-coded backgrounds with matching text
**Usage**: Status indicators, labels, tags

---

## 🎭 Effects & Utilities

### Shadow Levels

```css
shadow-sm     /* Light shadow */
shadow        /* Base shadow (default) */
shadow-md     /* Medium shadow */
shadow-lg     /* Large shadow */
shadow-xl     /* Extra large shadow */
shadow-2xl    /* Maximum shadow */
shadow-glow   /* Primary color glow */
shadow-glow-secondary /* Secondary color glow */
```

### Border Radius

```css
rounded-xs    /* 0.25rem (4px) */
rounded-sm    /* 0.375rem (6px) */
rounded       /* 0.5rem (8px) */
rounded-md    /* 0.75rem (12px) */
rounded-lg    /* 1rem (16px) */
rounded-xl    /* 1.25rem (20px) */
rounded-2xl   /* 1.5rem (24px) */
rounded-3xl   /* 2rem (32px) */
```

### Gradients

```css
gradient-primary        /* Indigo to purple */
gradient-primary-subtle /* Soft version */
gradient-text          /* Text gradient effect */
```

### Animations

```css
animate-fade-in    /* Fade in effect (0.3s) */
animate-slide-up   /* Slide up effect (0.3s) */
animate-slide-down /* Slide down effect (0.3s) */
animate-pulse-slow /* Slow pulse (3s) */
```

---

## 📐 Spacing System

Using standard Tailwind spacing scale:

```
px-2    py-2    /* 0.5rem (8px) */
px-3    py-3    /* 0.75rem (12px) */
px-4    py-4    /* 1rem (16px) */
px-6    py-6    /* 1.5rem (24px) */
px-8    py-8    /* 2rem (32px) */
```

### Container Utilities

```css
.container-max    /* max-width: 80rem (1280px) */
.container-padding /* px-4 sm:px-6 lg:px-8 */
.section-container /* container-max + container-padding + py */
```

---

## 🌙 Dark Mode

All colors have dark equivalents. Toggle with `dark:` prefix:

```jsx
<div className="bg-white dark:bg-dark-900">
  Content that adapts to theme
</div>

<p className="text-gray-900 dark:text-white">
  Text that changes color
</p>

<button className="bg-primary-600 dark:bg-primary-700">
  Button with dark variant
</button>
```

---

## 🎯 Layout Patterns

### Responsive Grid

```jsx
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Column 1</div>
  <div>Column 2</div>
  <div>Column 3</div>
</div>
```

**Responsive behavior:**
- Mobile: 1 column
- sm (640px+): 2 columns
- lg (1024px+): 3 columns
- Gap: 24px (adjusted for smaller screens)

### Flex Layout

```jsx
<div className="flex items-center justify-between gap-4">
  <div>Left content</div>
  <div>Right content</div>
</div>
```

### Container Alignment

```jsx
<div className="container-max container-padding">
  <!-- Content will be max-width with padding -->
</div>
```

---

## 🎨 Component Combinations

### Form Group

```jsx
<div className="space-y-2">
  <label className="block text-sm font-semibold">Label</label>
  <input className="input-field" />
  <p className="text-sm text-gray-500">Helper text</p>
</div>
```

### Card with Content

```jsx
<div className="card">
  <div className="flex items-start justify-between mb-4">
    <div>
      <h3 className="text-h4">Title</h3>
      <p className="text-sm text-gray-600">Subtitle</p>
    </div>
    <button className="btn-ghost">Action</button>
  </div>
  <div className="divider my-4"></div>
  <p>Content</p>
</div>
```

### Section with Header

```jsx
<div className="section-container">
  <div className="mb-8">
    <h2 className="text-h2 mb-3">Section Title</h2>
    <p className="text-body-lg text-gray-600">Subtitle</p>
  </div>
  {/* Content grid */}
</div>
```

---

## 🎬 Animation Patterns

### Page Entry Animation

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

### Staggered Children

```jsx
<motion.div
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

### Hover Animation

```jsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>
  Interactive Button
</motion.button>
```

---

## 📱 Responsive Breakpoints

```
Mobile (default): < 640px
sm: 640px+
md: 768px+
lg: 1024px+
xl: 1280px+
2xl: 1536px+
```

**Design approach**: Mobile-first, progressive enhancement

---

## ♿ Accessibility

### ARIA Labels
```jsx
<button aria-label="Close menu">×</button>
<div role="status" aria-live="polite">Message</div>
```

### Focus States
All interactive elements have visible focus states:
```css
focus:outline-none
focus:ring-2
focus:ring-primary-500
focus:ring-offset-2
```

### Semantic HTML
- Use `<button>` for buttons
- Use `<input>` with proper `type`
- Use `<label>` with `htmlFor`
- Use heading hierarchy (h1 → h2 → h3)

---

## 🖼️ Design Tokens Summary

| Token | Value | Usage |
|-------|-------|-------|
| Primary | Indigo-600 | Main actions |
| Secondary | Purple-600 | Alternate actions |
| Accent | Orange-400 | Highlights |
| Body Font | Inter | Content |
| Display Font | Poppins | Headers |
| Border Radius | 1rem | Cards, buttons |
| Shadow | 0 4px 6px | Depth |
| Max Width | 80rem | Content container |

---

## 📚 Component Checklist

- ✅ Buttons (primary, secondary, outline, ghost)
- ✅ Cards (basic, interactive, glass)
- ✅ Inputs (text, select, with icons)
- ✅ Forms (labels, helpers, validation)
- ✅ Navigation (navbar, sidebar, breadcrumbs)
- ✅ Badges (colored status indicators)
- ✅ Modals (coming soon)
- ✅ Dropdowns (profile, notifications)
- ✅ Tables (coming soon)
- ✅ Tooltips (coming soon)

---

## 🚀 Best Practices

1. **Always use semantic HTML** over divs
2. **Mobile-first** when building components
3. **Consistent spacing** using spacing scale
4. **Accessible colors** with sufficient contrast
5. **Meaningful animations** (purpose not decoration)
6. **Progressive enhancement** - works without JS
7. **Keyboard navigation** for all interactive elements
8. **Responsive images** with srcset

---

**Last Updated**: February 22, 2026
**Design System Version**: 1.0
**Compliance**: WCAG 2.1 AA
