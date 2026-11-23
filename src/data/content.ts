/*
 * Centralised copy. Everything here is CONCEPT copy written for the pitch.
 * It contains no claims about NAKHREL's history, founders, craft process,
 * fabrics, reviews or shipping. Replace each block when the brand supplies
 * approved messaging.
 */

export const brand = {
  name: "NAKHREL",
  instagram: "https://www.instagram.com/shopnakhrel/",
  /** Confirmed from the supplied announcement post. */
  sareeLineCredit: "Saree line by Vaishnvi Mahadik",
  announcement: "Coming soon",
  tagline: "The Art of Being Nakhrel",
} as const;

export const hero = {
  eyebrow: brand.sareeLineCredit,
  title: ["The Art of", "Being Nakhrel."],
  supporting: "An expression of grace, individuality, and timeless style.",
  primaryCta: { label: "Explore the Collection", to: "/collections" },
  secondaryCta: { label: "Discover Our Story", to: "/our-story" },
} as const;

export const introduction = {
  heading: ["More Than a Saree.", "A Way of Being."],
  body: "Nakhrel is a saree label built around the small, deliberate pleasures of dressing well: a border that catches the light, a fold that settles just right, a colour that feels like your own. The collections are being shaped now, and this is a first look at how they might be presented.",
} as const;

export const draping = {
  heading: ["Six Yards.", "Endless Expressions."],
  beats: [
    {
      title: "Begin with the pleat",
      body: "Every drape starts at the waist. The pleats set the rhythm of the whole look, so take your time with them.",
    },
    {
      title: "Let the pallu speak",
      body: "The pallu is where personality shows. Let it fall long and easy, or gather it over one shoulder for a sharper line.",
    },
    {
      title: "Wear it like it is yours",
      body: "A saree looks most like itself when the person in it is at ease. Move, laugh, and let the fabric follow.",
    },
  ],
} as const;

export const philosophy = {
  quote: ["Some things are worn.", "Others are felt."],
} as const;

export const film = {
  label: "Signature film",
  title: "Motion, light, and a single drape.",
  caption: "The NAKHREL logo reveal, the brand's own motion mark.",
} as const;

export const newsletter = {
  heading: "Something Beautiful Is Unfolding.",
  body: "Be among the first to discover what is coming.",
  consent:
    "We will use your email only to share early access news from NAKHREL. You can unsubscribe at any time.",
} as const;

export const story = {
  intro:
    "NAKHREL is at the beginning of its story. This page will hold the brand's own words once they are ready to share.",
  pillars: [
    {
      title: "Warmth first",
      body: "Soft light, honest skin tones and an unhurried pace. We want every image to feel like a good afternoon.",
    },
    {
      title: "Craft in the details",
      body: "Borders, pallu and the small finishing touches are where a saree shows its character.",
    },
    {
      title: "Confidence, not noise",
      body: "Luxury here is composition and restraint. The clothes do the talking.",
    },
  ],
} as const;

export const lookbookNote =
  "Licensed stock photography used as mood imagery. These frames are not NAKHREL products. The campaign lookbook will be supplied by the brand.";

export const contactCopy = {
  intro:
    "For saree enquiries, styling questions or collaborations, write to us. This concept site does not send messages yet.",
  demoNotice:
    "Demo only. Nothing was sent. Connect this form to a real inbox before launch.",
} as const;

export const commerceNotice =
  "This is a concept demonstration. Products shown are placeholders, and no orders or payments are processed.";
