import Image from "next/image";
import Link from "next/link";
import Marker from "../components/Marker";
import { Rows, ProjectRow } from "../components/Rows";
import { Scribble } from "../components/Icons";
import { bigProjects, tools } from "../lib/projects";
import { getAllPosts, formatDate } from "../lib/posts";
import { getCommunity } from "../lib/live";
import { site } from "../lib/site";

export const revalidate = 600;

export default async function Home() {
  const [community, posts] = await Promise.all([getCommunity(), getAllPosts()]);

  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <h1>
              Hi, I&apos;m <Marker>Krishna</Marker>.
            </h1>
            <p className="lede">
              I make Discord bots and small dev tools, and I&apos;m building Friday, an AI that looks after my day. The
              bots run on two little Dell PCs in my homelab.
            </p>
            <p className="lede muted">Right now I&apos;m also studying for the CCNA.</p>
            <div className="btns">
              <Link className="btn btn-gold" href="/work">
                See my work
              </Link>
              <a className="btn" href={`mailto:${site.email}`}>
                Email me
              </a>
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
      </section>

      <div className="wrap home-grid">
        <section>
          <div className="label">
            <span>Things I&apos;ve made</span>
            <Link href="/work">all of it</Link>
          </div>
          <Rows>
            {bigProjects.map((p) => (
              <ProjectRow key={p.slug} p={p} />
            ))}
            <li data-reveal>
              <Link className="row" href="/work#tools">
                <span className="row-name">+ {tools.length} small tools</span>
                <span className="row-year">→</span>
                <span className="row-line">{tools.map((t) => t.name).join(", ")}</span>
              </Link>
            </li>
          </Rows>
        </section>

        <div>
          <section>
            <div className="label">
              <span>Lately</span>
              <span>Nov 2026</span>
            </div>
            <ul className="lately">
              {community ? (
                <li>
                  <span className="dot-live" aria-hidden="true" />
                  Looking after the Dexter AI Discord. {community.members.toLocaleString("en-US")} members,{" "}
                  {community.online ? `${community.online.toLocaleString("en-US")} online right now.` : ""}
                </li>
              ) : (
                <li>Looking after the bots for the Dexter AI Discord.</li>
              )}
              <li>
                Fixing the homelab. Last thing to break was a{" "}
                <Link className="inline" href="/homelab#broke">
                  dodgy power adapter
                </Link>
                .
              </li>
              <li>Studying subnetting for the CCNA.</li>
            </ul>
          </section>

          <section>
            <div className="label">
              <span>Writing</span>
              <Link href="/blog">all posts</Link>
            </div>
            <ul className="lately">
              {posts.slice(0, 3).map((p) => (
                <li key={p.slug}>
                  <Link className="post-link" href={`/blog/${p.slug}`}>
                    {p.title}
                  </Link>
                  <div className="row-year" style={{ marginTop: 4 }}>
                    {formatDate(p.date)}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </>
  );
}
