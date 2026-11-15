// Structured data (schema.org JSON-LD) so search engines know the site is
// about one person, and which pages are his posts. Built from site.js and
// resume.js, so it says what the pages say.
import { site, links } from "./site";
import { education } from "./resume";

export const person = {
  "@type": "Person",
  "@id": `${site.url}/#me`,
  name: site.name,
  alternateName: "Krishna",
  url: site.url,
  image: `${site.url}/icon-512.png`,
  email: `mailto:${site.email}`,
  jobTitle: "Software Developer",
  description: site.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Denton",
    addressRegion: "TX",
    addressCountry: "US",
  },
  alumniOf: education.map((e) => ({
    "@type": "CollegeOrUniversity",
    name: e.school,
  })),
  knowsAbout: ["Discord bots", "Node.js", "TypeScript", "Python", "Proxmox", "Linux", "Networking", "LLM agents"],
  sameAs: [links.github, links.linkedin, links.x],
};

export function profilePage() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: site.url,
    mainEntity: person,
  };
}

export function blogPosting(post, slug) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    url: `${site.url}/blog/${slug}`,
    mainEntityOfPage: `${site.url}/blog/${slug}`,
    image: `${site.url}/blog/${slug}/opengraph-image`,
    author: {
      "@id": person["@id"],
      "@type": "Person",
      name: site.name,
      url: site.url,
    },
  };
}

// "<" escaped so a title can never close the script tag early.
export function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
