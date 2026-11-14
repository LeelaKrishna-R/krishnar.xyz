import Image from "next/image";
import Link from "next/link";
import Marker from "../components/Marker";
import Story from "../components/story/Story";
import { Scribble } from "../components/Icons";
import { getCommunity } from "../lib/live";

export const revalidate = 600;

export default async function Home() {
  const community = await getCommunity();

  return (
    <>
      <div className="letterbox top" aria-hidden="true" />
      <div className="letterbox bottom" aria-hidden="true" />
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>
              Hi, I&apos;m <Marker>Krishna</Marker>.
            </h1>
            <p className="lede">
              I build AI for streamers at Dexter, train models on my own machine, and run the homelab my bots live on.
              Here&apos;s how I got here.
            </p>
            <ul className="badges" aria-label="Quick facts">
              {[
                ["dev @ Dexter AI", "#f2c76b"],
                ["Shero: 13,000+ servers", "#bfe0c8"],
                ["training local models", "#f4b8a4"],
                ["CCNA in progress", "#c9d7f2"],
              ].map(([t, c], i) => (
                <li key={t} className="badge" style={{ background: c, "--d": `${0.5 + i * 0.12}s`, "--r": `${[-3, 2, -2, 3][i]}deg` }}>
                  {t}
                </li>
              ))}
            </ul>
            <div className="btns">
              <a className="btn btn-gold" href="#s-2019">
                Start the story ↓
              </a>
              <Link className="btn" href="/work">
                Skip to my work
              </Link>
            </div>
          </div>

          <div className="id-wrap">
            <figure className="sticker id-card" style={{ margin: 0 }}>
              <span className="tape" aria-hidden="true" />
              <div className="id-photo">
                <Image
                  src="/images/me.webp"
                  alt="An illustrated portrait of Krishna"
                  width={640}
                  height={640}
                  priority
                  sizes="(max-width: 860px) 280px, 320px"
                />
              </div>
              <figcaption>
                <b>Krishna Ravuri</b>
                <span>Denton, TX</span>
              </figcaption>
            </figure>
            <span className="note id-note">
              me, Ghibli-style <Scribble />
            </span>
          </div>
        </div>
        <a className="scroll-hint" href="#s-2019" tabIndex={-1} aria-hidden="true">
          <span>scroll</span>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 4v15M6 13l6 6 6-6" />
          </svg>
        </a>
      </section>

      <Story community={community} />
    </>
  );
}
