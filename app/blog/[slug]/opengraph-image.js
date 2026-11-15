import { ogImage, ogSize } from "../../../lib/og";
import { getAllPosts, getPost, formatDate } from "../../../lib/posts";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "A post by Leelakrishna Ravuri";

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return ogImage({
    label: `ravuri.dev · ${post ? formatDate(post.date) : "writing"}`,
    title: post?.title ?? "Writing",
    line: post?.excerpt ? (post.excerpt.length > 120 ? post.excerpt.slice(0, 117).replace(/s+S*$/, "") + "…" : post.excerpt) : "",
    me: { pose: "raise", prop: "pencil" },
  });
}
