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
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>
              Hi, I&apos;m <Marker>Krishna</Marker>.
            </h1>
            <p className="lede">
              I make Discord bots and small dev tools, and I&apos;m building Friday, a personal AI. Below is the short
              version of how I got here.
            </p>
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
                <b>Leelakrishna Ravuri</b>
                <span>Denton, TX</span>
              </figcaption>
            </figure>
            <span className="note id-note">
              me, Ghibli-style <Scribble />
            </span>
          </div>
        </div>
        <a className="scroll-hint" href="#s-2019" aria-label="Scroll to the story">
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
