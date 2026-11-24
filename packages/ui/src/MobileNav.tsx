"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import type { NavLink } from "@bytescope/config";

export function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center text-text"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      {open && (
        <nav className="absolute left-0 right-0 top-full border-b border-border bg-bg-secondary px-6 py-4">
          <ul className="flex flex-col gap-3">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block py-1 text-sm text-text-secondary transition-colors hover:text-text"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
