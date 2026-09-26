import { ArrowUpRight } from "lucide-react"

import { clients } from "../data/clients"
import { SiteFooter, SiteHeader } from "./site-header"

export function ClientStage() {
  return (
    <div className="client-stage">
      <a href="#client-work" className="client-skip-link">
        Skip to client work
      </a>
      <SiteHeader />

      <main id="client-work" className="client-main">
        <div className="client-content">
          <h1 className="client-page-title">Clients</h1>
          <ol className="client-list">
            {clients.map((client, index) => (
              <li key={client.url}>
                <details className="client-entry">
                  <summary className="client-trigger">
                    <span className="client-number">
                      {String(index + 1).padStart(2, "0")}.
                    </span>
                    <span className="client-name">{client.name}</span>
                  </summary>
                  <div className="client-detail">
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
                </details>
              </li>
            ))}
          </ol>
        </div>
      </main>
      <SiteFooter currentPath="/clients" className="client-footer" />
    </div>
  )
}
