import PageHead from "../../components/PageHead";
import ContactForm from "./ContactForm";
import { site } from "../../lib/site";
import { meta } from "../../lib/meta";

export const metadata = meta({
  title: "Contact",
  description: "Email hello@ravuri.dev, or send Krishna a message from the form.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHead
        title="Contact"
        sfx={{ text: "RING RING", color: "#bdeedd", rotate: -7, size: 1.15 }}
        me={{ pose: "point", prop: "plane", face: "grin" }}
      >
        <p className="lede">
          Email me at{" "}
          <a className="inline" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          or use the form. Both land in my inbox, and I read every one.
        </p>
      </PageHead>
      <div className="wrap narrow end">
        <ContactForm />
      </div>
    </>
  );
}
