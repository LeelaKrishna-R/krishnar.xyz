import PageHead from "../../components/PageHead";
import ContactForm from "./ContactForm";
import { site } from "../../lib/site";

export const metadata = {
  title: "Contact",
  description: "Email Krishna, or send him a message from the form.",
};

export default function ContactPage() {
  return (
    <>
      <PageHead
        title="Contact"
        sfx={{ text: "RING RING", color: "#f2c76b", rotate: -7, size: 1.15 }}
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
