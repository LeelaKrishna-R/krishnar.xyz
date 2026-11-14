import Link from "next/link";
import { getAllPosts, formatDate } from "../../lib/posts";

export const metadata = {
  title: "Writing",
  description: "Write-ups about things I built.",
};

export default async function BlogIndex() {
  const posts = await getAllPosts();
  return (
    <>
      <header className="wrap narrow page-head">
        <h1>Writing</h1>
        <p className="lede">Write-ups about things I built.</p>
      </header>
      <div className="wrap narrow end">
        <ul className="rows">
          {posts.map((p) => (
            <li key={p.slug} data-reveal>
              <Link className="row" href={`/blog/${p.slug}`}>
                <span className="row-name">{p.title}</span>
                <span className="row-year">{formatDate(p.date)}</span>
                <span className="row-line">{p.minutes} min read</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
