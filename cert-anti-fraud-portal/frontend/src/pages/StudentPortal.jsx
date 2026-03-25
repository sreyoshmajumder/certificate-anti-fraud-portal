// src/pages/StudentPortal.jsx
import React from "react";
import { useMetaMask } from "../hooks/useMetaMask";
//import "./StudentPortal.css";

export default function StudentPortal() {
  const { isAvailable, account, shortAccount, connect, disconnect, chainId } =
    useMetaMask();

  return (
    <div className="student-root">
      <header className="student-header">
        <h1 className="student-title">Student corner</h1>
        <p className="student-subtitle">
          Hold and share your verifiable academic proof.
        </p>
      </header>

      <main className="student-main">
        <section className="card student-card">
          <h2>Connect your wallet</h2>
          <p className="card-subtitle">
            Connect the address where institutions issue your certificates.
          </p>

          {!isAvailable && (
            <p className="alert error">
              MetaMask not detected. Install the extension and refresh this
              page.
            </p>
          )}

          {isAvailable && !account && (
            <button
              type="button"
              className="btn primary"
              onClick={connect}
            >
              Connect MetaMask
            </button>
          )}

          {account && (
            <>
              <div className="wallet-chip">
                <span className="pill-label">Connected wallet</span>
                <span className="pill-value">{shortAccount}</span>
                <button
                  type="button"
                  className="btn ghost small"
                  onClick={disconnect}
                >
                  Disconnect
                </button>
              </div>
              {chainId && (
                <p className="muted">
                  Network: <span className="code">{chainId}</span>
                </p>
              )}
            </>
          )}
        </section>

        <section className="card info-card">
          <h2>How to use this portal</h2>
          <ul className="info-list">
            <li>Ask your institution to issue your certificate on‑chain.</li>
            <li>
              You will receive a certificate PDF with a QR pointing to this
              portal.
            </li>
            <li>
              Anyone scanning the QR can instantly verify authenticity against
              the blockchain.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
