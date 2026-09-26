const links = [
  ["Home", "/"],
  ["Clients", "/clients"],
  ["Services", "/services"],
  ["Travel", "/travel"],
  ["Ecommerce", "/ecommerce"],
  ["Media & marketing", "/media-and-marketing"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const

export function SiteHeader() {
  return (
    <header className="global-header">
      <a href="/" aria-label="Basilpot home" className="global-logo">
        <img src="/basilpot-logo.svg" alt="" width={473} height={96} />
      </a>
    </header>
  )
}

export function SiteNavigation({ currentPath }: { currentPath?: string }) {
  return (
    <nav aria-label="Site navigation" className="site-navigation">
      {links.map(([label, href]) => (
        <a
          key={href}
          href={href}
          aria-current={currentPath === href ? "page" : undefined}
        >
          {label}
        </a>
      ))}
    </nav>
  )
}
