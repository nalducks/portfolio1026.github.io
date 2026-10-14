import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between h-16">
        <a href="#home" className="group text-xl font-bold tracking-tight text-foreground font-display">
          <span className="inline-flex items-center gap-2">
            <span className="relative bg-gradient-to-br from-primary to-accent w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-primary-foreground shadow-[0_0_12px_hsl(var(--primary)/0.4)] group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.6)] transition-shadow duration-300">
              D
              <span className="absolute inset-0 rounded-lg border border-primary/30" />
            </span>
            <span className="flex items-baseline gap-0.5">
              <span className="text-foreground tracking-widest text-base">DHANY</span>
              <span className="text-primary text-lg font-extrabold">.P</span>
            </span>
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm px-4 py-2 rounded-lg text-muted-foreground hover:text-primary transition-all duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden glass border-b border-border/50">
          <ul className="flex flex-col items-center gap-4 py-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-base text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
