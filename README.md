# Wedding Embrace

Build a COMPLETE, production-quality, mobile-first interactive wedding invitation website using:

- React
- Vite
- TypeScript
- Tailwind CSS
- Framer Motion

I have uploaded FOUR reference files.

============================================================
REFERENCE FILE PRIORITY — READ THIS FIRST
============================================================

REFERENCE 1:
white_envlop(2).png

This is the EXACT CLOSED ENVELOPE IMAGE that must appear when the visitor first enters the website.

REFERENCE 2:
Wedding_envelope_opening(1).mp4

This is the EXACT envelope-opening animation that must play after the visitor taps the closed envelope.

REFERENCE 3:
Couple_walking_in_static_breeze_202609022244(1).mp4

This is the EXACT video that must be used as the HERO BACKGROUND after the envelope-opening animation finishes.

REFERENCE 4:
WhatsApp Video 2026-09-02 at 11.57.11 AM.mp4

This is the MASTER REFERENCE for:

- website design direction
- luxury invitation aesthetic
- section structure
- scrolling experience
- typography feeling
- spacing
- interactive features
- countdown presentation
- scratch-to-reveal interaction
- event cards
- venue section
- dress-code section
- RSVP area
- overall premium wedding invitation experience

IMPORTANT:

Do NOT recreate the phone, hands, Instagram Reel interface, browser controls, Instagram username, Reel captions, black bars, status bar, or anything surrounding the website shown inside Reference 4.

Reference 4 is ONLY a reference for the ACTUAL WEDDING WEBSITE VISIBLE INSIDE THE PHONE.

I want a real functional website, NOT a recreation of a phone screen.

============================================================
CORE EXPERIENCE
============================================================

The website must feel like a premium luxury digital wedding invitation.

The visitor experience must happen in this exact sequence:

CLOSED ENVELOPE
      ↓
USER TAPS ANYWHERE
      ↓
ENVELOPE OPENING VIDEO
      ↓
SMOOTH TRANSITION
      ↓
HERO WITH COUPLE VIDEO
      ↓
WEDDING INVITATION CONTENT
      ↓
SCRATCH TO REVEAL
      ↓
INVITATION MESSAGE
      ↓
EVENT DETAILS
      ↓
COUNTDOWN
      ↓
VENUE
      ↓
DRESS CODE
      ↓
GUEST INFORMATION
      ↓
RSVP
      ↓
ELEGANT FOOTER

============================================================
1. FIRST SCREEN — CLOSED ENVELOPE
============================================================

When the website is first loaded:

Show ONLY:

white_envlop(2).png

The envelope should fill the mobile viewport beautifully.

No title.

No "Open Invitation" button.

No arrow.

No instruction.

No text.

No loading indicator unless absolutely required.

No visible UI.

The envelope itself is the entire entry experience.

The visitor should intuitively tap it.

Make the WHOLE SCREEN tappable.

The image must:

- remain centered
- preserve its original design
- preserve N&A
- preserve its exact pink color
- use object-fit carefully
- occupy the full vertical viewport
- have no unnecessary crop
- have no redesign
- have no overlays

Use:

min-height: 100svh

Prevent scrolling while this intro is visible.

============================================================
2. TAP ANYWHERE → PLAY ENVELOPE OPENING
============================================================

When the visitor taps ANYWHERE on the closed-envelope screen:

Immediately replace the still image with:

Wedding_envelope_opening(1).mp4

The opening video should begin from exactly 0 seconds.

Requirements:

- autoplay after user interaction
- playsInline
- no native video controls
- no progress bar
- no pause button
- no play icon
- no black screen
- no loading flash
- no white flash
- no layout jump
- no border
- no video UI
- no browser controls

The video should fill EXACTLY the same screen position as the closed envelope.

The transition:

still envelope
→ opening video

should be almost invisible.

The first frame of the video should visually replace the still image seamlessly.

DO NOT animate the envelope with CSS.

DO NOT recreate the opening using Framer Motion.

USE THE PROVIDED VIDEO.

============================================================
3. AFTER ENVELOPE VIDEO FINISHES
============================================================

When Wedding_envelope_opening(1).mp4 reaches its natural end:

DO NOT loop it.

DO NOT restart it.

DO NOT require another tap.

Automatically transition to the main invitation.

Use a very elegant short crossfade approximately:

500–800ms

The transition should feel premium and cinematic.

Then unlock page scrolling.

============================================================
4. HERO SECTION — PROVIDED COUPLE VIDEO
============================================================

Immediately after the envelope-opening sequence, reveal the hero.

Use:

Couple_walking_in_static_breeze_202609022244(1).mp4

as the FULL-BLEED HERO BACKGROUND.

THIS VIDEO IS THE VISUAL HERO.

Do NOT replace it with an image.

Do NOT generate a different couple.

Do NOT add another mosque scene.

Do NOT add another hero illustration.

============================================================
HERO VIDEO BEHAVIOR
============================================================

The video should:

- autoplay
- muted
- playsInline
- preload
- play once
- NOT loop

CRITICAL:

WHEN THE VIDEO REACHES THE END:

PAUSE IT AND HOLD THE FINAL FRAME.

The final frame must remain visible as the hero background.

Do NOT:

- fade the video to black
- restart the video
- jump back to the first frame
- hide the video
- replace it with a random image
- loop it

The ending frame should become the permanent hero background.

Implement this properly in React.

If necessary, pause around:

duration - 0.03 seconds

to make sure browsers reliably retain the final visible frame.

============================================================
HERO CAMERA / CROPPING
============================================================

Preserve the composition of the supplied couple video.

The couple should remain centered.

Keep the architecture visible.

Do not crop aggressively.

Use a 9:16-first mobile composition.

Hero height should feel immersive:

100svh

No artificial:

- zoom
- parallax
- scale animation
- camera push-in
- pan
- Ken Burns effect

The video already contains the required motion.

Do not add camera animation over it.

============================================================
5. HERO TEXT DESIGN
============================================================

Overlay wedding information elegantly on the hero.

The design should take inspiration from the invitation inside Reference 4.

Use elegant typography such as:

Primary calligraphy:
Cormorant Garamond / Great Vibes / suitable luxury script

Secondary:
Cormorant Garamond / Playfair Display

Do NOT cover the couple's bodies unnecessarily.

Use delicate hierarchy such as:

WELCOME TO THE
Wedding Celebration

N
&
A

or actual couple names once configured.

Then:

Wedding date

A very small elegant ornamental divider.

Keep text elegant rather than oversized.

Use cream / ivory / champagne-gold typography with appropriate contrast.

No modern tech-style fonts.

No huge bold sans-serif typography.

============================================================
6. DESIGN SYSTEM — MATCH THE REEL FEELING
============================================================

After the pink envelope intro, the MAIN WEBSITE should transition into the luxurious visual language seen in Reference 4 and supported by Reference 3.

Overall aesthetic:

LUXURY
ROMANTIC
ELEGANT
ISLAMIC / MUGHAL INSPIRED
SOFT
PREMIUM
EDITORIAL
WEDDING

Primary palette:

Ivory:
#FAF7F0

Warm cream:
#F5EFE5

Champagne:
#D9C09C

Muted antique gold:
#B69A68

Warm beige:
#DCCDBB

Deep warm text:
#625448

Soft white:
#FFFDF9

Use gold carefully.

NO bright yellow-gold.

NO neon.

NO harsh gradients.

NO excessive shadows.

============================================================
DECORATION STYLE
============================================================

Take inspiration from the reel:

- delicate floral corners
- fine botanical decorations
- elegant ornamental arches
- thin gold borders
- subtle Islamic/Mughal geometry
- lots of breathing room
- premium stationery feeling

Decorations should frame content.

They should NOT overwhelm content.

Use subtle scroll animations:

opacity
translateY
gentle reveal

NO aggressive animation.

NO bouncing.

NO rotating headings.

NO excessive parallax.

============================================================
7. SCROLL TRANSITION FROM HERO
============================================================

At the bottom of the hero add a very subtle:

"Scroll to discover"

or small downward chevron.

Keep it delicate.

As the visitor scrolls down, transition naturally from the cinematic hero into a light ivory invitation layout.

============================================================
8. "OUR DAY" / SAVE THE DATE AREA
============================================================

Create an elegant introduction section inspired by the reel.

Possible heading:

Our Special Day

Include elegant date presentation using bordered cards.

Example structure:

DAY
DATE
MONTH
YEAR

But wedding information MUST be stored centrally so it is very easy to replace.

Do NOT hardcode event information across many components.

============================================================
9. SCRATCH-TO-REVEAL — IMPORTANT
============================================================

Implement a REAL functional scratch card.

This is one of the main interactions.

Heading:

Scratch to Reveal

or

A Special Date Awaits

Create a beautiful luxury rectangular/card-shaped reveal area.

BEFORE SCRATCHING:

Show an opaque champagne / ivory / soft-gold scratch surface.

Use a subtle texture or elegant pattern.

Possible small centered text:

Scratch to Reveal

UNDERNEATH THE SCRATCH LAYER:

Reveal:

SAVE THE DATE

[Wedding Date]

[Wedding Time]

and an elegant:

Add to Calendar

button.

============================================================
REAL SCRATCH FUNCTIONALITY
============================================================

This must NOT be a fake CSS hover effect.

Implement actual scratching using:

HTML Canvas + Pointer Events

Support:

- touch
- mouse
- finger dragging
- mobile Safari
- Chrome Android

As the user moves their finger:

erase the scratch coating exactly beneath the finger.

Use round brush strokes.

Make scratching extremely smooth.

Suggested brush radius:

22–32px depending on screen width.

When approximately 50–60% has been scratched:

automatically complete the reveal with a soft fade.

Do NOT require 100% scratching.

After reveal:

remove or disable the scratch canvas so buttons underneath work.

Use Framer Motion for the final soft reveal.

============================================================
ADD TO CALENDAR
============================================================

The revealed date should have a working:

Add to Calendar

button.

Generate an ICS calendar event client-side or provide a valid Google Calendar event URL generated from central wedding configuration.

Do not use a fake button.

============================================================
10. INVITATION MESSAGE
============================================================

After the interactive reveal, create an elegant invitation message section like the reference website.

Include:

ornamental heading

couple names

parents/family placeholders

invitation wording

optional Quranic verse / wedding quote

Use centered typography.

Example hierarchy:

Together With Their Families

[NAMES]

joyfully invite you...

Do NOT invent personal details.

Create central editable placeholders.

============================================================
11. EVENT TIMELINE
============================================================

Create the elegant event schedule section visible conceptually in the reference reel.

Use a vertical timeline or refined 2-column mobile-friendly event arrangement.

Each event may contain:

event icon
event title
date
time
venue

Example editable data:

Nikah
Reception
Wedding
Dinner

But all event values should come from a configuration object.

Use thin gold lines connecting timeline events.

Keep icons line-art style.

No cartoon emojis as event icons.

============================================================
12. LIVE COUNTDOWN TIMER
============================================================

Create the prominent countdown section inspired by Reference 4.

Heading example:

The Celebration Begins In

Display:

DAYS
HOURS
MINUTES
SECONDS

Use four elegant units.

Example:

153
:
04
:
55
:
48

Update once per second.

Calculate from the configured wedding datetime.

Never use a fake static countdown.

Use JavaScript Date correctly.

When countdown reaches zero:

show an elegant message such as:

Today Is The Day ♡

instead of negative numbers.

Use tabular numerals to avoid layout movement.

============================================================
13. VENUE SECTION
============================================================

Create an elegant venue section similar to the reel.

Include:

Venue heading
Venue image area
Venue name
Location/address
Get Directions button

Then provide:

Google Maps integration/link.

The "Get Directions" button must work.

Use a proper external Google Maps search/directions link generated from the venue configuration.

If an actual venue image is not provided:

use a tasteful neutral placeholder and clearly structure the code so it is easy to replace.

DO NOT fabricate a random real venue.

============================================================
14. DRESS CODE
============================================================

Create a premium Dress Code section inspired by the reference.

Include:

small elegant heading
optional couple/group illustration placeholder
short dress-code description

Then display a horizontal color palette of approximately:

5–7 circular color swatches.

Make palette values editable in the configuration.

Example neutral palette:

cream
champagne
taupe
dusty rose
sage
warm brown

Use no text-heavy cards.

Keep it editorial and clean.

============================================================
15. GUEST INFORMATION / WEDDING NOTES
============================================================

Create an elegant information section.

Possible heading:

For Our Wonderful Guests

Use beautiful bordered cards or minimal sections for:

Timing
Dress Code
Children / family information
Parking
Photography
Any special wedding instructions

Again:

DO NOT invent personal policies.

Use editable placeholder content.

============================================================
16. RSVP SECTION
============================================================

Create the RSVP / attendance section similar to the end of the reference reel.

Heading:

Confirm Your Attendance

Fields:

Full Name
Number of Guests
Attending? Yes / No
Message for the Couple

Large elegant button:

SEND RSVP

Form must:

- validate required fields
- show error states
- have proper mobile keyboard types
- show a beautiful success state after submission

Until a backend is connected:

store submissions locally or expose a clearly marked submit handler.

Do NOT pretend data is being sent to a server if there is no backend.

Design the architecture so Supabase can easily be connected later.

============================================================
17. WISHES / MESSAGE FOR THE COUPLE
============================================================

Include a small elegant optional section allowing guests to leave a wedding wish.

Fields:

Name
Your Wish

Display submitted wishes as refined minimal cards.

Keep it visually consistent.

============================================================
18. FLOATING MUSIC CONTROL
============================================================

The reference invitation includes a subtle floating circular control.

Create a small fixed circular gold/cream audio control in the lower-right corner.

IMPORTANT:

Only activate actual background music if an audio file exists.

Do NOT generate or assume a nonexistent audio file.

If no audio asset exists:

build the component and keep it disabled/commented until an audio source is provided.

When music exists:

tap toggles play/mute.

Do not autoplay loud music unexpectedly.

============================================================
19. FOOTER
============================================================

End with an elegant minimal footer.

Example:

With Love,
N & A

Thank you for celebrating with us.

Add a tiny floral divider.

No developer branding.

No Lovable branding.

No huge footer.

============================================================
20. ANIMATION SYSTEM
============================================================

Use Framer Motion.

Animations must be elegant and restrained.

Preferred:

opacity: 0 → 1
translateY: 20px → 0
duration: 0.6–0.9 seconds

Use Intersection Observer / whileInView.

Animate once.

Avoid:

bouncing
spinning
large scaling
aggressive parallax
constant motion
page-wide zoom effects

The PROVIDED VIDEOS already deliver the cinematic movement.

============================================================
21. MOBILE-FIRST — EXTREMELY IMPORTANT
============================================================

This invitation is primarily designed for phones.

Perfect the website first for approximately:

360px
390px
412px
430px

width devices.

No horizontal scrolling.

No cut-off names.

No text overflowing.

No tiny tap targets.

No unnecessary desktop navigation.

On desktop:

center the invitation experience elegantly.

Do not simply stretch every section to 1920px.

Use sensible max-width containers while allowing hero visuals to remain immersive.

============================================================
22. PERFORMANCE
============================================================

This website contains multiple videos.

Optimize carefully.

Preload the envelope-opening video because it is needed immediately.

Begin preloading the couple hero video while the intro is showing.

Avoid downloading unnecessary media repeatedly.

Use:

playsInline
preload
proper poster/fallback behavior

Do not cause a white flash between videos.

Do not remount the hero video unnecessarily.

Respect prefers-reduced-motion for nonessential UI animations, but preserve the primary invitation flow.

============================================================
23. VIDEO INTRO STATE MACHINE
============================================================

Implement the intro as an explicit React state machine:

type IntroState =
  | "closed"
  | "opening"
  | "complete";

CLOSED:

white_envlop(2).png visible.

User taps anywhere.

↓

OPENING:

Wedding_envelope_opening(1).mp4 visible and playing.

↓

Video onEnded

↓

COMPLETE:

fade intro away
unlock scrolling
show main website
play hero video

Do not use arbitrary setTimeout() values to guess when the opening video ends.

Use the video's actual onEnded event.

============================================================
24. FILE / COMPONENT STRUCTURE
============================================================

Organize the app professionally.

Example:

src/
  components/
    EnvelopeIntro.tsx
    HeroSection.tsx
    SectionHeading.tsx
    ScratchReveal.tsx
    SaveTheDate.tsx
    InvitationMessage.tsx
    EventTimeline.tsx
    Countdown.tsx
    VenueSection.tsx
    DressCode.tsx
    GuestInfo.tsx
    Wishes.tsx
    RSVP.tsx
    MusicControl.tsx
    Footer.tsx

  config/
    wedding.ts

  hooks/
    useCountdown.ts

  utils/
    calendar.ts

  App.tsx
  main.tsx

============================================================
25. CENTRAL WEDDING CONFIG
============================================================

Create:

src/config/wedding.ts

ALL editable content must be here.

Example:

export const wedding = {
  bride: {
    firstName: "",
    fullName: "",
    parents: ""
  },

  groom: {
    firstName: "",
    fullName: "",
    parents: ""
  },

  initials: "N&A",

  date: "",
  dateISO: "",
  time: "",

  venue: {
    name: "",
    address: "",
    mapsQuery: ""
  },

  events: [],

  dressCode: {
    description: "",
    colors: []
  },

  invitationMessage: "",

  quote: "",

  guestInformation: []
};

DO NOT scatter personal details throughout JSX.

============================================================
26. ASSET PRIORITY
============================================================

ABSOLUTELY use my supplied assets.

Do not replace them with AI-generated alternatives.

INTRO:
white_envlop(2).png

OPENING:
Wedding_envelope_opening(1).mp4

HERO:
Couple_walking_in_static_breeze_202609022244(1).mp4

UX / DESIGN REFERENCE:
WhatsApp Video 2026-09-02 at 11.57.11 AM.mp4

The reference Reel itself should NOT appear anywhere on the website.

============================================================
27. DO NOT COPY FROM THE REEL
============================================================

DO NOT reproduce:

Instagram branding
Instagram icon
@username
Reel caption
"Brides of 2027..."
phone
hands
browser bar
Safari UI
battery indicator
status bar
background room
social-media watermark

ONLY study the invitation WEBSITE shown inside the phone.

============================================================
28. DO NOT ADD RANDOM CONTENT
============================================================

Do NOT add random:

people
photos
venues
wedding dates
names
logos
quotes
religious verses
decorations
videos

unless required as clearly labeled placeholders.

Use my supplied visual assets as the primary design foundation.

============================================================
29. VISUAL QUALITY TARGET
============================================================

The result should feel like a ₹10,000+ premium bespoke digital wedding invitation, not a generic template.

Prioritize:

beautiful typography
luxury spacing
high-quality motion
subtle ornamentation
excellent mobile responsiveness
smooth interactions
strong visual hierarchy
real functional components
seamless media transitions

The website should look excellent when screen-recorded vertically for an Instagram Reel.

============================================================
30. MOST IMPORTANT FINAL CHECK
============================================================

Before considering the implementation finished, verify this exact journey:

1. Website loads.
2. ONLY my pink N&A envelope is visible.
3. No button is displayed.
4. Tapping anywhere starts my envelope-opening video.
5. Opening animation plays once.
6. No video controls appear.
7. After it ends, it transitions automatically.
8. Couple walking video becomes the hero.
9. Couple video plays exactly once.
10. When it ends, its FINAL FRAME remains on screen.
11. Hero transitions naturally into the invitation.
12. Scratch-to-reveal works with finger touch.
13. Add to Calendar works.
14. Countdown is live.
15. Event details are data-driven.
16. Venue directions work.
17. Dress-code palette is responsive.
18. RSVP is functional.
19. All sections match one cohesive cream/ivory/champagne-gold luxury design.
20. There is no Instagram/phone UI copied from the reference.
21. There are no unwanted zoom effects.
22. There is no horizontal overflow on mobile.
23. The experience feels smooth, elegant and premium.

Build the actual working React website now.

Do not return only a mockup.

Do not return only an explanation.

Implement all components, interactions, responsive styles and functionality.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3844290f-3e9c-492c-a81f-1026fe629539).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
