import { useId, useState, type FormEvent } from "react";
import { newsletter } from "../../data/content";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface NewsletterProps {
  id?: string;
  heading?: boolean;
}

/*
 * Early-access sign-up. This is a concept prototype with no backend, so the
 * success message says plainly that nothing was stored.
 */
export function Newsletter({ id, heading = false }: NewsletterProps) {
  const generatedId = useId();
  const inputId = `${id ?? generatedId}-email`;
  const errorId = `${inputId}-error`;
  const statusId = `${inputId}-status`;

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "demo-success">("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!value) {
      setError("Please enter your email address.");
      setStatus("idle");
      return;
    }
    if (!EMAIL_PATTERN.test(value)) {
      setError("That email address does not look quite right.");
      setStatus("idle");
      return;
    }
    setError(null);
    setStatus("demo-success");
  };

  const HeadingTag = heading ? "h2" : "p";

  return (
    <div className="newsletter">
      <HeadingTag className={heading ? "display-m newsletter__heading" : "label newsletter__heading"}>
        {heading ? newsletter.heading : "Early access"}
      </HeadingTag>
      {heading && <p className="lede newsletter__body">{newsletter.body}</p>}

      <form className="newsletter__form" onSubmit={onSubmit} noValidate>
        <label htmlFor={inputId} className="label">
          Email address
        </label>
        <div className="newsletter__row">
          <input
            id={inputId}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={error ? true : undefined}
            aria-describedby={[error ? errorId : null, statusId].filter(Boolean).join(" ") || undefined}
          />
          <button type="submit" className="btn btn--solid">
            Notify me
          </button>
        </div>

        {error && (
          <p id={errorId} className="form-message form-message--error" role="alert">
            {error}
          </p>
        )}
        <p id={statusId} className="form-message" aria-live="polite">
          {status === "demo-success" &&
            "Thank you. This is a concept demo, so your address was not stored or sent."}
        </p>
        <p className="form-consent">{newsletter.consent}</p>
      </form>
    </div>
  );
}
