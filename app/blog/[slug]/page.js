import ReadPencil from "../../../components/ReadPencil";
import PageHead from "../../../components/PageHead";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, formatDate } from "../../../lib/posts";
import { site } from "../../../lib/site";
import { meta } from "../../../lib/meta";

export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return meta({ title: post.title, description: post.excerpt, path: `/blog/${slug}`, type: "article", publishedTime: post.date });
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
      <PageHead
        title={post.title}
        back={{ href: "/blog", label: "Writing" }}
        meta={
          <>
            <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.minutes} min read · {site.name}
          </>
        }
      />
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
