import PageHead from "../../components/PageHead";
import Link from "next/link";
import Calendar from "../../components/Calendar";
import { timeline } from "../../lib/timeline";
import { skillGroups } from "../../lib/skills";
import { getGithub } from "../../lib/live";
import { links, site } from "../../lib/site";
import { meta } from "../../lib/meta";

export const revalidate = 3600;

export const metadata = meta({
  title: "About",
  description: "Who Krishna is: from Madurai to an M.S. in AI at UNT, now working on Dexter Copilot and studying for the CCNA.",
  path: "/about",
});

export default async function AboutPage() {
  const gh = await getGithub();
  return (
    <>
      <PageHead title="About" sfx={{ text: "HELLO!", color: "#f4b8a4", rotate: 8 }} me={{ pose: "wave", face: "grin" }} />

      <div className="wrap narrow end">
        <section className="block prose">
          <p>
            I&apos;m Leelakrishna Ravuri. Most people call me Krishna. I&apos;m from India, studied electronics and
            communication engineering at Kalasalingam University, then moved to Texas for a master&apos;s in AI at UNT.
          </p>
          <p>
            I&apos;m a volunteer developer at Dexter AI, on <Link href="/work/copilot">Dexter Copilot</Link> itself and the seven
            bots that run its community. I&apos;ve been building Discord bots since 2019, grew{" "}
            <Link href="/work/shero">Shero</Link> into a security bot used in more than 13,000 servers, and I&apos;ve delivered
            several freelance projects (under NDA, so they&apos;re not listed here).
          </p>
          <p>
            The part I enjoy most is the layer underneath: servers, networks and keeping things running. I run a
            two-node Proxmox <Link href="/homelab">homelab</Link> with monitoring, nightly backups and monthly restore
            drills, train and run models on my own GPU, and I&apos;m studying for the CCNA.
          </p>
          <p>
            I&apos;m looking for roles in infrastructure, networking or developer tooling. Email is the best way to reach me:{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a>. My resume is <Link href="/resume">here</Link>.
          </p>
        </section>

        <section className="block" aria-labelledby="skills-h">
          <h2 id="skills-h">What I work with</h2>
          <p className="note skills-note">The linked ones open something I built with it.</p>
          <dl className="skills">
            {skillGroups.map((g) => (
              <div className="skills-row" key={g.group} data-reveal>
                <dt>{g.group}</dt>
                <dd>
                  <ul className="skills-list">
                    {g.items.map((s) =>
                      s.href ? (
                        <li key={s.name}>
                          {s.href.startsWith("/") ? (
                            <Link className="skill linked" href={s.href} data-hue={s.hue} title={`Used in ${s.where}`} aria-label={`${s.name}, used in ${s.where}`}>
                              {s.name}
                              <span className="skill-go" aria-hidden="true">↗</span>
                            </Link>
                          ) : (
                            <a className="skill linked" href={s.href} title={`Used in ${s.where}`} aria-label={`${s.name}, used in ${s.where}`}>
                              {s.name}
                              <span className="skill-go" aria-hidden="true">↗</span>
                            </a>
                          )}
                        </li>
                      ) : (
                        <li key={s.name}>
                          <span className="skill">{s.name}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
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
