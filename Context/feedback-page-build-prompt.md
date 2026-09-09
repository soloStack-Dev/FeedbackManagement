# Website Development Prompt — EventFlow Feedback Page

Build a clean, responsive **Feedback page** for the EventFlow web app. This page should allow attendees to submit structured feedback for an event they attended.

## Goal
Create a user-friendly feedback form that collects:
- Event selection
- Overall rating
- Category ratings
- Open-text feedback
- Recommendation choice
- Optional notes
- Form submission and reset actions

## Page Structure

### 1. Navbar
Reuse the same navbar as the home page:
- Logo + EventFlow brand
- Nav links: Home, Events, Feedback
- Active state on “Feedback”
- Right side:
  - “Give Feedback” primary button
  - Profile icon button

### 2. Page Header
- Top badge:
  - “TAKES ONLY 2 MINUTES • VERIFIED ATTENDEE FORM”
- Main heading:
  - “Share Your Feedback”
- Subheading:
  - “Tell us about your experience. Your authentic insights empower organizers to curate better keynotes, workshops, and community spaces.”

### 3. Feedback Form Card
Wrap the form in a large white rounded card with soft shadow.

#### Form Fields

##### A. Select Event
- Label: “Select Event *”
- Helper text: “Choose the verified conference or workshop you attended”
- Field type: dropdown/select
- Placeholder: “Select an event from the roster...”

##### B. Overall Experience
- Label: “Overall Experience *”
- Helper text: “Rate your holistic impression of this session”
- Field type: 5-star rating input
- Include text: “Click to rate”

##### C. Detailed Evaluation
- Section label: “Detailed Evaluation”
- Helper text: “Breakdown across key operational aspects”
- Create 3 rating cards in a row:
  1. Organization
     - Subtext: “Flow, registration, timing”
     - 5-star rating
     - Display “5/5”
  2. Content Quality
     - Subtext: “Relevance, depth, materials”
     - 5-star rating
     - Display “5/5”
  3. Speaker Impact
     - Subtext: “Clarity, engagement & Q&A”
     - 5-star rating
     - Display “5/5”

##### D. What did you like most about the event?
- Label: “What did you like most about the event?”
- Helper text: “Highlight sessions, topics, panels, or networking moments that stood out”
- Field type: textarea
- Placeholder:
  - “e.g., The keynote session on autonomous agent architectures was extraordinarily insightful and well paced...”

##### E. What could be improved?
- Label: “What could be improved?”
- Helper text: “Constructive suggestions regarding scheduling, facility, or audio-visuals”
- Field type: textarea
- Placeholder:
  - “e.g., Room acoustics in auditorium B were echoey, and having reserved quiet spaces for laptops during breaks would help...”

##### F. Would you recommend this event to peers?
- Label: “Would you recommend this event to peers?”
- Field type: two selectable option cards
- Option 1:
  - Title: “Yes, definitely”
  - Subtext: “I’d recommend this conference”
  - Icon: thumbs up
- Option 2:
  - Title: “No, needs work”
  - Subtext: “Needs structural revisions first”
  - Icon: thumbs down
- Selected state should be clearly visible

##### G. Additional Notes
- Label: “Additional Notes”
- Optional tag on the right
- Field type: textarea
- Placeholder:
  - “Anything else you'd like the organizing team to know?”

### 4. Form Actions
- Left action:
  - “Clear Entries”
- Right action:
  - Primary button: “Submit Feedback”
  - Include arrow/send icon

### 5. Privacy Note
Below the form card:
- Small lock icon
- Text:
  - “Responses are securely encrypted and aggregated in accordance with strict event privacy policies.”

### 6. Footer
Reuse the same footer as the home page:
- Logo + EventFlow
- Footer nav: Home, Events, Feedback
- Copyright text
- Privacy Policy
- Terms of Service

## Functional Requirements
- Required fields should be marked with an asterisk
- Dropdown should support event selection
- Star ratings should be interactive
- Recommendation cards should behave like radio options
- Submit button should trigger form submission
- Clear Entries should reset the form
- Optional notes field should not block submission
- Form should be fully responsive

## UX Requirements
- Keep the form easy to scan
- Use clear labels and helper text
- Separate sections visually
- Make primary action obvious
- Keep the layout clean and professional