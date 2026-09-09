# Website Development Prompt — EventFlow Events Page

Build a responsive **Events page** for the EventFlow web app. This page should help users discover events, filter them, review key details, and take action by viewing details or giving feedback.

## Goal
Create a polished event discovery page that shows verified tech events with:
- Search
- Status filters
- Category filters
- Event cards
- Ratings and review counts
- CTAs for details and feedback
- Load more functionality
- Trust/feature highlights

## Page Structure

### 1. Navbar
Use the same navbar as the rest of the site:
- Logo + EventFlow brand
- Nav links: Home, Events, Feedback
- Active state on “Events”
- Right side:
  - Primary button: “Give Feedback”
  - Profile icon button

### 2. Events Header Section
- Small badge:
  - “REAL-TIME SENTIMENT & VERIFICATION”
- Page title:
  - “Explore Events”
- Subtitle:
  - “Browse events and share your experience with the community.”
- Right-side stats:
  - 1,674 Reviews Logged
  - 98.2% Verified Ratio

### 3. Search and Filter Bar
Include a search input:
- Placeholder: “Search by event name, topic, or venue...”

Include status filter pills:
- All Events
- Upcoming
- Past
- Feedback Open

Include sort dropdown:
- “Most Recent”

Include category filter pills:
- All Categories
- Technology & AI
- Web Development
- Design & UX
- Startups & Biz

Also include a small results helper:
- “Showing 6 verified events”
- “Demo Empty State”

### 4. Event Cards Grid
Display event cards in a responsive grid.

Each event card should include:
- Event image
- Category badge
- Location
- Format badge
- Date and time
- Event title
- Venue
- Short description
- Star rating
- Review count
- Optional highlight badge
- Two buttons:
  - “View Details”
  - “Give Feedback”

### 5. Event Data to Include

#### Event 1
- Category: Technology
- Location: San Francisco, CA
- Format: In-Person
- Date: March 24–26, 2026 • 09:00 AM PST
- Title: Tech Innovation Summit 2026
- Venue: Moscone Center, San Francisco, CA
- Description:
  - A gathering of 4,000+ engineers, researchers, and tech pioneers exploring frontier computing, quantum systems, and scalable tech.
- Rating: 4.9
- Reviews: 428 reviews
- Badge: attendee avatars / initials stack

#### Event 2
- Category: Artificial Intelligence
- Location: New York, NY
- Format: Hybrid
- Date: April 10–12, 2026 • 10:00 AM EST
- Title: AI & Future Technology Conference
- Venue: Javits Center, New York, NY
- Description:
  - Deep dive into generative models, autonomous agents, and ethical AI architectures with industry leaders.
- Rating: 4.8
- Reviews: 312 reviews
- Badge: Trending

#### Event 3
- Category: Web Dev
- Location: Online / Virtual Livestream
- Format badge: Free Pass
- Date: April 18, 2026 • 01:00 PM CST
- Title: Web Development Workshop
- Venue: Online / Virtual Livestream
- Description:
  - Hands-on masterclass covering modern component patterns, edge rendering, and accessible web application design.
- Rating: 4.7
- Reviews: 189 reviews
- Badge: Interactive Labs

#### Event 4
- Category: Business
- Location: Austin, TX
- Badge: Feedback Open
- Date: May 5, 2026 • 06:30 PM CST
- Title: Startup & Entrepreneurship Meetup
- Venue: Capital Factory, Austin, TX
- Description:
  - Connect with early-stage founders, angel investors, and venture builders. Pitch sessions and networking.
- Rating: 4.9
- Reviews: 95 reviews
- Badge: 98% NPS

#### Event 5
- Category: Design & UX
- Location: Seattle, WA
- Badge: Keynote Stage
- Date: May 14–16, 2026 • 09:30 AM PST
- Title: Creative Design Conference
- Venue: Seattle Convention Center, WA
- Description:
  - Celebrating brand typography, spatial interaction design, design systems at scale, and creative leadership.
- Rating: 4.9
- Reviews: 510 reviews
- Badge: Top Rated

#### Event 6
- Category: Community
- Location: Portland, OR
- Badge: Free Entry
- Date: June 2, 2026 • 05:00 PM PST
- Title: Developer Community Meetup
- Venue: The Hub, Portland, OR
- Description:
  - Open-source maintainers and developers sharing lightning talks, code demos, and developer tooling trends.
- Rating: 4.6
- Reviews: 140 reviews
- Badge: Lightning Talks

### 6. Load More Section
- Button: “Load More Events”
- Helper text:
  - “Displaying 6 of 28 curated tech gatherings”

### 7. Trust / Feature Highlights
Create a 3-column section with:
1. 100% Verified Reviews
   - Feedback is authenticated via digital ticket stubs and on-site check-in verification.
2. Instant Organizer Impact
   - Speaker and session ratings are compiled live and routed to stage managers in real time.
3. AI Sentiment Analysis
   - Unbiased sentiment summaries identify recurring themes across hundreds of reviews.

Each item should include:
- Icon
- Bold title
- Short description

### 8. Footer
Use the same footer as the rest of the site:
- Logo + EventFlow
- Footer nav: Home, Events, Feedback
- Copyright text
- Privacy Policy
- Terms of Service

## Functional Requirements
- Search should filter by event name, topic, or venue
- Status pills should filter events
- Category pills should filter events
- Sort dropdown should reorder events
- “View Details” should navigate to event detail view
- “Give Feedback” should navigate to feedback form
- “Load More Events” should reveal more events
- Cards should be responsive and consistent
- Badges should adapt to event type and status

## UX Requirements
- Make filtering simple and visible
- Keep event cards scannable
- Highlight ratings and trust indicators
- Keep CTAs clear and accessible
- Maintain consistent spacing and alignment