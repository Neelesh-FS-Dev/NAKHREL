import type { Review } from "../../types/product";
import { summariseReviews } from "../../data/reviews";

/* Five stars drawn as text glyphs, with the rating announced to screen readers. */
export function Stars({ value }: { value: number }) {
  const rounded = Math.round(value);
  return (
    <span className="stars" role="img" aria-label={`${value.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <span key={n} aria-hidden="true" className={n <= rounded ? "stars__on" : "stars__off"}>
          ★
        </span>
      ))}
    </span>
  );
}

/* Shown above any sample review so it cannot be read as customer feedback. */
export function SampleBanner() {
  return (
    <p className="sample-banner" role="note">
      <strong>Sample reviews.</strong> These are placeholders for layout only. They are not customer reviews and are not from verified buyers.
    </p>
  );
}

interface ReviewSummaryProps {
  reviews: readonly Review[];
  isSample?: boolean;
}

export function ReviewSummary({ reviews, isSample = false }: ReviewSummaryProps) {
  const { count, average } = summariseReviews(reviews);

  if (average === null) {
    return (
      <div className="review-summary">
        <p className="review-summary__empty">No reviews yet.</p>
        <p className="prose">Reviews will appear here once customers have worn and reviewed this saree.</p>
      </div>
    );
  }

  return (
    <div className="review-summary">
      {isSample && <SampleBanner />}
      <p className="review-summary__score">{average.toFixed(1)}</p>
      <Stars value={average} />
      <p className="review-summary__count">
        {isSample ? "Sample rating" : "Based on"} {count} {count === 1 ? "review" : "reviews"}
      </p>
    </div>
  );
}

export function ReviewList({ reviews, isSample = false }: { reviews: readonly Review[]; isSample?: boolean }) {
  if (reviews.length === 0) return null;
  return (
    <>
    {isSample && <SampleBanner />}
    <ul className="review-list">
      {reviews.map((review) => (
        <li key={review.id} className="review">
          <Stars value={review.rating} />
          <h3 className="review__title">{review.title}</h3>
          <p className="review__body">{review.body}</p>
          <p className="review__meta">
            {review.author}
            {review.verifiedPurchase ? " · Verified purchase" : ""} · {review.date}
          </p>
        </li>
      ))}
    </ul>
    </>
  );
}
