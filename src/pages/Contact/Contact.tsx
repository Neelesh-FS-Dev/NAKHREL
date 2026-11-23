import { useId, useState, type FormEvent } from "react";
import { PageIntro } from "../../components/editorial/PageIntro";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { brand, contactCopy } from "../../data/content";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export function Contact() {
  useDocumentMeta("Contact", "Enquire about NAKHREL sarees, styling or collaborations.");
  const uid = useId();
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (!name) next.name = "Please tell us your name.";
    if (!EMAIL_PATTERN.test(email)) next.email = "Please enter a valid email address.";
    if (message.length < 10) next.message = "Please write a few more words so we can help.";

    setErrors(next);
    setSubmitted(Object.keys(next).length === 0);
  };

  const field = (key: string) => `${uid}-${key}`;

  return (
    <>
      <PageIntro eyebrow="Contact" title="Let's talk saree">
        {contactCopy.intro}
      </PageIntro>

      <section className="section container contact" aria-label="Enquiry form">
        <form className="contact__form" onSubmit={onSubmit} noValidate>
          <div className="field">
            <label htmlFor={field("name")} className="label">
              Name
            </label>
            <input
              id={field("name")}
              name="name"
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? `${field("name")}-error` : undefined}
            />
            {errors.name && (
              <p id={`${field("name")}-error`} className="form-message form-message--error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor={field("email")} className="label">
              Email
            </label>
            <input
              id={field("email")}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? `${field("email")}-error` : undefined}
            />
            {errors.email && (
              <p id={`${field("email")}-error`} className="form-message form-message--error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor={field("topic")} className="label">
              Enquiry type
            </label>
            <select id={field("topic")} name="topic" defaultValue="saree">
              <option value="saree">Saree enquiry</option>
              <option value="styling">Styling question</option>
              <option value="collaboration">Collaboration</option>
              <option value="other">Something else</option>
            </select>
          </div>

          <div className="field">
            <label htmlFor={field("message")} className="label">
              Message
            </label>
            <textarea
              id={field("message")}
              name="message"
              rows={6}
              aria-invalid={errors.message ? true : undefined}
              aria-describedby={errors.message ? `${field("message")}-error` : undefined}
            />
            {errors.message && (
              <p id={`${field("message")}-error`} className="form-message form-message--error">
                {errors.message}
              </p>
            )}
          </div>

          <div className="contact__actions">
            <button type="submit" className="btn btn--solid">
              Send enquiry
            </button>
            <a className="text-link" href={brand.instagram} target="_blank" rel="noopener noreferrer">
              Or message on Instagram
              <span className="visually-hidden"> (opens in a new tab)</span>
            </a>
          </div>

          <div role="status" aria-live="polite" className="contact__status">
            {submitted && <p className="form-message">{contactCopy.demoNotice}</p>}
          </div>
        </form>
      </section>
    </>
  );
}

export default Contact;
