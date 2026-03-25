import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { useMetaMask } from "../hooks/useMetaMask";
import { CERT_PORTAL_ADDRESS, CERT_PORTAL_ABI } from "../blockchain/contractConfig";
import { ethers } from "ethers";

export default function VerifierPortal() {
  const { provider, connect } = useMetaMask();
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");

  const verify = async (e) => {
    e.preventDefault();
    try {
      if (!provider) {
        await connect();
      }
      const p = provider || new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        CERT_PORTAL_ADDRESS,
        CERT_PORTAL_ABI,
        p
      );
      setStatusMsg("Querying certificate on-chain...");
      const [cert, inst, valid] = await contract.getCertificate(
        parseInt(certId, 10)
      );
      setResult({ cert, inst, valid });
      setStatusMsg("");
    } catch (err) {
      setStatusMsg(err.message || "Verification failed");
      setResult(null);
    }
  };

  const verificationUrl = `${window.location.origin}/verify?id=${certId || ""}`;

  return (
    <div className="page">
      <div className="page-header">
        <h1>Verify certificate</h1>
        <span className="page-pill">QR-backed, on-chain proof</span>
      </div>

      <div className="grid">
        <div className="card">
          <h2>Lookup by ID</h2>
          <form onSubmit={verify}>
            <label>
              Certificate ID
              <input
                type="number"
                value={certId}
                onChange={(e) => setCertId(e.target.value)}
                placeholder="Scan QR or type ID"
              />
            </label>
            <button type="submit">Verify on-chain</button>
          </form>
          {statusMsg && <p className="muted" style={{ marginTop: 8 }}>{statusMsg}</p>}
        </div>

        <div className="card">
          <h2>Verification result</h2>
          {!result && <p className="muted">No certificate loaded yet.</p>}
          {result && (
            <>
              <p>
                <strong>{result.cert.studentName}</strong> ·{" "}
                {result.cert.courseName}
              </p>
              <p className="muted">
                Issued by: {result.inst.name} ({result.cert.institution})
              </p>
              <p className={result.valid ? "status-ok" : "status-error"}>
                {result.valid
                  ? "VALID (issuer active, not revoked, not expired)"
                  : "NOT VALID"}
              </p>
              <p className="muted">
                Issued at:{" "}
                {new Date(
                  Number(result.cert.issuedAt) * 1000
                ).toLocaleString()}
              </p>
              {Number(result.cert.expiry) > 0 && (
                <p className="muted">
                  Expires:{" "}
                  {new Date(
                    Number(result.cert.expiry) * 1000
                  ).toLocaleString()}
                </p>
              )}
            </>
          )}
        </div>

        <div className="card">
          <h2>QR for this certificate</h2>
          <p className="muted">
            Print this QR on PDF / physical copies to allow instant on-chain
            verification.
          </p>
          {certId ? (
            <QRCodeCanvas value={verificationUrl} size={160} />
          ) : (
            <p className="muted">Enter a certificate ID above to render QR.</p>
          )}
          <p className="muted" style={{ marginTop: 8 }}>
            URL: {verificationUrl}
          </p>
        </div>
      </div>
    </div>
  );
}
