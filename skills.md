# Agent Skills for Building the EventFlow Website Accurately

Use this skill guide as an execution checklist for building the EventFlow website from the provided page references.

---

## 1. Core Agent Role

You are a **prompt-to-product web agent**. Your job is to convert approved markdown prompts into a clean, responsive, visually accurate website.

You must focus on:
- Accurate section structure
- Accurate layout hierarchy
- Accurate visual styling
- Accurate content placement
- Accurate component behavior
- Accurate responsive behavior

---

## 2. Primary Objectives

Build the website to match the reference pages as closely as possible.

The site includes:
- Home page
- Events page
- Feedback page

Your output should feel like a real polished SaaS product, not a rough draft.

---

## 3. Required Agent Skills

## A. Prompt Interpretation Skill
You must read and follow the provided markdown prompts literally.

### You should extract:
- Page sections
- Component hierarchy
- Content requirements
- Visual design rules
- Responsive rules
- Functional requirements

### Do:
- Follow section order exactly
- Preserve all important content
- Keep labels, headings, and CTA text accurate
- Maintain intended hierarchy

### Do not:
- Invent unrelated sections
- Change the product concept
- Randomly redesign the layout
- Ignore small UI details

---

## B. Visual Replication Skill
You must recreate the visual style from the screenshots with high accuracy.

### Pay close attention to:
- Navbar style
- Button shapes
- Card radius
- Shadows
- Typography scale
- Spacing rhythm
- Badge styles
- Background colors
- Section separation

### Important:
- Match the look and feel of a modern SaaS UI
- Keep the design clean and premium
- Avoid generic template styling

---

## C. Layout Construction Skill
Build each page using a clear and consistent layout system.

### Use:
- A centered container
- Consistent section padding
- Grid systems for cards
- Flexbox for navbars and action rows
- Responsive breakpoints

### Recommended structure:
- Desktop-first if needed, then adapt down
- Or mobile-safe responsive layout from the start

---

## D. Component Building Skill
Create reusable components wherever possible.

### Core components:
- Navbar
- Footer
- Button
- Badge
- Card
- Section header
- Rating stars
- Event card
- Testimonial card
- Filter pill
- Input field
- Textarea
- Dropdown
- Stat card
- Feature card
- CTA banner

### Component rules:
- Keep styles consistent
- Use variants for primary/secondary buttons
- Use reusable badge styles
- Use reusable card shells

---

## E. Content Accuracy Skill
Use the exact content from the markdown prompts unless the user asks for changes.

### Must preserve:
- Headings
- Subheadings
- CTA labels
- Event names
- Event descriptions
- Stats
- Ratings
- Review counts
- Footer text
- Privacy note text

### Important:
Do not paraphrase important UI copy unless necessary.

---

## F. Responsive Design Skill
The website must work across screen sizes.

### Breakpoints to support:
- Desktop: 1200px and above
- Laptop: 1024px to 1199px
- Tablet: 768px to 1023px
- Mobile: below 768px

### Responsive behavior:
- Navbar collapses on smaller screens if needed
- 3-column grids become 2-column then 1-column
- Forms become full-width
- Buttons stack when needed
- Cards maintain readability

---

## G. UI Precision Skill
Small details matter.

### You must carefully handle:
- Border radius consistency
- Button padding
- Icon alignment
- Card padding
- Label spacing
- Input height
- Star rating alignment
- Badge positioning
- Section spacing

### Target:
The final result should look intentionally designed, not assembled.

---

## H. Interaction Readiness Skill
Even if backend is not included, the UI should behave like a real product.

### Include:
- Hover states
- Active nav states
- Selected filter states
- Selected recommendation state
- Button transitions
- Form focus states
- Card hover effects where appropriate

### If using React:
- Keep components state-ready
- Use controlled inputs where needed
- Prepare filter/search logic structure

---

## I. Image Prompt Readiness Skill
When website images are needed, use the provided image prompts exactly as asset-generation directions.

### For each image:
- Identify where it belongs
- Generate or select an image that matches the prompt
- Keep style consistent across all cards
- Use proper aspect ratios
- Optimize for web use

### Image placement:
- Home testimonial avatar
- Home analytics avatar stack
- Events page event thumbnails
- Feedback page icons if needed

---

## J. Quality Control Skill
Before final output, review the implementation against the prompts.

### Checklist:
- Are all sections present?
- Is the content accurate?
- Is the layout responsive?
- Are buttons and cards styled correctly?
- Is typography consistent?
- Are colors consistent?
- Are all images placed properly?
- Is spacing visually balanced?

---

## 4. Page-Specific Agent Instructions

---

# Home Page Build Instructions

## Sections to build in order:
1. Navbar
2. Hero section
3. Stats row
4. Live pulse ticker
5. Features section
6. Analytics section
7. CTA banner
8. Footer

## Accuracy priorities:
- Hero must be two-column on desktop
- Right-side testimonial card must be prominent
- Stats must sit under hero content
- Feature cards must be 3 in a row
- Analytics section must include chart card
- CTA banner must be gradient with strong contrast

## Must-match details:
- “Your Feedback Shapes Better Events”
- “Explore Events”
- “Share Feedback”
- 1,200+ / 98k+ / 4.9
- “Why EventFlow Matters”
- 3 feature cards
- “From Single Rating to Actionable Dashboard”
- “Ready to make your voice heard at the next summit?”

---

# Feedback Page Build Instructions

## Sections to build in order:
1. Navbar
2. Page header
3. Feedback form card
4. Privacy note
5. Footer

## Accuracy priorities:
- Centered header
- Large white form card
- Event dropdown
- Overall star rating
- 3 detailed evaluation cards
- 2 textarea sections
- Recommendation option cards
- Optional notes field
- Clear Entries and Submit Feedback buttons

## Must-match details:
- “Share Your Feedback”
- “TAKES ONLY 2 MINUTES • VERIFIED ATTENDEE FORM”
- “Select Event *”
- “Overall Experience *”
- “Detailed Evaluation”
- “What did you like most about the event?”
- “What could be improved?”
- “Would you recommend this event to peers?”
- “Additional Notes”
- “Submit Feedback”
- “Clear Entries”

---

# Events Page Build Instructions

## Sections to build in order:
1. Navbar
2. Events header
3. Search/filter bar
4. Event cards grid
5. Load more section
6. Trust highlights
7. Footer

## Accuracy priorities:
- Header with stats on the right
- Search input and filter pills
- 3-column event card grid
- Event image cards with overlay badges
- Ratings and review counts
- View Details and Give Feedback buttons
- Load more section
- 3 trust highlight items

## Must-match details:
- “Explore Events”
- “REAL-TIME SENTIMENT & VERIFICATION”
- “Search by event name, topic, or venue...”
- “All Events”
- “Upcoming”
- “Past”
- “Feedback Open”
- “Most Recent”
- “All Categories”
- “Technology & AI”
- “Web Development”
- “Design & UX”
- “Startups & Biz”
- “Showing 6 verified events”
- “Load More Events”
- “Displaying 6 of 28 curated tech gatherings”

---

## 5. Design Tokens Agent Should Follow

Use these as a base unless the implementation system requires adjustment.

### Colors
- Primary: indigo / violet
- Background: #f7f7fb or similar very light gray
- Card background: #ffffff
- Text primary: #111827 or similar dark navy
- Text secondary: #6b7280 or similar gray
- Border: #e5e7eb or similar light border
- Star color: #f59e0b or similar amber
- Success green: #10b981 or similar

### Typography
- Font: Inter, SF Pro, or similar modern sans-serif
- H1: 48–64px desktop
- H2: 32–40px desktop
- Section label: 12–14px uppercase, letter-spaced
- Body: 16px
- Small text: 13–14px

### Radius
- Buttons: 10–14px
- Cards: 16–24px
- Inputs: 12–16px
- Pills: 999px

### Shadows
- Use soft shadows only
- Avoid harsh dark shadows
- Example:
  - 0 10px 30px rgba(15, 23, 42, 0.06)

---

## 6. Implementation Rules

### Do:
- Build reusable components
- Keep class naming consistent
- Use semantic HTML
- Maintain accessibility basics
- Keep spacing consistent
- Use responsive grids

### Avoid:
- Random colors
- Excessive gradients except CTA
- Overly decorative effects
- Inconsistent card heights
- Cramped sections
- Low-contrast text

---

## 7. Acceptance Criteria

The build is successful only if:

- All 3 pages are included
- Each page matches its markdown prompt
- The layout is responsive
- The design looks like the screenshots in structure and style
- All important text content is present
- Buttons, filters, cards, and forms are visually accurate
- Image prompts are used correctly for visual assets

---

## 8. Final Agent Behavior

When building:
1. Read the page prompt carefully
2. Recreate the structure section by section
3. Match visual style with precision
4. Keep components reusable
5. Validate responsiveness
6. Compare against the reference screenshots
7. Refine details before final delivery

---

If you want, I can also turn this into a **single master `.md` file** that combines:
- agent skills
- home page development prompt
- home page design prompt
- feedback page development prompt
- feedback page design prompt
- events page development prompt
- events page design prompt
- all image prompts in separate copy blocks