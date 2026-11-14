import PageHead from "../../components/PageHead";
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
      <PageHead title="About" sfx={{ text: "HELLO!", color: "#f4b8a4", rotate: 8 }} />

      <div className="wrap narrow end">
        <section className="block prose">
          <p>
            I&apos;m Leelakrishna Ravuri. Most people call me Krishna. I&apos;m from India, studied electronics and
            communication engineering at Kalasalingam University, then moved to Texas for a master&apos;s in AI at UNT.
          </p>
          <p>
            I&apos;m a developer at Dexter AI, on <Link href="/work/copilot">Dexter Copilot</Link> itself and the bots
            around it. I train and run models on my own hardware, I&apos;ve done several freelance projects (under NDA,
            so they&apos;re not listed here), and I&apos;ve been making Discord bots since 2019.
          </p>
          <p>
            Lately I care a lot about the stuff underneath: servers, networks, keeping things up. That&apos;s why
            there&apos;s a <Link href="/homelab">homelab</Link> and why I&apos;m studying for the CCNA.
          </p>
          <p>
            I&apos;m open to work in infrastructure, networking or dev tooling. Email is the best way to reach me:{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>. My resume is <Link href="/resume">here</Link>.
          </p>
        </section>

        <section className="block">
          <h2>So far</h2>
          <div className="road">
            <svg className="road-line" viewBox="0 0 40 600" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <mask id="road-mask" maskUnits="userSpaceOnUse" x="-20" y="-10" width="80" height="620">
                  <path className="road-reveal" pathLength="1" d="M20 0 C 36 60, 4 120, 20 180 S 36 300, 20 360 S 4 480, 20 540 S 30 590, 20 600" />
                </mask>
              </defs>
              <g mask="url(#road-mask)">
                <path className="road-base" d="M20 0 C 36 60, 4 120, 20 180 S 36 300, 20 360 S 4 480, 20 540 S 30 590, 20 600" />
                <path className="road-mid" d="M20 0 C 36 60, 4 120, 20 180 S 36 300, 20 360 S 4 480, 20 540 S 30 590, 20 600" />
              </g>
            </svg>
            <ol className="road-stops">
              {timeline.map((t) => (
                <li key={t.when} data-reveal>
                  <span className="road-pin" aria-hidden="true" />
                  <b>{t.when}</b>
                  <p>{t.text}</p>
                </li>
              ))}
            </ol>
          </div>
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
