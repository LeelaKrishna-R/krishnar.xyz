import { readFileSync } from "node:fs";
import { join } from "node:path";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Term from "../../../components/Term";
import HowItWorks from "../../../components/HowItWorks";
import PageHead from "../../../components/PageHead";
import CopyButton from "../../../components/CopyButton";
import CountUp from "../../../components/CountUp";
import { ArrowUpRight } from "../../../components/Icons";
import { projects, getProject } from "../../../lib/projects";
import { getCommunity } from "../../../lib/live";
import { meta } from "../../../lib/meta";
import { blurs } from "../../../lib/blurs";

export const revalidate = 600;

// Command-line flags and commands inside the story text become inline code
// that doesn't break across lines.
const CODE = /(--[a-z][\w-]*|lazarus metrics|guardBefore|environment:|0\.0\.0\.0)/g;
function withCode(text) {
  return text.split(CODE).map((part, i) =>
    i % 2 ? (
      <code key={i} className="inline-code">
        {part}
      </code>
    ) : (
      part
    ),
  );
}
export const dynamicParams = false;

// The recorded terminal clips are SVGs in public/demos; their own width and
// height keep the page from jumping while they load.
function demoSize(src) {
  const svg = readFileSync(join(process.cwd(), "public", src), "utf8");
  const [, w, h] = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
  return { width: Number(w), height: Number(h) };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return meta({ title: p.name, description: p.lede, path: `/work/${p.slug}` });
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const i = projects.indexOf(p);
  const prev = projects[i - 1];
  const next = projects[i + 1];
  const community = p.live === "discord" ? await getCommunity() : null;

  return (
    <article className="end" data-hue={p.slug}>
      <PageHead title={p.name} lede={p.lede} back={{ href: "/work", label: "Work" }} />

      <div className="wrap narrow">
      <div className="media">
        {p.media.img ? <span className="tape" aria-hidden="true" /> : null}
        {p.demo ? (
          <figure className="demo">
            <div className="demo-scroll">
              <img className="demo-clip" src={p.demo.src} alt={p.demo.alt} {...demoSize(p.demo.src)} />
            </div>
            <figcaption className="note demo-note">{p.demo.caption}</figcaption>
          </figure>
        ) : p.media.img ? (
          <div className={`sticker frame${p.media.contain ? " iris" : ""}`}>
            <Image src={p.media.img} alt={p.media.alt} fill sizes="(max-width: 760px) 92vw, 680px" quality={90} priority placeholder={blurs[p.media.img] ? "blur" : "empty"} blurDataURL={blurs[p.media.img]} />
          </div>
        ) : (
          <Term lines={p.media.term} label={`Example output from ${p.name}`} />
        )}
      </div>

      {p.stats ? (
        <ul className="glance" aria-label="At a glance">
          {p.stats.map((s) => (
            <li key={s.label} data-reveal>
              <b>
                {s.plain ? s.n : <CountUp value={s.n} />}
                {s.of || ""}
                {s.plus || ""}
              </b>
              <span>{s.label}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {p.story ? (
        <div className="prose case">
          {p.story.map(([h, text]) => (
            <section key={h}>
              <h2>{h}</h2>
              <p>{withCode(text)}</p>
            </section>
          ))}
        </div>
      ) : (
        <div className="prose">
          {p.body.map((para) => (
            <p key={para.slice(0, 24)}>{para}</p>
          ))}
        </div>
      )}

      <HowItWorks slug={p.slug} />

      {p.try ? (
        <section className="try">
          <div className="try-head">
            <h2>Try it</h2>
            <CopyButton text={p.try.filter((l) => !l.startsWith("#")).join("\n")} />
          </div>
          <Term lines={p.try.map((l) => (l.startsWith("#") ? ["dim", l] : ["", "$ " + l]))} label={`How to run ${p.name}`} />
        </section>
      ) : null}

      <div className="facts">
        {community ? (
          <p className="live-pill" style={{ margin: 0 }}>
            <span className="dot-live" aria-hidden="true" />
            {community.members.toLocaleString("en-US")} members
            {community.online ? ` · ${community.online.toLocaleString("en-US")} online` : ""}
          </p>
        ) : null}
        <div className="chips">
          {p.status ? <span className="chip chip-status">{p.status}</span> : null}
          <span className="chip">{p.year}</span>
          {p.tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
        {p.links.length || p.post ? (
        <div className="btns">
          {p.links.map((l, n) => (
            <a key={l.href} className={`btn${n === 0 ? " btn-gold" : ""}`} href={l.href}>
              {l.label} <ArrowUpRight />
            </a>
          ))}
          {p.post ? (
            <Link className="btn" href={`/blog/${p.post}`}>
              Read the write-up
            </Link>
          ) : null}
        </div>
        ) : null}
      </div>

      <nav className="pager" aria-label="More projects">
        {prev ? (
          <Link href={`/work/${prev.slug}`} data-hue={prev.slug}>
            <small>previous</small>← {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/work/${next.slug}`} data-hue={next.slug} style={{ textAlign: "right" }}>
            <small>next</small>
            {next.name} →
          </Link>
        ) : null}
      </nav>
      </div>
    </article>
  );
}
