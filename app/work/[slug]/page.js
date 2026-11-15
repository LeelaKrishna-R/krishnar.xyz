import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Term from "../../../components/Term";
import HowItWorks from "../../../components/HowItWorks";
import PageHead from "../../../components/PageHead";
import CopyButton from "../../../components/CopyButton";
import { ArrowUpRight } from "../../../components/Icons";
import { projects, getProject } from "../../../lib/projects";
import { getCommunity } from "../../../lib/live";
import { meta } from "../../../lib/meta";

export const revalidate = 600;
export const dynamicParams = false;

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
    <article className="end">
      <PageHead title={p.name} lede={p.lede} back={{ href: "/work", label: "Work" }} />

      <div className="wrap narrow">
      <div className="media">
        {p.media.img ? <span className="tape" aria-hidden="true" /> : null}
        {p.media.img ? (
          <div className={`sticker frame${p.media.contain ? " iris" : ""}`}>
            <Image src={p.media.img} alt={p.media.alt} fill sizes="(max-width: 760px) 92vw, 680px" priority />
          </div>
        ) : (
          <Term lines={p.media.term} label={`Example output from ${p.name}`} />
        )}
      </div>

      <HowItWorks slug={p.slug} />

      <div className="prose">
        {p.body.map((para) => (
          <p key={para.slice(0, 24)}>{para}</p>
        ))}
      </div>

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
          <span className="chip">{p.year}</span>
          {p.tags.map((t) => (
            <span key={t} className="chip">
              {t}
            </span>
          ))}
        </div>
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
      </div>

      <nav className="pager" aria-label="More projects">
        {prev ? (
          <Link href={`/work/${prev.slug}`}>
            <small>previous</small>← {prev.name}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/work/${next.slug}`} style={{ textAlign: "right" }}>
            <small>next</small>
            {next.name} →
          </Link>
        ) : null}
      </nav>
      </div>
    </article>
  );
}
