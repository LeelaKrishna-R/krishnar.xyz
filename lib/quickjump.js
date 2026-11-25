// What the quick-jump box (components/QuickJump.jsx) can find: every page,
// project and post, plus a few actions. Built on the server from the same
// data the pages use, so a new project or post shows up there by itself.
import { projects } from "./projects";
import { getAllPosts } from "./posts";
import { nav, links, site } from "./site";
import { pdfPath } from "./resume";

const pageHints = {
  "/work": "everything I've built, biggest first",
  "/homelab": "two Proxmox nodes, live status",
  "/blog": "posts about the work",
  "/about": "who I am, the road so far",
  "/resume": "one page, PDF and text",
};

export async function quickJumpItems() {
  const posts = await getAllPosts();
  return [
    {
      id: "p-home",
      group: "page",
      name: "Home",
      href: "/",
      hint: "the story, start to now",
    },
    ...nav.map((n) => ({
      id: `p-${n.href}`,
      group: "page",
      name: n.label,
      href: n.href,
      hint: pageHints[n.href] || "",
    })),
    {
      id: "p-contact",
      group: "page",
      name: "Contact",
      href: "/contact",
      hint: "send me a message",
    },
    ...projects.map((p) => ({
      id: `w-${p.slug}`,
      group: "project",
      name: p.name,
      href: `/work/${p.slug}`,
      hint: p.line,
      keys: (p.tags || []).join(" "),
      hue: p.slug,
    })),
    ...posts.map((p) => ({
      id: `b-${p.slug}`,
      group: "post",
      name: p.title,
      href: `/blog/${p.slug}`,
      hint: `${p.minutes} min read`,
    })),
    {
      id: "a-theme",
      group: "action",
      name: "Switch light or dark",
      act: "theme",
      keys: "theme dark light mode",
    },
    {
      id: "a-copy",
      group: "action",
      name: "Copy my email",
      act: "copy",
      value: site.email,
      hint: site.email,
      keys: "mail contact",
    },
    {
      id: "a-pdf",
      group: "action",
      name: "Download the resume PDF",
      href: pdfPath,
      keys: "cv resume pdf",
    },
    {
      id: "a-gpu",
      group: "action",
      name: "Spin the 3D GPU",
      act: "gpu",
      hint: "RX 7900 XTX",
      keys: "gpu graphics card 3d easter egg",
    },
    {
      id: "a-gh",
      group: "action",
      name: "GitHub",
      href: links.github,
      hint: "github.com/LeelaKrishna-R",
      keys: "code source",
    },
    {
      id: "a-li",
      group: "action",
      name: "LinkedIn",
      href: links.linkedin,
      keys: "linkedin profile",
    },
  ];
}
