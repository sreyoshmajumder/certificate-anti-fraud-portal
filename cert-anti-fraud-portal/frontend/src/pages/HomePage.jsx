import React from "react";
import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-root">
      {/* HERO */}
      <section className="hero">
        <div className="hero-left">
          <p className="eyebrow">For universities, colleges & training institutes</p>
          <h1>
            Replace fragile paper certificates with{" "}
            <span className="hero-highlight">tamper‑proof on‑chain credentials</span>.
          </h1>
          <p className="hero-sub">
            Issue, store and verify academic records in seconds using public
            blockchains. No manual email checks, no forged PDFs, no lost
            transcripts.
          </p>
          <div className="hero-actions">
            <a href="/institutions" className="btn primary">
              Launch institution console
            </a>
            <a href="/verify" className="btn ghost">
              Verify a certificate
            </a>
          </div>
          <p className="hero-footnote">
            Built for high‑stakes credentials: degrees, mark sheets, training
            certificates, micro‑credentials and more.
          </p>
        </div>

        <div className="hero-right">
          <div className="hero-card hero-card-main">
            <div className="hero-badge">Live on testnet</div>
            <h3>Auditable credential ledger</h3>
            <p>
              Every certificate is written to a smart contract with a unique
              on‑chain fingerprint. Institutions stay in control; verifiers only
              see what they need.
            </p>
            <ul>
              <li>Ownership tied to student wallet</li>
              <li>Instant authenticity checks from any browser</li>
              <li>Revocation & expiry baked into the protocol</li>
            </ul>
          </div>

          <div className="hero-mosaic">
            <div className="hero-stat">
              <span className="stat-label">Verification time</span>
              <span className="stat-value">≈ 3 sec</span>
              <span className="stat-caption">Scan QR → query contract → result</span>
            </div>
            <div className="hero-stat">
              <span className="stat-label">Fraud attempts stopped</span>
              <span className="stat-value">∞</span>
              <span className="stat-caption">
                Every forged PDF fails the on‑chain fingerprint match.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="section">
        <h2>Why institutions adopt this portal</h2>
        <p className="section-sub">
          Designed with registrars, examination cells and placement offices in
          mind. No blockchain expertise required – your existing workflows stay,
          verification becomes trustless.
        </p>
        <div className="grid-3">
          <div className="feature-card">
            <h3>Zero‑trust verification</h3>
            <p>
              Anyone with a browser can independently verify a certificate
              against the smart contract – no emails, stamps or phone calls.
            </p>
          </div>
          <div className="feature-card">
            <h3>Institution‑controlled issuing</h3>
            <p>
              Only wallets approved by your exam cell can issue credentials.
              Role separation between admin, controller and verifier.
            </p>
          </div>
          <div className="feature-card">
            <h3>Student‑centric ownership</h3>
            <p>
              Students hold credentials in their own wallet, ready to share with
              employers, foreign universities or scholarship bodies.
            </p>
          </div>
        </div>
      </section>

      {/* FLOWS */}
      <section className="section">
        <h2>Three simple workspaces</h2>
        <div className="grid-3 tight">
          <div className="flow-card">
            <span className="flow-label">Institutions</span>
            <h3>Issue & manage</h3>
            <p>
              Secure console for bulk issue, revocation and wallet management.
              Integrated with your official signing wallet.
            </p>
          </div>
          <div className="flow-card">
            <span className="flow-label">Students</span>
            <h3>Hold & share</h3>
            <p>
              View issued credentials, download PDFs with QR, and share verifiable
              links with a single click.
            </p>
          </div>
          <div className="flow-card">
            <span className="flow-label">Verifiers</span>
            <h3>Trust but verify</h3>
            <p>
              Paste certificate ID or scan QR to instantly see authenticity,
              issuer, and status on chain.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
