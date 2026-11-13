import SectionHead from "../../components/SectionHead";
import ContactForm from "./ContactForm";
import { GitHub, LinkedIn, Mail, XLogo } from "../../components/Icons";
import { links, site } from "../../lib/site";

export const metadata = {
  title: "Contact",
  description: "Email, LinkedIn, or the form: how to reach Leelakrishna Ravuri.",
};

const direct = [
  { href: `mailto:${site.email}`, label: site.email, note: "email, the fastest way", Icon: Mail },
  { href: links.linkedin, label: "LinkedIn", note: "in/leelakrishnaravuri", Icon: LinkedIn },
  { href: links.github, label: "GitHub", note: "LeelaKrishna-R", Icon: GitHub },
  { href: links.x, label: "X", note: "@leelakr90136330", Icon: XLogo },
];

export default function ContactPage() {
  return (
    <>
      <header className="page-head wrap">
        <SectionHead
          as="h1"
          path="~/contact"
          before="Say "
          mark="hello"
          lede="About a role, a project, or something on this site. I'm open to work in infrastructure, networking and developer tooling."
        />
      </header>
      <section className="page-section">
        <div className="wrap contact-grid">
          <div className="direct">
            {direct.map(({ href, label, note, Icon }) => (
              <a key={href} className="sticker" href={href} data-reveal>
                <Icon />
                <span>
                  {label}
                  <small>{note}</small>
                </span>
              </a>
            ))}
          </div>
          <div data-reveal>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
