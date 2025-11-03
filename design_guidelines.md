# Stratagentic.ai Landing Page Design Guidelines

## Design Approach
**Reference-Based**: Recreate the aesthetic and tone of has.works - minimalist, high-contrast, monochrome-dominant design with visionary, transformative messaging.

## Color System
- **Primary Dark**: #000000 (dominant background)
- **Secondary White**: #ffffff (primary text)
- **Accent Green**: #00FF85 (highlight/CTA color - neon green)
- **Accent Light**: #f8f8f8 (alternate background sections)
- **Text Dark**: #111111
- **Text Light**: #eeeeee

## Typography
- **Font Family**: Inter (all headings and body text)
- **Fluid Sizing**: Use responsive clamp() approach
  - H1: Large hero text (2rem to 4rem responsive range)
  - H2: Section headings (1.75rem to 3rem)
  - H3: Subsection headings (1.25rem to 2rem)
  - Body: Base text (1rem to 1.125rem)
- **Style**: Bold, generous sizing with high contrast against backgrounds

## Spacing System
8-point grid system with consistent tokens:
- Level 1: 8px (tight spacing)
- Level 2: 16px (compact)
- Level 3: 24px (standard)
- Level 4: 32px (comfortable)
- Level 5: 40px (spacious)
- Level 6: 48px (section margins)
- Level 7: 64px (section padding)
- Level 8: 80px (generous spacing)

## Layout Structure

### 1. Hero Section (Full Viewport)
- **Background**: Looping video (calm ripple/gradient animation) at 40% opacity
- **Content**: Vertically and horizontally centered
- **Heading**: "Your business becomes faster, smarter, lighter."
- **Subheading**: "You unlock efficiency and scale with intelligent systems designed for progress."
- **CTA**: Neon green button "Start your transformation"
- **Treatment**: Dark overlay with white text, video creates subtle motion

### 2. Value Proposition Section (Light Background)
- **Background**: Light accent (#f8f8f8)
- **Title**: "Your value-driven automation"
- **Layout**: Three-column responsive grid (auto-fit, minimum 280px columns)
- **Columns**: 
  - Targeted strategy
  - Custom system build  
  - Scaled execution
- **Text Color**: Dark for readability on light background

### 3. Better World Section (Dark Background)
- **Background**: Primary dark (#000000)
- **Title**: "A better world starts within your business"
- **Content**: Short, poetic paragraph about innovation and progress
- **Text Color**: Light (#eeeeee)

### 4. Offerings Section (Light Background)
- **Background**: Light accent (#f8f8f8)
- **Title**: "Your offerings"
- **Layout**: Three-column grid
- **Pricing Tiers**:
  - Single automation — from 30,000 NOK/month
  - Scaled AI system — from 60,000–120,000 NOK/month
  - Enterprise bespoke — custom roadmap
- **Text Color**: Dark

### 5. Case Studies Section (Dark Background)
- **Background**: Primary dark (#000000)
- **Title**: "Your results"
- **Layout**: Two cards with images and result descriptions
- **Images**: Case study visuals with short result text overlays
- **Text Color**: Light

### 6. Contact Section (Dark Background)
- **Background**: Primary dark (#000000)
- **Title**: "Ready to begin your transformation?"
- **CTA**: Email link (hello@stratagentic.ai) styled as neon green button
- **Text Color**: Light

### 7. Footer (Minimal)
- **Background**: Primary dark
- **Content**: "© 2025 Stratagentic. You create better systems for a better world."
- **Text Color**: Light, subtle

## Component Specifications

### Buttons
- **Primary CTA**: Neon green background (#00FF85), black text
- **Hover State**: Darker green (#00e673)
- **When on Hero Images**: Blurred background behind button for visibility
- **No Active/Hover Interactions**: For image-overlay buttons

### Grid System
- **Three-Column Grid**: Auto-fit layout, minimum 280px per column, 32px gap between items
- **Responsive**: Automatically collapses to fewer columns on smaller screens

### Section Alternation
- Strict pattern: Dark → Light → Dark → Light → Dark → Dark → Dark
- Consistent vertical padding using Level 7 spacing (64px)
- Horizontal padding using Level 3 spacing (24px)

## Animation & Interaction

### Scroll Animations
- **Fade-In Effect**: All sections start with opacity 0, translate 40px down
- **Trigger**: IntersectionObserver at 10% threshold
- **Duration**: 0.8s ease transition for both opacity and transform
- **Once Only**: Animation triggers once, doesn't repeat

### Video Background
- **Format**: MP4, looping
- **Opacity**: 40% to maintain readability
- **Style**: Calm, subtle motion (ripple or gradient effect)

## Copywriting Voice
- **Perspective**: Always second-person (you/your), never first-person (we/our/us)
- **Tone**: Visionary, calm, transformative
- **Theme**: "A better world, an improved world" - focus on progress, efficiency, clarity
- **Paragraph Length**: Maximum 25 words per paragraph
- **Language**: Direct, confident, improvement-focused

## Images
- **Hero Section**: Video background (ripple-bg.mp4) providing subtle animated texture
- **Case Studies**: Two case study images (e.g., case1.jpg) showing real project results
- **Treatment**: Images support content, never overwhelm messaging

## Technical Requirements
- **File Structure**: Separate index.html, style.css, script.js, /assets folder
- **Responsive Design**: Mobile-first, fluid typography and spacing
- **Cross-browser**: Modern browser standards, graceful degradation
- **Performance**: Optimized video, efficient animations, minimal dependencies