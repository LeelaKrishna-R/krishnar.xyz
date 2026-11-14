import ContactForm from "./ContactForm";
import { site } from "../../lib/site";

export const metadata = {
  title: "Contact",
  description: "How to reach Krishna.",
};

export default function ContactPage() {
  return (
    <>
      <header className="wrap narrow page-head">
        <h1>Contact</h1>
        <p className="lede">
          Email me at{" "}
          <a className="inline" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          or use the form. I read everything.
        </p>
      </header>
      <div className="wrap narrow end">
        <ContactForm />
      </div>
    </>
  );
}
