import type { Review } from "../types/product";

/*
 * Customer reviews, keyed by product slug.
 *
 * `reviewsBySlug` holds real customer reviews. It is empty: none exist yet.
 *
 * `sampleReviews` holds clearly labelled SAMPLE reviews for the concept pitch only.
 * They are not from customers, carry no verified-purchase badge and are shown with a
 * visible "sample" banner. Set SHOW_SAMPLE_REVIEWS to false, and delete sampleReviews,
 * before the site goes live.
 */
export const SHOW_SAMPLE_REVIEWS = true;

export const reviewsBySlug: Record<string, Review[]> = {};

const sample = (id: string, rating: Review["rating"], title: string, body: string): Review => ({
  id,
  author: "Sample reviewer",
  rating,
  date: "Sample date",
  title,
  body,
  verifiedPurchase: false,
});

export const sampleReviews: Record<string, Review[]> = {
  "blush-drape-saree": [
    sample("s-blush-1", 5, "Sample: soft and easy to wear", "Sample review text for layout. The blush tone sits well in daylight."),
    sample("s-blush-2", 4, "Sample: a good everyday piece", "Sample review text for layout. The pallu is easy to settle."),
  ],
  "ivory-thread-study": [
    sample("s-ivory-1", 5, "Sample: quiet and elegant", "Sample review text for layout. Works for both office days and evenings."),
    sample("s-ivory-2", 4, "Sample: classic choice", "Sample review text for layout. The thread border is subtle."),
  ],
  "rose-dusk-border": [
    sample("s-rose-1", 4, "Sample: flattering colour", "Sample review text for layout. The border is neat and understated."),
    sample("s-rose-2", 5, "Sample: lovely drape", "Sample review text for layout. It drapes evenly across the shoulder."),
  ],
  "sunlit-peach-drape": [
    sample("s-peach-1", 5, "Sample: bright and warm", "Sample review text for layout. A good pick for daytime events."),
    sample("s-peach-2", 4, "Sample: light to wear", "Sample review text for layout. Comfortable through a long day."),
  ],
  "heritage-vine-saree": [
    sample("s-heritage-1", 5, "Sample: rich colour", "Sample review text for layout. The burgundy has real depth."),
    sample("s-heritage-2", 4, "Sample: striking piece", "Sample review text for layout. Best suited to occasions."),
  ],
  "evening-rose-gold": [
    sample("s-evening-1", 5, "Sample: statement saree", "Sample review text for layout. Gets noticed in the right way."),
    sample("s-evening-2", 4, "Sample: celebration favourite", "Sample review text for layout. The gold accents are restrained."),
  ],
};

export interface ProductReviews {
  reviews: Review[];
  /** True when the reviews shown are sample reviews, not customer reviews. */
  isSample: boolean;
}

/** Real reviews win. Sample reviews are used only when enabled and no real ones exist. */
export function getReviews(slug: string): ProductReviews {
  const real = reviewsBySlug[slug] ?? [];
  if (real.length > 0) return { reviews: real, isSample: false };
  if (SHOW_SAMPLE_REVIEWS) return { reviews: sampleReviews[slug] ?? [], isSample: true };
  return { reviews: [], isSample: false };
}

/** Average rating and count. The average is null when there are no reviews. */
export function summariseReviews(reviews: readonly Review[]) {
  if (reviews.length === 0) return { count: 0, average: null as number | null };
  const total = reviews.reduce((sum, r) => sum + r.rating, 0);
  return { count: reviews.length, average: total / reviews.length };
}
