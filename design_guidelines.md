# Network Canvas (NetVas) Design Guidelines

## Design Approach
**Selected Approach:** Design System - Material Design 3  
**Justification:** NetVas is a technical productivity tool requiring clarity, efficiency, and professional aesthetics. Material Design 3 provides excellent patterns for tools with complex interactions, sidebars, and canvas-based editing while maintaining accessibility and modern appeal.

**Key Design Principles:**
1. Clarity First - Interface must never compete with canvas content
2. Efficient Workflows - Minimize clicks and cognitive load for technical users
3. Professional Polish - Clean, modern aesthetics that inspire confidence
4. Touch-Friendly - All interactive elements sized for both mouse and touch input

---

## Typography System

**Font Family:** Inter (Google Fonts) for UI, JetBrains Mono for technical labels/IDs

**Hierarchy:**
- Page Titles: text-3xl font-bold (Landing page hero)
- Section Headers: text-xl font-semibold 
- Canvas Toolbar Items: text-sm font-medium
- Sidebar Device Labels: text-base font-medium
- Device Node Labels: text-sm
- Footer/Secondary Text: text-sm font-normal
- Technical IDs/Metadata: text-xs font-mono

---

## Layout System

**Spacing Primitives:** Tailwind units of 2, 4, 6, and 8 (e.g., p-2, m-4, gap-6, h-8)

**Breakpoints Strategy:**
- Mobile (<768px): Single column, drawer sidebar, full-width canvas
- Tablet (768px-1024px): Collapsible sidebar (240px), remaining canvas
- Desktop (>1024px): Fixed sidebar (280px), spacious canvas area

**Key Measurements:**
- Header/Toolbar Height: h-14 (56px)
- Sidebar Width (Desktop): w-70 (280px)
- Sidebar Width (Tablet): w-60 (240px)
- Device Icon Size: w-12 h-12 (48px) - touch-friendly
- Canvas Minimum Padding: p-4 on mobile, p-8 on desktop

---

## Component Library

### Landing Page (`/`)
**Hero Section:**
- Centered layout with max-w-4xl container
- Large heading (text-5xl font-bold) with "Network Canvas" 
- Subheading explaining tool purpose (text-xl)
- Primary CTA button (h-12 px-8 text-lg) with arrow icon
- Hero image showing canvas preview screenshot (16:9 ratio, rounded-lg border)

**Feature Grid:**
- 3-column grid (grid-cols-1 md:grid-cols-3 gap-6)
- Feature cards with icon (Lucide), title (text-lg font-semibold), description
- Cards with subtle elevation and padding (p-6)

**Footer:**
- Simple centered layout with copyright, minimal links
- Height: h-16, text-sm

### Canvas Page (`/canvas`)

**Header/Toolbar:**
- Sticky top position (sticky top-0 z-50)
- Flex layout with logo left, tools center, actions right
- Tool buttons: Icon + label, active state indication
- Minimum touch target: h-10 w-10 for icon-only buttons
- Group tools with gap-2, separated by dividers (w-px h-6)

**Sidebar (Desktop):**
- Fixed position (fixed left-0 top-14 h-[calc(100vh-3.5rem)])
- Header section: "Devices" title + collapse button
- Device grid: grid-cols-2 gap-4 p-4
- Device cards: Centered icon, label below, hover elevation
- Scrollable content area (overflow-y-auto)

**Sidebar (Mobile):**
- Drawer overlay with backdrop (fixed inset-0 z-40)
- Slide-in animation from left
- Close button (top-right, absolute)
- Same device grid as desktop

**Canvas Area:**
- Flex-grow to fill remaining space
- Subtle grid pattern background (optional visual aid)
- Drop zone indicator when dragging (dashed border animation)
- Pan/zoom controls (bottom-right absolute position)
- Padding: p-4 on mobile, p-8 on desktop for content breathing room

**Device Nodes (on Canvas):**
- Card style with subtle elevation
- Icon at top (w-8 h-8), label below (text-sm text-center)
- Selected state: Distinct border treatment
- Node dimensions: min-w-24 (96px) for consistent sizing
- Connection points clearly visible on hover

**Connection Lines:**
- Clean, simple lines (stroke-width: 2)
- Directional arrows if needed
- Hover state for interaction feedback

### Shared Components

**Buttons:**
- Primary: h-10 px-6 rounded-md font-medium
- Icon-only: h-10 w-10 rounded-md (minimum touch target)
- Ghost variant for toolbar items
- Active state: Clear visual distinction

**Cards:**
- Rounded corners: rounded-lg
- Standard padding: p-4 or p-6 depending on context
- Subtle shadow for elevation

**Modals/Dialogs (if needed):**
- Centered overlay with backdrop
- Max-width: max-w-md for forms, max-w-2xl for complex content
- Padding: p-6
- Close button (top-right)

---

## Responsive Behavior

**Mobile (<768px):**
- Hamburger menu for sidebar (top-left in header)
- Canvas full-width with minimal padding
- Toolbar icons collapse to essential tools only
- Touch gestures for pan/zoom

**Tablet (768px-1024px):**
- Collapsible sidebar with toggle button
- Canvas adapts to available space
- All toolbar items visible

**Desktop (>1024px):**
- Full sidebar always visible (optional collapse)
- Spacious canvas area
- Keyboard shortcuts visible in tooltips

---

## Interaction Patterns

**Drag & Drop:**
- Visual feedback when dragging (opacity-50 on source, cursor-grabbing)
- Clear drop zone indication
- Smooth animations (transition-transform duration-200)

**Selection:**
- Click to select device node
- Multi-select with Shift/Ctrl (desktop)
- Selected state visually distinct

**Canvas Navigation:**
- Pan: Click and drag on empty canvas
- Zoom: Scroll wheel or pinch gesture
- Reset view button in controls

---

## Accessibility Standards

- All interactive elements minimum 44px touch target
- Keyboard navigation for all canvas operations
- ARIA labels for icon-only buttons
- Focus indicators clearly visible
- Semantic HTML structure throughout

---

## Images

**Landing Page Hero Image:**
- Large, high-quality screenshot of canvas editor in action
- Shows network topology with router, switch, and PC nodes connected
- Professional, polished appearance demonstrating tool capability
- Placement: Below headline and CTA, centered, max-w-5xl
- Aspect ratio: 16:9, rounded corners (rounded-lg), subtle shadow

This design creates a professional, efficient interface for network visualization while maintaining modern aesthetics and excellent usability across all devices.