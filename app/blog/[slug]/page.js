import ReadPencil from "../../../components/ReadPencil";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, formatDate } from "../../../lib/posts";
import { site } from "../../../lib/site";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", title: post.title, description: post.excerpt, publishedTime: post.date },
  };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  const all = await getAllPosts();
  const i = all.findIndex((p) => p.slug === slug);
  const newer = all[i - 1];
  const older = all[i + 1];

  return (
    <>
      <ReadPencil />
      <header className="wrap narrow page-head">
        <Link href="/blog" className="back">
          ← Writing
        </Link>
        <h1>{post.title}</h1>
        <p className="meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.minutes} min read · {site.name}
        </p>
      </header>
      <div className="wrap narrow">
        <article className="article" dangerouslySetInnerHTML={{ __html: post.html }} />
        {newer || older ? (
          <nav className="pager end" aria-label="More posts">
            {older ? (
              <Link href={`/blog/${older.slug}`}>
                <small>older</small>← {older.title}
              </Link>
            ) : (
              <span />
            )}
            {newer ? (
              <Link href={`/blog/${newer.slug}`} style={{ textAlign: "right" }}>
                <small>newer</small>
                {newer.title} →
              </Link>
            ) : null}
          </nav>
        ) : null}
      </div>
    </>
  );
}
