# Stratagentic.ai Landing Page Design Guidelines

## Design Approach
**Reference-Based**: Recreate the aesthetic and tone of has.works - minimalist, high-contrast design with visionary, transformative messaging.

## Color System
- **Primary Blue**: #2563EB (hsl 217 84% 53%) - main accent color for CTAs and highlights
- **Secondary Dark Blue**: #051538 (hsl 221 84% 12%) - deep background color
- **Tertiary Teal**: #14B8AB (hsl 175 80% 40%) - secondary accent color
- **Tertiary Dark Teal**: #063733 (hsl 175 80% 12%) - dark teal variant
- **Base Black**: #000000 - primary dark backgrounds
- **Base White**: #ffffff - primary light backgrounds and text
- **Light Background**: #f8f8f8 - alternate section backgrounds
- **Text Dark**: #111111
- **Text Light**: #eeeeee

## Typography
- **Font Family**: Inter (all headings and body text)
- **Fluid Sizing**: Use responsive clamp() approach
  - H1: Large hero text (2rem to 4rem responsive range)
  - H2: Section headings (1.75rem to 3rem)
  - H3: Subsection headings (1.25rem to 2rem)
  - Body: Base text (1rem to 1.125rem)
  - Manifesto: Large block text (3rem to 5rem) - bold, tight tracking
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
- **Background**: White
- **Content**: Vertically and horizontally centered
- **Focal Image**: Centered image above headline
- **Heading**: "Let's make work, feel like less work."
- **CTA**: Simple button "→ Get started"
- **Style**: Minimal, clean, inspired by has.works

### 2. Accordion Grid Section
- **Background**: White
- **Layout**: Grid of accordion items for different service categories
- **Categories**: Intelligence & Strategy, Automation & Integration, Experience & Interaction, Growth & Momentum
- **Interaction**: Click to expand/collapse content

### 3. Value Proposition Section (Light Background)
- **Background**: White
- **Title**: "YOUR SERVICES (03)"
- **Layout**: Three-column responsive grid
- **Columns**: 
  - Targeted strategy
  - Custom system build  
  - Scaled execution
- **Accent**: Blue highlights on hover

### 4. Manifesto Section (Light Background)
- **Background**: White (#ffffff)
- **Content**: Large, bold text block (3xl-5xl size)
- **Text Color**: Black
- **Max Width**: 4xl container
- **Text**: Visionary messaging about building better systems
- **Style**: Creates visual impact through large typography forming a text block

### 5. Offerings Section (Light Background)
- **Background**: White
- **Title**: "YOUR OFFERINGS (03)"
- **Layout**: Three-column grid
- **Cards**: Border cards with hover effects (border changes to blue)
- **Pricing**: No pricing amounts shown

### 6. Results Section (Light Background)
- **Background**: White
- **Title**: "YOUR RESULTS (02)"
- **Layout**: Two-column grid with image cards
- **Images**: Case study visuals with text overlays
- **Style**: Dark gradient overlays for text readability

### 7. Contact Section (Light Background)
- **Background**: White
- **Title**: "Ready to begin your transformation?"
- **Form**: Contact form with name, email, company, message fields
- **Email**: Direct email link (hello@stratagentic.ai) with blue hover
- **Text Color**: Black

### 8. Footer (Light Background)
- **Background**: White
- **Content**: "© 2025 Stratagentic. You create better systems for a better world."
- **Text Color**: Black, subtle

## Component Specifications

### Buttons
- **Primary CTA**: Blue background (#2563EB), white text
- **Hover State**: Subtle elevation effect
- **Border**: Clean, minimal styling

### Grid System
- **Three-Column Grid**: Auto-fit layout, minimum 280px per column, 32px gap between items
- **Responsive**: Automatically collapses to fewer columns on smaller screens

### Section Design
- **Background**: Primarily white throughout for clean aesthetic
- **Borders**: Black borders between sections
- **Consistent vertical padding**: Using Level 7-8 spacing (64-80px)
- **Horizontal padding**: Using Level 3 spacing (24px)

## Animation & Interaction

### Scroll Animations
- **Fade-In Effect**: All sections start with opacity 0, translate 40px down
- **Trigger**: IntersectionObserver at 10% threshold
- **Duration**: 0.8s ease transition for both opacity and transform
- **Once Only**: Animation triggers once, doesn't repeat

### Hover Effects
- **Service Cards**: Blue accent color on text
- **Offering Cards**: Blue border on hover
- **Buttons**: Subtle elevation and transform
- **Links**: Blue color on hover

## Copywriting Voice
- **Perspective**: Always second-person (you/your), never first-person (we/our/us)
- **Tone**: Visionary, calm, transformative
- **Theme**: Progress, efficiency, clarity, building better systems
- **Language**: Direct, confident, improvement-focused

## Images
- **Hero Section**: Focal image (centered, above headline)
- **Results Section**: Two case study images with dark gradient overlays
- **Treatment**: Images support content, never overwhelm messaging

## Technical Requirements
- **Responsive Design**: Mobile-first, fluid typography and spacing
- **Cross-browser**: Modern browser standards
- **Performance**: Optimized images, efficient animations
- **Accessibility**: Proper semantic HTML, ARIA labels where needed
