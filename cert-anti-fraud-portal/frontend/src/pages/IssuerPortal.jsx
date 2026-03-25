import React from "react";
import { ethers } from "ethers";
import { useInstitutionAuth } from "../hooks/useInstitutionAuth";
import { useMetaMask } from "../hooks/useMetaMask";
import {
  CERT_PORTAL_ADDRESS,
  CERT_PORTAL_ABI
} from "../blockchain/contractConfig";
import "./IssuerPortal.css";

export default function IssuerPortal() {
  const {
    current,
    loading,
    authError,
    signUp,
    signIn,
    signOut,
    setWalletForCurrent
  } = useInstitutionAuth();

  const {
    connect,
    disconnect,
    isAvailable,
    account,
    chainId,
    shortAccount
  } = useMetaMask();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const form = e.target;
    const displayName = form.displayName.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    await signUp(email, password, displayName);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    await signIn(email, password);
  };

  const handleLinkWallet = async () => {
    if (!current || !account) return;
    await setWalletForCurrent(account);
  };

  const handleIssue = async (e) => {
    e.preventDefault();

    if (!window.ethereum) {
      alert("MetaMask not available in this browser.");
      return;
    }
    if (!account) {
      alert("Connect MetaMask first.");
      return;
    }

    const form = e.target;
    const studentName = form.studentName.value.trim();
    const courseName = form.course.value.trim();
    const studentWallet = form.studentWallet.value.trim();
    const metadataUri = form.metadataUri.value.trim();
    const expiryStr = form.expiry.value;
    const docHashStr = form.docHash.value.trim();

    if (!ethers.isAddress(studentWallet)) {
      alert("Student wallet is not a valid Ethereum address.");
      return;
    }

    // expiry (date) -> uint64 seconds
    let expiry = 0;
    if (expiryStr) {
      const tsMs = Date.parse(expiryStr);
      if (Number.isNaN(tsMs)) {
        alert("Expiry date is invalid.");
        return;
      }
      expiry = Math.floor(tsMs / 1000);
    }

    // docHash string -> bytes32
    let docHash = ethers.ZeroHash;
    if (docHashStr) {
      try {
        const hex = docHashStr.startsWith("0x")
          ? docHashStr
          : `0x${docHashStr}`;
        if (!ethers.isHexString(hex) || ethers.dataLength(hex) !== 32) {
          alert("Document hash must be 32‑byte hex (bytes32).");
          return;
        }
        docHash = hex;
      } catch {
        alert("Document hash format is invalid.");
        return;
      }
    }

    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();

      if (signerAddress.toLowerCase() !== account.toLowerCase()) {
        alert("MetaMask active account changed – reconnect and try again.");
        return;
      }

      const contract = new ethers.Contract(
        CERT_PORTAL_ADDRESS,
        CERT_PORTAL_ABI,
        signer
      );

      const tx = await contract.issueCertificate(
        studentName,
        courseName,
        studentWallet,
        expiry,
        metadataUri,
        docHash
      );

      console.log("Issuing certificate, tx:", tx.hash);
      form.issueBtn.disabled = true;
      form.issueBtn.textContent = "Issuing…";

      const receipt = await tx.wait();
      console.log("Certificate issued, receipt:", receipt);

      alert(
        `Certificate issued on‑chain.\nTx hash: ${receipt.hash}\nBlock: ${receipt.blockNumber}`
      );

      form.reset();
      form.issueBtn.disabled = false;
      form.issueBtn.textContent = "Issue on‑chain certificate";
    } catch (err) {
      console.error(err);
      alert(
        `Failed to issue certificate: ${
          err?.reason || err?.data?.message || err?.message || "Unknown error"
        }`
      );
      if (form.issueBtn) {
        form.issueBtn.disabled = false;
        form.issueBtn.textContent = "Issue on‑chain certificate";
      }
    }
  };

  return (
    <div className="issuer-root">
      <header className="issuer-header">
        <div>
          <h1 className="issuer-title">Institution console</h1>
          <p className="issuer-subtitle">
            Secure workspace for issuing and managing verifiable credentials.
          </p>
        </div>
        <div className="issuer-header-meta">
          {current ? (
            <>
              <div className="issuer-pill">
                <span className="pill-label">Institution</span>
                <span className="pill-value">{current.displayName}</span>
              </div>
              <button
                type="button"
                className="btn ghost"
                onClick={signOut}
                disabled={loading}
              >
                Sign out
              </button>
            </>
          ) : (
            <span className="issuer-hint">
              Sign in or create an institution account to begin.
            </span>
          )}
        </div>
      </header>

      <main className="issuer-grid">
        {/* AUTH SIDE */}
        <section className="card auth-card">
          <h2>Institution access</h2>
          <p className="card-subtitle">
            Create an institution account or sign in to an existing one.
          </p>

          <div className="auth-forms">
            <div className="auth-panel">
              <h3>Create account</h3>
              <form onSubmit={handleSignUp} className="form">
                <label className="field">
                  <span>Institution name</span>
                  <input
                    type="text"
                    name="displayName"
                    placeholder="e.g. National Institute of Technology"
                    required
                  />
                </label>
                <label className="field">
                  <span>Work email</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="name@college.edu"
                    required
                  />
                </label>
                <label className="field">
                  <span>Password</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="Create a strong password"
                    required
                  />
                </label>
                <button
                  type="submit"
                  className="btn primary"
                  disabled={loading}
                >
                  Create institution
                </button>
              </form>
            </div>

            <div className="auth-divider">
              <span>or</span>
            </div>

            <div className="auth-panel">
              <h3>Sign in</h3>
              <form onSubmit={handleSignIn} className="form">
                <label className="field">
                  <span>Email address</span>
                  <input
                    type="email"
                    name="email"
                    placeholder="registered email"
                    required
                  />
                </label>
                <label className="field">
                  <span>Password</span>
                  <input
                    type="password"
                    name="password"
                    placeholder="********"
                    required
                  />
                </label>
                <button
                  type="submit"
                  className="btn secondary"
                  disabled={loading}
                >
                  Sign in
                </button>
              </form>
            </div>
          </div>

          {authError && <p className="alert error">{authError}</p>}
          {loading && <p className="muted">Working… please wait.</p>}
        </section>

        {/* WALLET + ISSUE SIDE */}
        <section className="card issue-card">
          <h2>Issue certificate</h2>
          <p className="card-subtitle">
            Connect your institutional wallet, then issue on‑chain credentials.
          </p>

          <div className="wallet-row">
            <div>
              <h3>MetaMask status</h3>
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
              )}

              {chainId && (
                <p className="muted">
                  Network: <span className="code">{chainId}</span>
                </p>
              )}
            </div>

            <div className="wallet-link">
              <h3>Link to institution</h3>
              <p className="muted">
                This wallet will be the official issuer for your institution.
              </p>
              <button
                type="button"
                className="btn secondary"
                onClick={handleLinkWallet}
                disabled={!account || !current || loading}
              >
                Save as official issuer wallet
              </button>
              {current?.wallet_address && (
                <p className="muted">
                  Stored on backend:{" "}
                  <span className="code">{current.wallet_address}</span>
                </p>
              )}
            </div>
          </div>

          <hr className="divider" />

          <form className="form grid-2" onSubmit={handleIssue}>
            <label className="field">
              <span>Student full name</span>
              <input
                type="text"
                name="studentName"
                placeholder="Student as printed on certificate"
                required
              />
            </label>

            <label className="field">
              <span>Course / program</span>
              <input
                type="text"
                name="course"
                placeholder="e.g. B.Tech in Computer Science"
                required
              />
            </label>

            <label className="field">
              <span>Student wallet (0x…)</span>
              <input
                type="text"
                name="studentWallet"
                placeholder="0x..."
                required
              />
            </label>

            <label className="field">
              <span>Expiry date (optional)</span>
              <input type="date" name="expiry" />
            </label>

            <label className="field span-2">
              <span>Metadata URI (IPFS / HTTPS)</span>
              <input
                type="url"
                name="metadataUri"
                placeholder="ipfs://… or https://…"
                required
              />
            </label>

            <label className="field span-2">
              <span>Document hash (optional)</span>
              <input
                type="text"
                name="docHash"
                placeholder="0x SHA‑256 hash of PDF or transcript (bytes32)"
              />
            </label>

            <div className="form-actions span-2">
              <button
                type="submit"
                className="btn primary large"
                name="issueBtn"
                disabled={!current || !account || loading}
              >
                Issue on‑chain certificate
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
