"use client";

import BackToTop from "../../components/BackToTop";
import ContactForm from "./ContactForm";
import RootClient from "../../components/RootClient";

export default function ClientContactPage() {
  return (
    <div>
      <RootClient />
      <main>
        <section>
          <div className="container">
            <h1 className="section-title">Get in touch</h1>
            <div className="contact-grid">
              <div className="contact-intro">
                <p>
                  Whether it's about a role, a project, or something I've built, I'd be glad to
                  hear from you. Use the form, or reach me directly through any of these.
                </p>
                <div className="contact-links">
                  <a href="mailto:email@krishnar.xyz">email@krishnar.xyz</a>
                  <a
                    href="https://www.linkedin.com/in/leelakrishnaravuri/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/LeelaKrishna-R"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </div>
              </div>
              <div className="contact-form-wrap">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <BackToTop />
    </div>
  );
}
