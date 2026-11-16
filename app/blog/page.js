import PageHead from "../../components/PageHead";
import Link from "next/link";
import { getAllPosts, formatDate } from "../../lib/posts";
import { hueFor } from "../../lib/projects";
import { meta } from "../../lib/meta";

export const metadata = meta({
  title: "Writing",
  description: "Short posts about why I made things, and how I check they work.",
  path: "/blog",
});

export default async function BlogIndex() {
  const posts = await getAllPosts();
  return (
    <>
      <PageHead
        title="Writing"
        lede="Short posts about why I made things, and how I check they work."
        sfx={{ text: "SCRITCH!", color: "#c9d7f2", rotate: -6 }}
        me={{ pose: "raise", prop: "pencil" }}
      />
      <div className="wrap narrow end">
        <ul className="rows cards">
          {posts.map((p) => (
            <li key={p.slug} data-reveal>
              <Link className="row" href={`/blog/${p.slug}`} data-hue={hueFor(p.slug)}>
                <span className="row-name">{p.title}</span>
                <span className="row-year">{formatDate(p.date)}</span>
                <span className="row-line">{p.excerpt}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
