import Link from "next/link";
import SectionHead from "../../components/SectionHead";
import { getAllPosts, formatDate } from "../../lib/posts";

export const metadata = {
  title: "Writing",
  description: "Notes on building lazarus and net-triage, and on moving from AI into infrastructure.",
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  return (
    <>
      <header className="page-head wrap">
        <SectionHead
          as="h1"
          path="~/writing"
          before="Notes from the "
          mark="build"
          lede="What I learned building the tools on this site, written up after the fact."
        />
      </header>
      <section className="page-section">
        <div className="wrap">
          <div className="post-list">
            {posts.map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="sticker post-row" data-reveal>
                <time dateTime={p.date}>
                  {formatDate(p.date)}
                  <br />
                  {p.minutes} min read
                </time>
                <div>
                  <h2>{p.title}</h2>
                  <p>{p.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
