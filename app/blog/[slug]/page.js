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

  return (
    <>
      <header className="article-head wrap">
        <Link href="/blog" className="back">
          ← All writing
        </Link>
        <h1>{post.title}</h1>
        <p className="meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.minutes} min read · {site.name}
        </p>
      </header>
      <div className="wrap">
        <article className="sticker article" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </>
  );
}
