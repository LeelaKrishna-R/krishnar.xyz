import Image from "next/image";
import Link from "next/link";
import Marker from "../components/Marker";
import Story from "../components/story/Story";
import Chibi from "../components/Chibi";
import { Scribble } from "../components/Icons";
import { getCommunity } from "../lib/live";
import { site } from "../lib/site";
import { meta } from "../lib/meta";

export const revalidate = 600;

export const metadata = meta({ path: "/" });

export default async function Home() {
  const community = await getCommunity();

  return (
    <>
      <div className="letterbox top" aria-hidden="true" />
      <div className="letterbox bottom" aria-hidden="true" />
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1 className="hero-title">
              Hi, I&apos;m <Marker>Krishna</Marker>.
              <svg className="twinkle t1" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 1 L14.5 9.5 L23 12 L14.5 14.5 L12 23 L9.5 14.5 L1 12 L9.5 9.5 Z" />
              </svg>
              <svg className="twinkle t2" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 1 L14.5 9.5 L23 12 L14.5 14.5 L12 23 L9.5 14.5 L1 12 L9.5 9.5 Z" />
              </svg>
              <svg className="twinkle t3" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 1 L14.5 9.5 L23 12 L14.5 14.5 L12 23 L9.5 14.5 L1 12 L9.5 9.5 Z" />
              </svg>
            </h1>
            <p className="lede">
              I work on Dexter Copilot, an AI that cohosts live streams. At home I train my own models and run the two
              little servers my bots live on. It all started with one Discord bot in 2019.
            </p>
            <ul className="badges" aria-label="Quick facts">
              {[
                ["dev @ Dexter AI", "#f2c76b"],
                ["Shero: 13,000+ servers", "#bfe0c8"],
                ["training local models", "#f4b8a4"],
              ].map(([t, c], i) => (
                <li key={t} className="badge" style={{ background: c, "--d": `${0.5 + i * 0.12}s`, "--r": `${[-3, 2, -2][i]}deg` }}>
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
            <div className="hero-me" aria-hidden="true">
              <span className="hero-hi">hi!</span>
              <Chibi pose="wave" face="grin" />
            </div>
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

      <section className="tldr" aria-labelledby="tldr-h">
        <div className="wrap">
          <div className="sticker tldr-card" data-reveal>
            <h2 id="tldr-h" className="note tldr-note">
              the 30-second version
            </h2>
            <dl className="tldr-list">
              <div>
                <dt>Looking for</dt>
                <dd>Infrastructure, networking or dev tooling roles</dd>
              </div>
              <div>
                <dt>Now</dt>
                <dd>Volunteer developer on Dexter Copilot, an AI cohost for streamers</dd>
              </div>
              <div>
                <dt>Proof</dt>
                <dd>Shero runs in 13,000+ servers. My homelab has monitoring and monthly restore drills. net-triage gets 16/16 real Cisco cases right.</dd>
              </div>
              <div>
                <dt>Education</dt>
                <dd>M.S. in Artificial Intelligence, UNT. Studying for the CCNA.</dd>
              </div>
            </dl>
            <div className="btns tldr-btns">
              <Link className="btn btn-gold" href="/resume">
                Resume
              </Link>
              <a className="btn" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      <Story community={community} />
    </>
  );
}
