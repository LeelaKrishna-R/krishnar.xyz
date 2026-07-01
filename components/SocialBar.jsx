"use client";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const socials = [
  { name: "GitHub", href: "https://github.com/LeelaKrishna-R", Icon: Github },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/leelakrishnaravuri/", Icon: Linkedin },
  { name: "X", href: "https://twitter.com/leelakr90136330", Icon: Twitter },
  { name: "Email", href: "mailto:email@krishnar.xyz", Icon: Mail },
];

export default function SocialBar() {
  return (
    <div className="social-wrap">
      <div className="social-icons">
        {socials.map((s) => {
          const external = s.href.startsWith("http");
          return (
            <a
              key={s.name}
              href={s.href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="social-icon"
              aria-label={s.name}
            >
              <s.Icon size={18} strokeWidth={2} aria-hidden="true" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
