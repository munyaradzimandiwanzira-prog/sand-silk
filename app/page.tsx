import { Monogram } from "@/components/Monogram";
import { SignupForm } from "@/components/SignupForm";
import { site } from "@/lib/site";

export default function ComingSoonPage() {
  const year = new Date().getFullYear();

  return (
    <main className="poster">
      <div className="frame" aria-hidden="true" />
      <div className="shadow" aria-hidden="true" />

      <section className="content" aria-labelledby="brand">
        <Monogram className="monogram reveal" title="" />

        <h1 id="brand" className="brand reveal">
          Sand <span className="amp">&amp;</span> Silk
        </h1>
        <p className="tagline reveal">{site.tagline}</p>

        <hr className="rule reveal" />

        <h2 className="coming reveal">Coming Soon</h2>
        <p className="lede reveal">
          A curated house of fine fragrances, arriving in Zimbabwe. Be the first to know when our
          doors open.
        </p>

        <div className="reveal">
          <SignupForm />
        </div>
      </section>

      <footer className="footer">
        {(site.instagram || site.facebook) && (
          <nav aria-label="Social media" className="social">
            {site.instagram && (
              <a href={`https://instagram.com/${site.instagram}`} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            )}
            {site.facebook && (
              <a href={`https://facebook.com/${site.facebook}`} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            )}
          </nav>
        )}
        <p>
          &copy; {year} {site.name}
        </p>
      </footer>
    </main>
  );
}
