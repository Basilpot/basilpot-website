import { ArrowUpRight } from "lucide-react"
import { useState } from "react"

import { clients } from "../data/clients"
import { products } from "../data/products"

export function ClientStage() {
  const [activeClient, setActiveClient] = useState<number | null>(null)
  const activeTheme =
    activeClient === null ? "" : `client-theme-${clients[activeClient].theme}`

  return (
    <div className={`client-stage ${activeTheme}`}>
      <a href="#client-work" className="client-skip-link">
        Skip to client work
      </a>
      <header className="client-header">
        <nav aria-label="Products and site navigation" className="client-nav">
          <a href="/">Basilpot</a>
          {products.map((product) => (
            <a
              key={product.url}
              href={product.url}
              target="_blank"
              rel="noreferrer"
            >
              {product.name}
            </a>
          ))}
          <a href="/media-and-marketing">Media</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
        <a href="/" aria-label="Basilpot home" className="client-logo">
          <img src="/basilpot-logo.svg" alt="" width={473} height={96} />
        </a>
      </header>

      <main id="client-work" className="client-main">
        <h1 className="sr-only">Basilpot client work</h1>
        <ol className="client-list">
          {clients.map((client, index) => {
            const active = activeClient === index

            return (
              <li key={client.url} className="client-entry">
                <button
                  type="button"
                  onClick={() => setActiveClient(index)}
                  aria-expanded={active}
                  aria-controls={`client-detail-${index}`}
                  className={`client-trigger ${active ? "is-active" : ""}`}
                >
                  <span className="client-number">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                  <span className="client-name">{client.name}</span>
                </button>
                {active && (
                  <div id={`client-detail-${index}`} className="client-detail">
                    {client.credit === "growfore" && (
                      <p className="client-credit">
                        *built by <a href="/about">Tej</a> at{" "}
                        <a
                          href="https://growfore.com/"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Growfore
                        </a>
                        .
                      </p>
                    )}
                    <p>{client.detail}</p>
                    <a
                      href={client.url}
                      target="_blank"
                      rel="noreferrer"
                      className="client-visit"
                    >
                      Visit {client.name}
                      <ArrowUpRight
                        aria-hidden="true"
                        size={20}
                        strokeWidth={2.5}
                      />
                    </a>
                  </div>
                )}
              </li>
            )
          })}
        </ol>
      </main>
    </div>
  )
}
