# Certificate Anti‑Fraud Portal

End‑to‑end system for issuing, holding, and verifying **tamper‑proof academic credentials** on‑chain.  
Institutions issue certificates via a secure dashboard, students hold them in their wallets, and verifiers can independently check authenticity against a public smart contract.

---

## Features

- **On‑chain certificates**
  - Solidity smart contract (`CertificatePortal`) on Sepolia
  - Immutable certificate records with issuer, student wallet, expiry, and document hash
  - Optional revocation and hash‑based lookup

- **Institution console**
  - Email/password authentication backed by PostgreSQL
  - Institutional wallet linking via MetaMask
  - Issue certificates directly to student wallets with metadata URI + optional SHA‑256 hash

- **Student corner**
  - Connect MetaMask to view the wallet used for receiving credentials
  - Educational guidance for how to use the portal with institutions

- **Verifier tools (planned / basic)**
  - Verify by certificate ID or document hash
  - Surface validity, issuer info, and revocation / expiry status

- **Modern UI**
  - Dark, institutional‑grade layout
  - Separate routes for `Home`, `Students`, `Institutions`, and `Verify`
  - Responsive design built with React + CSS

---

## Architecture

- **Smart contract**
  - Language: Solidity `^0.8.20`
  - Contract: `CertificatePortal`
  - Network: Sepolia (configurable)
  - Responsibilities:
    - Manage active institutions
    - Issue and revoke certificates
    - Verify by ID or document hash

- **Backend**
  - Node.js + Express
  - PostgreSQL for institution accounts and wallet linkage
  - JWT‑based authentication
  - CORS‑enabled REST API consumed by the frontend

- **Frontend**
  - React 18 + React Router
  - Ethers v6 for blockchain calls
  - MetaMask integration via a reusable `useMetaMask` hook
  - Institution console (auth + issuing), student view, and landing page

---

## Smart Contract

`contracts/CertificatePortal.sol` (deployed separately; ABI included in `frontend/src/blockchain/CertificatePortalABI.json`).

Key functions:

- `setInstitution(address wallet, string name, bool active)` — owner‑only, manages which wallets are allowed to issue.
- `issueCertificate(string studentName, string courseName, address issuedTo, uint64 expiry, string metadataURI, bytes32 docHash)` — callable only by active institutions; returns certificate ID.
- `revokeCertificate(uint256 id)` — issuer‑only revocation.
- `getCertificate(uint256 id)` — returns full certificate struct + institution info + validity flag.
- `verifyById(uint256 id)` — returns simple `bool valid`.
- `verifyByHash(bytes32 docHash)` — verify via stored document hash.

Update the deployed contract address in:

```js
// frontend/src/blockchain/contractConfig.js
export const CERT_PORTAL_ADDRESS = "0x...";
Getting Started
Prerequisites

    Node.js (LTS recommended)

    PostgreSQL (running locally on localhost:5432)

    MetaMask browser extension

    Git

1. Clone the repo

bash
git clone https://github.com/sreyoshmajumder/certificate-anti-fraud-portal.git
cd certificate-anti-fraud-portal

2. Backend setup

bash
cd backend
cp .env.example .env   # if you have one; otherwise create .env

.env should define:

text
PORT=4000

PGHOST=localhost
PGPORT=5432
PGDATABASE=cert_portal
PGUSER=postgres
PGPASSWORD=your_password_here

JWT_SECRET=super_long_secret
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:3000

Create the database and table (in psql):

sql
CREATE DATABASE cert_portal;

\c cert_portal;

CREATE TABLE institutions (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  display_name TEXT NOT NULL,
  wallet_address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

Install and run:

bash
npm install
npm run dev

Backend should be available at http://localhost:4000/api.
3. Frontend setup

bash
cd ../frontend
npm install
npm start

The app runs at http://localhost:3000.

Make sure frontend/src/hooks/useInstitutionAuth.js uses:

js
const API_BASE = "http://localhost:4000/api";

Usage
1. Register an institution

    Go to http://localhost:3000/institutions.

    Under Create account, enter institution name, work email, and password.

    Submit to create the institution; then sign in with the same credentials.

2. Link an institutional wallet

    On the right panel, click Connect MetaMask and approve in MetaMask.

    Click Save as official issuer wallet to persist the wallet address in the backend.

3. Approve institution in the smart contract

Using Remix (or your preferred tool):

    Load CertificatePortal with the owner wallet (deployer).

    Call:

text
setInstitution(<institutionWallet>, "Institution Name", true);

    Wait for confirmation — that wallet is now an active issuer.

4. Issue a certificate

    On the Institutions page, fill:

        Student full name

        Course / program

        Student wallet address

        Optional expiry date

        Metadata URI (IPFS or HTTPS link to cert JSON/PDF)

        Optional document hash (SHA‑256, bytes32)

    Click Issue on‑chain certificate.

    Confirm the transaction in MetaMask.

    Once mined, the student wallet holds a verifiable on‑chain credential.

Roadmap / Ideas

    Student view of issued certificates (reading directly from the contract)

    Rich verifier UI (scan QR → verify by ID or hash)

    Bulk issuance tooling for exam cells

    Support for multiple networks (Polygon, BNB Chain testnets)

    Gas‑sponsored issuing for institutions

Tech Stack

    Smart contracts: Solidity

    Blockchain tooling: Ethers v6, MetaMask

    Backend: Node.js, Express, PostgreSQL, JWT

    Frontend: React, React Router, custom CSS

    Dev tooling: Git, ESLint, Nodemon

Disclaimer

This project is a demo / prototype for educational and hackathon purposes.
Always audit smart contracts and review security before using in production or on mainnet.
