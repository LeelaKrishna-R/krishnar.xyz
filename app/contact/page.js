import PageHead from "../../components/PageHead";
import ContactForm from "./ContactForm";
import { site } from "../../lib/site";

export const metadata = {
  title: "Contact",
  description: "How to reach Krishna.",
};

export default function ContactPage() {
  return (
    <>
      <PageHead title="Contact" sfx={{ text: "RING RING", color: "#f2c76b", rotate: -7, size: 1.15 }}>
        <p className="lede">
          Email me at{" "}
          <a className="inline" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          or use the form. I read everything.
        </p>
      </PageHead>
      <div className="wrap narrow end">
        <ContactForm />
      </div>
    </>
  );
}
