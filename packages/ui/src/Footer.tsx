import type { NavLink, SocialLink } from "@bytescope/config";
import { Container } from "./Container";
import { Logo } from "./Logo";

const legalLinks: NavLink[] = [
  { label: "Editorial Policy", href: "/editorial-policy" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Disclaimer", href: "/disclaimer" },
  { label: "Corrections Policy", href: "/corrections-policy" },
];

export function Footer({
  siteName,
  tagline,
  navigation,
  socialLinks,
}: {
  siteName: string;
  tagline: string;
  navigation: NavLink[];
  socialLinks: SocialLink[];
}) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-bg">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <Logo siteName={siteName} />
            <p className="mt-3 max-w-xs text-sm text-text-secondary">{tagline}</p>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-text-secondary">
              Sections
            </h3>
            <ul className="flex flex-col gap-2">
              {navigation.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-secondary transition-colors hover:text-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-text-secondary">
              Company
            </h3>
            <ul className="flex flex-col gap-2">
              <li>
                <a href="/about" className="text-sm text-text-secondary transition-colors hover:text-text">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="text-sm text-text-secondary transition-colors hover:text-text">
                  Contact
                </a>
              </li>
              <li>
                <a href="/advertise" className="text-sm text-text-secondary transition-colors hover:text-text">
                  Advertise With Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-wide text-text-secondary">
              Newsletter
            </h3>
            <p className="mb-3 text-sm text-text-secondary">
              Technology, in perspective — delivered weekly.
            </p>
            <a
              href="/#newsletter"
              className="text-sm font-medium text-accent transition-opacity hover:opacity-80"
            >
              Subscribe
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="text-xs text-text-secondary">
            &copy; {year} {siteName}. All rights reserved.
          </p>

          <ul className="flex flex-wrap gap-4">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-xs text-text-secondary transition-colors hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {socialLinks.length > 0 && (
            <ul className="flex gap-4">
              {socialLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    className="text-xs capitalize text-text-secondary transition-colors hover:text-text"
                  >
                    {link.platform}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </footer>
  );
}
