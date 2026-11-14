import { ogImage, ogSize } from "../../../lib/og";
import { getAllPosts, getPost, formatDate } from "../../../lib/posts";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "A post by Krishna Ravuri";

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  return ogImage({
    label: `Krishna Ravuri · ${post ? formatDate(post.date) : "writing"}`,
    title: post?.title ?? "Writing",
    line: post ? `${post.minutes} min read` : "",
  });
}
