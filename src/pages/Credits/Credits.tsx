import { PageIntro } from "../../components/editorial/PageIntro";
import { useDocumentMeta } from "../../hooks/useDocumentMeta";
import { credits } from "../../data/assets";

/** Attribution for every image and video on the site. Wikimedia CC BY-SA files require this. */
export function Credits() {
  useDocumentMeta("Image credits", "Sources and licences for the images and video used on the NAKHREL concept website.");

  return (
    <>
      <PageIntro eyebrow="Credits" title="Image and video credits">
        Stock photography and video are used as concept mood imagery. They are not NAKHREL products.
      </PageIntro>

      <section className="section container" aria-label="Credit list">
        <ul className="credits">
          {credits.map((c) => (
            <li key={c.file} className="credits__item">
              <p className="label">{c.usedOn}</p>
              <p className="credits__file">{c.file}</p>
              <p>
                Photo or film by {c.credit}.{" "}
                <a href={c.source} target="_blank" rel="noopener noreferrer">
                  Source
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </p>
              <p className="credits__licence">Licence: {c.license}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

export default Credits;
