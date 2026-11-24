import { Search } from "lucide-react";
import type { NavLink } from "@bytescope/config";
import { Container } from "./Container";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";

export function Header({
  siteName,
  navigation,
}: {
  siteName: string;
  navigation: NavLink[];
}) {
  return (
    <header className="relative border-b border-border bg-bg">
      <Container>
        <div className="flex h-16 items-center justify-between gap-6">
          <a href="/" className="shrink-0">
            <Logo siteName={siteName} />
          </a>

          <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
            {navigation.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary transition-colors hover:text-text"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Search"
              className="hidden h-9 w-9 items-center justify-center text-text-secondary transition-colors hover:text-text lg:flex"
            >
              <Search size={16} />
            </button>
            <ThemeToggle />
            <MobileNav links={navigation} />
          </div>
        </div>
      </Container>
    </header>
  );
}
