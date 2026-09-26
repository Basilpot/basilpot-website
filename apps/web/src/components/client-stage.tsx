import { ArrowUpRight } from "lucide-react"
import { useState } from "react"

import { clients } from "../data/clients"
import { SiteHeader, SiteNavigation } from "./site-header"

export function ClientStage() {
  const [activeClient, setActiveClient] = useState<number | null>(null)
  const [noteOpen, setNoteOpen] = useState(false)

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
            {clients.map((client, index) => {
              const active = activeClient === index

              return (
                <li key={client.url} className="client-entry">
                  <button
                    type="button"
                    onClick={() => {
                      setNoteOpen(false)
                      setActiveClient(index)
                    }}
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
                    <div
                      id={`client-detail-${index}`}
                      className="client-detail"
                    >
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
            <li className="client-entry">
              <button
                type="button"
                onClick={() => {
                  setActiveClient(null)
                  setNoteOpen((open) => !open)
                }}
                aria-expanded={noteOpen}
                aria-controls="client-inspiration-note"
                className={`client-trigger ${noteOpen ? "is-active" : ""}`}
              >
                <span className="client-number">
                  {String(clients.length + 1).padStart(2, "0")}.
                </span>
                <span className="client-name">A note on inspiration</span>
              </button>
              {noteOpen && (
                <div id="client-inspiration-note" className="client-detail">
                  <p>
                    We owe a nod to{" "}
                    <a
                      href="http://37signals.com/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      37signals
                    </a>
                    . This site takes clear inspiration from their design, and
                    Basilpot shares an appreciation for many of their ideas
                    about staying small, working deliberately, and building
                    sustainable products.
                  </p>
                  <p>
                    We’re not affiliated with 37signals — we just like how they
                    think.
                  </p>
                </div>
              )}
            </li>
          </ol>
        </div>
      </main>
      <footer className="client-footer">
        <SiteNavigation currentPath="/clients" />
        <div className="footer-contact">
          <p>seed@basilpot.com</p>
          <p>Web studio, Nepal</p>
          <p>© {new Date().getFullYear()} Basilpot</p>
        </div>
      </footer>
    </div>
  )
}
