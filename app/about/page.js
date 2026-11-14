import Link from "next/link";
import Calendar from "../../components/Calendar";
import { timeline } from "../../lib/timeline";
import { getGithub } from "../../lib/live";
import { links, site } from "../../lib/site";

export const revalidate = 3600;

export const metadata = {
  title: "About",
  description: "A bit about Krishna: where I'm from, what I studied, and what I'm working on.",
};

export default async function AboutPage() {
  const gh = await getGithub();
  return (
    <>
      <header className="wrap narrow page-head">
        <h1>About</h1>
      </header>

      <div className="wrap narrow end">
        <section className="block prose">
          <p>
            I&apos;m Leelakrishna Ravuri. Most people call me Krishna. I&apos;m from India, studied electronics and
            communication engineering at Kalasalingam University, then moved to Texas for a master&apos;s in AI at UNT.
          </p>
          <p>
            I&apos;ve been making Discord bots since 2019. Lately I care more about the stuff underneath: servers,
            networks, keeping things up. That&apos;s why there&apos;s a <Link href="/homelab">homelab</Link> and why
            I&apos;m studying for the CCNA.
          </p>
          <p>
            I&apos;m open to work in infrastructure, networking or dev tooling. Email is the best way to reach me:{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>. My resume is <Link href="/resume">here</Link>.
          </p>
        </section>

        <section className="block">
          <h2>So far</h2>
          <dl className="timeline">
            {timeline.map((t) => (
              <div key={t.when} style={{ display: "contents" }}>
                <dt>{t.when}</dt>
                <dd>{t.text}</dd>
              </div>
            ))}
          </dl>
        </section>

        {gh.days ? (
          <section className="block">
            <h2>The last year on GitHub</h2>
            <div className="sticker calendar">
              <div className="calendar-scroll">
                <Calendar days={gh.days} />
              </div>
              <p className="calendar-foot">
                {typeof gh.lastYear === "number" ? `${gh.lastYear.toLocaleString("en-US")} contributions. ` : ""}
                Most of them are in private repos.{" "}
                <a className="inline" href={links.github}>
                  github.com/LeelaKrishna-R
                </a>
              </p>
            </div>
          </section>
        ) : null}

        <section className="block">
          <h2>Elsewhere</h2>
          <div className="btns">
            <a className="btn btn-gold" href={`mailto:${site.email}`}>
              Email
            </a>
            <a className="btn" href={links.github}>
              GitHub
            </a>
            <a className="btn" href={links.linkedin}>
              LinkedIn
            </a>
            <a className="btn" href={links.x}>
              X
            </a>
            <Link className="btn" href="/contact">
              Contact form
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
