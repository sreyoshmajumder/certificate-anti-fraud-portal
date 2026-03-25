<!-- HEADER BANNER -->
<div align="center">

![Header](https://capsule-render.vercel.app/api?type=waving&color=0:020812,40:071428,70:0a1f3d,100:030d20&height=220&section=header&text=Certificate%20Anti-Fraud%20Portal&fontSize=30&fontColor=22d3ee&fontAlignY=45&animation=fadeIn)

<h3>🎓🔗 Tamper-Proof Academic Credentials — Issued On-Chain. Verified Instantly.</h3>
<p><em>Solidity + React + Node.js + PostgreSQL + JWT + ethers v6 + MetaMask</em></p>

<br/>

[![Solidity](https://img.shields.io/badge/Solidity-0.8.20-071428?style=for-the-badge&logo=solidity&logoColor=22d3ee)](https://soliditylang.org)
[![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia-071428?style=for-the-badge&logo=ethereum&logoColor=627eea)](https://ethereum.org)
[![React](https://img.shields.io/badge/React-18-071428?style=for-the-badge&logo=react&logoColor=61dafb)](https://react.dev)
[![Node.js](https://img.shields.io/badge/Node.js-Express-071428?style=for-the-badge&logo=nodedotjs&logoColor=3c873a)](https://nodejs.org)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-071428?style=for-the-badge&logo=postgresql&logoColor=336791)](https://postgresql.org)
[![JWT](https://img.shields.io/badge/JWT-Auth-071428?style=for-the-badge&logo=jsonwebtokens&logoColor=f59e0b)](https://jwt.io)
[![ethers.js](https://img.shields.io/badge/ethers.js-v6-071428?style=for-the-badge&logo=ethereum&logoColor=22d3ee)](https://ethers.org)
[![MetaMask](https://img.shields.io/badge/MetaMask-071428?style=for-the-badge&logo=metamask&logoColor=f6851b)](https://metamask.io)

<br/>

> **🎓 A production-grade, end-to-end certificate anti-fraud portal — institutions register with JWT-secured accounts backed by PostgreSQL, link their MetaMask wallets, issue tamper-proof academic credentials on-chain via `CertificatePortal.sol`, and anyone can verify authenticity by certificate ID or SHA-256 document hash with zero trust in any central authority.**

<br/>

![Stack](https://img.shields.io/badge/Stack-4%20Layer%20Full--Stack%20Web3-22d3ee?style=flat-square&labelColor=071428)
![Auth](https://img.shields.io/badge/Auth-JWT%20%2B%20PostgreSQL%20%2B%20bcrypt-f59e0b?style=flat-square&labelColor=071428)
![Contract](https://img.shields.io/badge/Contract-CertificatePortal.sol-627eea?style=flat-square&labelColor=071428)
![Verify](https://img.shields.io/badge/Verify-By%20ID%20or%20SHA--256%20Hash-22c55e?style=flat-square&labelColor=071428)

</div>

---

## 📋 Table of Contents

| | Section |
|---|---|
| 🎯 | [Problem Statement](#-problem-statement) |
| ✅ | [Solution Architecture](#-solution-architecture) |
| 🏗️ | [Full System Architecture](#-full-system-architecture) |
| 📜 | [Smart Contract — CertificatePortal.sol](#-smart-contract--certificateportalsol) |
| 🔐 | [Backend — Node.js + PostgreSQL + JWT](#-backend--nodejs--postgresql--jwt) |
| 🗄️ | [Database Schema](#-database-schema) |
| 🔌 | [REST API Reference](#-rest-api-reference) |
| ⚛️ | [Frontend Architecture](#-frontend-architecture) |
| 🦊 | [useMetaMask Hook](#-usemetamask-hook) |
| 🔄 | [Complete Issuance Flow](#-complete-certificate-issuance-flow) |
| 👥 | [Three Actor Model](#-three-actor-model) |
| ⚙️ | [Environment Configuration](#-environment-configuration) |
| 🗂️ | [Project Structure](#-project-structure) |
| 🚀 | [Quick Start](#-quick-start) |
| 🔭 | [Roadmap](#-roadmap) |

---

## 🎯 Problem Statement

<div align="center">

```
╔══════════════════════════════════════════════════════════════════════════╗
║                                                                          ║
║   Certificate fraud is a billion-dollar problem in education:            ║
║                                                                          ║
║   🎭  FORGERY       Edited PDFs, Photoshopped certificates, fake         ║
║                     degree mills — visually indistinguishable from real  ║
║                                                                          ║
║   🏢  CENTRALIZED   Verification depends on calling the university —     ║
║                     phone tag, days of waiting, no API access            ║
║                                                                          ║
║   📄  PDF IS WEAK   A PDF can be edited in 30 seconds. No signature.    ║
║                     No tamper-proof seal. No audit trail.                ║
║                                                                          ║
║   🌍  CROSS-BORDER  International verification is nearly impossible —    ║
║                     language barriers, time zones, no standards          ║
║                                                                          ║
║   ⏳  SLOW          Background checks take 3–14 days per institution,   ║
║                     blocking hiring and enrollment decisions             ║
║                                                                          ║
║   ─────────────────────────────────────────────────────────────────     ║
║   ► Certificate Anti-Fraud Portal fixes this with a 4-layer stack:      ║
║     Blockchain + Backend API + PostgreSQL Auth + React dApp              ║
╚══════════════════════════════════════════════════════════════════════════╝
```

</div>

---

## ✅ Solution Architecture

```
  THREE-LAYER TRUST MODEL
  ════════════════════════════════════════════════════════════════════════

  LAYER 1 — INSTITUTIONAL IDENTITY (PostgreSQL + JWT)
  ──────────────────────────────────────────────────────────────────────
  Institutions register with email + password (bcrypt hashed in Postgres)
  JWT token issued on login — expires in 7d
  Institutional wallet address stored and linked in the DB
  Only authenticated institutions can trigger issuance

  LAYER 2 — BLOCKCHAIN AUTHORIZATION (Smart Contract)
  ──────────────────────────────────────────────────────────────────────
  Contract owner (deployer) calls setInstitution(wallet, name, true)
  Only wallets flagged as active institutions can call issueCertificate()
  Immutable on-chain registry of who can issue — no tampering possible

  LAYER 3 — CERTIFICATE INTEGRITY (On-Chain + Optional Hash)
  ──────────────────────────────────────────────────────────────────────
  Certificate stored on-chain: student name, course, wallet, expiry,
  metadataURI (IPFS/HTTPS), docHash (SHA-256 bytes32)
  Certificate ID is sequential — globally unique
  Anyone can verify by ID or document hash — no trust needed

  THE RESULT:
  ──────────────────────────────────────────────────────────────────────
  Institution (authenticated)  → issues cert → on-chain → cert ID
  Student receives cert ID     → shares with employer
  Employer enters ID in portal → verifyById(id) → valid/invalid
  Zero waiting. Zero phone calls. Cryptographically unforgeable.
```

---

## 🏗️ Full System Architecture

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║         CERTIFICATE ANTI-FRAUD PORTAL — 4-LAYER FULL-STACK ARCHITECTURE      ║
╚═══════════════════════════════════════════════════════════════════════════════╝

  ┌──────────────────────────────────────────────────────────────────────────┐
  │  LAYER 1 — REACT FRONTEND  (http://localhost:3000)                       │
  │                                                                          │
  │  ┌──────────────┐ ┌────────────────────┐ ┌───────────┐ ┌─────────────┐ │
  │  │  Home /      │ │  /institutions     │ │ /students │ │  /verify    │ │
  │  │  Landing     │ │  Institution       │ │ Student   │ │  Verifier   │ │
  │  │  Page        │ │  Console           │ │ Corner    │ │  Tools      │ │
  │  └──────────────┘ │  Register/Login    │ │ MetaMask  │ │ By ID/Hash  │ │
  │                   │  Link Wallet       │ │ Connect   │ └─────────────┘ │
  │                   │  Issue Certificate │ └───────────┘                 │
  │                   └────────────────────┘                               │
  │                                                                          │
  │  Shared: useMetaMask hook · ethers v6 · contractConfig.js + ABI.json   │
  └───────────────────┬──────────────────────────────────────────────────────┘
                      │  HTTP REST (fetch)
                      ▼  + ethers.js (direct chain calls)
  ┌──────────────────────────────────────────────────────────────────────────┐
  │  LAYER 2 — NODE.JS + EXPRESS BACKEND  (http://localhost:4000/api)        │
  │                                                                          │
  │  POST /api/auth/register    ← bcrypt hash password → INSERT institution │
  │  POST /api/auth/login       ← compare hash → issue JWT (7d expiry)      │
  │  PATCH /api/institutions/wallet ← store wallet address (JWT protected)  │
  │  GET  /api/institutions/me  ← return own profile (JWT protected)        │
  │                                                                          │
  │  Middleware: JWT verify → attach req.institution                        │
  │  CORS: CLIENT_ORIGIN=http://localhost:3000                              │
  └───────────────────┬──────────────────────────────────────────────────────┘
                      │  pg (node-postgres)
                      ▼
  ┌──────────────────────────────────────────────────────────────────────────┐
  │  LAYER 3 — POSTGRESQL DATABASE  (localhost:5432)                         │
  │                                                                          │
  │   Database: cert_portal                                                  │
  │   ┌────────────────────────────────────────────────────────────────────┐ │
  │   │  institutions table                                                │ │
  │   │  id · email · password_hash · display_name · wallet_address       │ │
  │   │  created_at                                                        │ │
  │   └────────────────────────────────────────────────────────────────────┘ │
  └──────────────────────────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────────────────────────────┐
  │  LAYER 4 — ETHEREUM SEPOLIA  (via ethers v6 + MetaMask)                  │
  │                                                                          │
  │   ┌────────────────────────────────────────────────────────────────────┐ │
  │   │  CertificatePortal.sol                                             │ │
  │   │                                                                    │ │
  │   │  setInstitution(wallet, name, active)  — owner only               │ │
  │   │  issueCertificate(...)                 — active institutions only  │ │
  │   │  revokeCertificate(id)                 — issuer only               │ │
  │   │  getCertificate(id)                    — anyone, FREE              │ │
  │   │  verifyById(id)                        — anyone, FREE              │ │
  │   │  verifyByHash(docHash)                 — anyone, FREE              │ │
  │   └────────────────────────────────────────────────────────────────────┘ │
  │   ABI: frontend/src/blockchain/CertificatePortalABI.json               │
  │   Address: frontend/src/blockchain/contractConfig.js                   │
  └──────────────────────────────────────────────────────────────────────────┘
```

---

## 📜 Smart Contract — `CertificatePortal.sol`

### Full Interface

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificatePortal {

    // ─── Structs ──────────────────────────────────────────────────────────
    struct Certificate {
        uint256  id;             // Sequential certificate ID
        string   studentName;   // Student's full name
        string   courseName;    // Course / degree / program name
        address  issuedTo;      // Student's Ethereum wallet address
        address  issuedBy;      // Institution's wallet address
        uint64   expiry;        // Unix timestamp (0 = no expiry)
        string   metadataURI;   // IPFS/HTTPS link to cert PDF / JSON
        bytes32  docHash;       // SHA-256 hash of original document
        bool     revoked;       // Revocation flag
        uint256  issuedAt;      // block.timestamp at issuance
    }

    struct Institution {
        string   name;          // Institution display name
        bool     active;        // Can this wallet issue certificates?
    }

    // ─── State ────────────────────────────────────────────────────────────
    address public owner;
    uint256 public certificateCount;

    mapping(uint256  => Certificate)  public certificates;
    mapping(address  => Institution)  public institutions;
    mapping(bytes32  => uint256)      public hashToCertId;
    // bytes32 docHash → certificate ID (enables verifyByHash)

    // ─── Events ───────────────────────────────────────────────────────────
    event InstitutionUpdated(address indexed wallet, string name, bool active);
    event CertificateIssued(uint256 indexed id, address indexed issuedTo,
                             address indexed issuedBy, string courseName);
    event CertificateRevoked(uint256 indexed id, address indexed revokedBy);

    // ─── Modifiers ────────────────────────────────────────────────────────
    modifier onlyOwner() {
        require(msg.sender == owner, "Only contract owner");
        _;
    }
    modifier onlyActiveInstitution() {
        require(institutions[msg.sender].active, "Not an active institution");
        _;
    }

    // ─── Owner Functions ──────────────────────────────────────────────────
    constructor() { owner = msg.sender; }

    function setInstitution(
        address wallet,
        string  memory name,
        bool    active
    ) external onlyOwner {
        institutions[wallet] = Institution(name, active);
        emit InstitutionUpdated(wallet, name, active);
    }

    // ─── Institution Functions ────────────────────────────────────────────
    function issueCertificate(
        string  memory studentName,
        string  memory courseName,
        address        issuedTo,
        uint64         expiry,
        string  memory metadataURI,
        bytes32        docHash
    ) external onlyActiveInstitution returns (uint256) {
        certificateCount++;
        uint256 id = certificateCount;
        certificates[id] = Certificate({
            id:          id,
            studentName: studentName,
            courseName:  courseName,
            issuedTo:    issuedTo,
            issuedBy:    msg.sender,
            expiry:      expiry,
            metadataURI: metadataURI,
            docHash:     docHash,
            revoked:     false,
            issuedAt:    block.timestamp
        });
        if (docHash != bytes32(0)) hashToCertId[docHash] = id;
        emit CertificateIssued(id, issuedTo, msg.sender, courseName);
        return id;
    }

    function revokeCertificate(uint256 id) external {
        require(certificates[id].issuedBy == msg.sender, "Not your certificate");
        certificates[id].revoked = true;
        emit CertificateRevoked(id, msg.sender);
    }

    // ─── View Functions (FREE — no gas) ───────────────────────────────────
    function getCertificate(uint256 id) external view returns (
        Certificate memory cert,
        string memory institutionName,
        bool valid
    ) {
        cert = certificates[id];
        institutionName = institutions[cert.issuedBy].name;
        valid = !cert.revoked
                && (cert.expiry == 0 || block.timestamp <= cert.expiry);
    }

    function verifyById(uint256 id) external view returns (bool valid) {
        Certificate memory c = certificates[id];
        return !c.revoked && (c.expiry == 0 || block.timestamp <= c.expiry);
    }

    function verifyByHash(bytes32 docHash) external view returns (
        bool valid, uint256 certId
    ) {
        certId = hashToCertId[docHash];
        if (certId == 0) return (false, 0);
        valid = verifyById(certId);
    }
}
```

### Function Access Matrix

```
  Function                Caller               Gas         Mutates State?
  ──────────────────────────────────────────────────────────────────────────
  setInstitution()        owner ONLY           ~50k ⛽     Yes — institutions map
  issueCertificate()      active inst. ONLY    ~120k ⛽    Yes — certificates map
  revokeCertificate()     original issuer      ~30k ⛽     Yes — cert.revoked=true
  getCertificate()        Anyone               FREE 🆓     No
  verifyById()            Anyone               FREE 🆓     No
  verifyByHash()          Anyone               FREE 🆓     No

  CERTIFICATE VALIDITY CHECK:
  !cert.revoked && (cert.expiry == 0 || block.timestamp <= cert.expiry)
  → Not revoked AND (no expiry set OR not yet expired)
```

---

## 🔐 Backend — Node.js + PostgreSQL + JWT

```
  EXPRESS SERVER  (port 4000)
  ════════════════════════════════════════════════════════════════════════

  DEPENDENCIES:
  ──────────────────────────────────────────────────────────────────────
  express         → HTTP server + routing
  pg              → node-postgres (connect to PostgreSQL)
  bcrypt          → password hashing (never store plain text)
  jsonwebtoken    → JWT sign + verify
  cors            → allow http://localhost:3000 with credentials
  dotenv          → load .env variables

  AUTH FLOW:
  ──────────────────────────────────────────────────────────────────────

  REGISTER:
  POST /api/auth/register
  Body: { email, password, displayName }
  ├── Check email not already registered (Postgres UNIQUE constraint)
  ├── bcrypt.hash(password, 10) → password_hash
  ├── INSERT INTO institutions (email, password_hash, display_name)
  └── Return: { id, email, displayName }

  LOGIN:
  POST /api/auth/login
  Body: { email, password }
  ├── SELECT * FROM institutions WHERE email = $1
  ├── bcrypt.compare(password, password_hash) → boolean
  ├── If match: jwt.sign({ id, email, role:"institution" }, JWT_SECRET,
  │              { expiresIn: JWT_EXPIRES_IN="7d" })
  └── Return: { token, institution: { id, email, displayName, walletAddress } }

  PROTECTED MIDDLEWARE (authMiddleware.js):
  Authorization: Bearer <token>
  ├── jwt.verify(token, JWT_SECRET) → decoded { id, email }
  ├── SELECT from institutions WHERE id = decoded.id
  └── req.institution = { id, email, displayName, walletAddress }

  WALLET LINK:
  PATCH /api/institutions/wallet  [JWT required]
  Body: { walletAddress }
  ├── Validate: valid Ethereum address format
  ├── UPDATE institutions SET wallet_address = $1 WHERE id = $2
  └── Return: { walletAddress }
```

---

## 🗄️ Database Schema

```sql
  -- PostgreSQL — cert_portal database
  ════════════════════════════════════════════════════════════════════════

  CREATE DATABASE cert_portal;
  \c cert_portal;

  CREATE TABLE institutions (
    id               SERIAL PRIMARY KEY,
    email            TEXT UNIQUE NOT NULL,          -- login identifier
    password_hash    TEXT NOT NULL,                 -- bcrypt hash
    display_name     TEXT NOT NULL,                 -- shown in UI
    wallet_address   TEXT,                          -- linked MetaMask wallet
    created_at       TIMESTAMPTZ DEFAULT NOW()
  );

  -- INDEXES (recommended for production):
  CREATE INDEX idx_institutions_email ON institutions(email);
  CREATE INDEX idx_institutions_wallet ON institutions(wallet_address);

  -- ENTITY NOTES:
  -- wallet_address is nullable — institution can register before linking wallet
  -- UNIQUE on email enforced at DB level (throws 23505 on duplicate)
  -- password_hash stores bcrypt output — never raw password
  -- wallet_address stored as lowercase hex string: 0x...

  -- RELATIONSHIP WITH BLOCKCHAIN:
  -- wallet_address here maps to the Ethereum address registered in
  -- CertificatePortal.institutions[wallet_address].active = true
  -- Portal owner must call setInstitution(wallet, name, true) separately
```

---

## 🔌 REST API Reference

```
  BASE URL: http://localhost:4000/api

  ┌──────────────────────────────────────────────────────────────────────────┐
  │  AUTH ENDPOINTS (Public)                                                 │
  ├────────┬───────────────────────┬──────────────────────────────────────── │
  │ POST   │ /auth/register        │ Register institution (email+pass+name)  │
  │ POST   │ /auth/login           │ Login → returns JWT token               │
  └────────┴───────────────────────┴────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────────────────────────────┐
  │  INSTITUTION ENDPOINTS (JWT Protected)                                   │
  ├────────┬───────────────────────┬──────────────────────────────────────── │
  │ GET    │ /institutions/me      │ Get own profile + wallet address        │
  │ PATCH  │ /institutions/wallet  │ Save MetaMask wallet to DB              │
  └────────┴───────────────────────┴────────────────────────────────────────┘

  REQUEST / RESPONSE SHAPES:

  POST /api/auth/register
  ┌──────────────────────────────────────────────────────────────────────┐
  │  Body:   { "email": "uni@example.com",                               │
  │            "password": "secure123",                                  │
  │            "displayName": "Example University" }                     │
  │  201:    { "id": 1, "email": "uni@example.com",                      │
  │            "displayName": "Example University" }                     │
  │  409:    { "error": "Email already registered" }                    │
  └──────────────────────────────────────────────────────────────────────┘

  POST /api/auth/login
  ┌──────────────────────────────────────────────────────────────────────┐
  │  Body:   { "email": "uni@example.com", "password": "secure123" }    │
  │  200:    { "token": "eyJhbGciOi...",                                 │
  │            "institution": { "id": 1, "email": "...",                 │
  │            "displayName": "Example University",                      │
  │            "walletAddress": "0xAbc..." } }                          │
  │  401:    { "error": "Invalid credentials" }                         │
  └──────────────────────────────────────────────────────────────────────┘

  PATCH /api/institutions/wallet  (Bearer token required)
  ┌──────────────────────────────────────────────────────────────────────┐
  │  Header: Authorization: Bearer <jwt_token>                           │
  │  Body:   { "walletAddress": "0xAbCd1234..." }                        │
  │  200:    { "walletAddress": "0xAbCd1234..." }                        │
  │  401:    { "error": "Unauthorized" }                                │
  └──────────────────────────────────────────────────────────────────────┘
```

---

## ⚛️ Frontend Architecture

```
  REACT 18 + REACT ROUTER  (src/)
  ════════════════════════════════════════════════════════════════════════

  ROUTES:
  ──────────────────────────────────────────────────────────────────────
  /              → Home — landing page with value prop + CTAs
  /institutions  → Institution Console (register/login + issue certs)
  /students      → Student Corner (MetaMask connect + guidance)
  /verify        → Verifier Tools (verify by ID or document hash)

  BLOCKCHAIN FILES:
  ──────────────────────────────────────────────────────────────────────
  src/blockchain/
  ├── CertificatePortalABI.json    ← compiled contract ABI
  └── contractConfig.js           ← CERT_PORTAL_ADDRESS = "0x..."

  INSTITUTION CONSOLE (/institutions):
  ──────────────────────────────────────────────────────────────────────
  Left panel  — Auth:
  ├── Create account form  → POST /api/auth/register
  └── Sign in form         → POST /api/auth/login → store JWT in state

  Right panel — Actions (after login):
  ├── MetaMask Connect button → useMetaMask hook → eth_requestAccounts
  ├── Save Wallet button      → PATCH /api/institutions/wallet
  └── Issue Certificate form:
      ├── Student full name (text)
      ├── Course / program (text)
      ├── Student wallet address (text / MetaMask)
      ├── Expiry date (optional date picker)
      ├── Metadata URI (IPFS/HTTPS link)
      ├── Document hash (optional SHA-256 bytes32)
      └── [Issue On-Chain Certificate] button
          → ethers.js: contract.issueCertificate(...)
          → MetaMask popup → confirm → wait for receipt
          → Show: "✅ Certificate #42 issued!"

  VERIFIER TOOLS (/verify):
  ──────────────────────────────────────────────────────────────────────
  Tab 1 — Verify by ID:
  ├── Input: certificate ID number
  ├── contract.verifyById(id) → bool
  ├── contract.getCertificate(id) → full struct
  └── Display: student name, course, institution, expiry, valid/revoked

  Tab 2 — Verify by Hash:
  ├── Input: SHA-256 hash (bytes32 hex string)
  ├── contract.verifyByHash(docHash) → { valid, certId }
  └── If valid: fetch and display certificate details
```

---

## 🦊 `useMetaMask` Hook

```javascript
  // src/hooks/useMetaMask.js — reusable wallet connection hook
  ════════════════════════════════════════════════════════════════════════

  const useMetaMask = () => {
    const [account, setAccount]   = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner]     = useState(null);
    const [error, setError]       = useState(null);
    const [loading, setLoading]   = useState(false);

    const connect = async () => {
      if (!window.ethereum) {
        setError("MetaMask is not installed. Please install it.");
        return;
      }
      setLoading(true);
      try {
        // Request wallet access
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        });
        const addr = accounts[0];

        // Create ethers v6 provider + signer
        const _provider = new ethers.BrowserProvider(window.ethereum);
        const _signer   = await _provider.getSigner();

        setAccount(addr);
        setProvider(_provider);
        setSigner(_signer);
        setError(null);
      } catch (err) {
        setError("Connection rejected by user.");
      } finally {
        setLoading(false);
      }
    };

    const disconnect = () => {
      setAccount(null);
      setProvider(null);
      setSigner(null);
    };

    return { account, provider, signer, error, loading, connect, disconnect };
  };

  // Usage in InstitutionConsole.jsx:
  const { account, signer, error, connect } = useMetaMask();
  const contract = new ethers.Contract(CERT_PORTAL_ADDRESS, ABI, signer);
  const tx = await contract.issueCertificate(...);
  await tx.wait();
```

---

## 🔄 Complete Certificate Issuance Flow

```
╔═══════════════════════════════════════════════════════════════════════════════╗
║               FULL CERTIFICATE ISSUANCE — END TO END                         ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  INSTITUTION          FRONTEND             BACKEND            BLOCKCHAIN      ║
║  ─────────────  ─────────────────────  ──────────────  ──────────────────    ║
║                                                                               ║
║  [1] REGISTER                                                                 ║
║  Visit /institutions                                                          ║
║  Fill: name, email, password                                                  ║
║  Click "Create Account"  ──▶  POST /api/auth/register                       ║
║                               bcrypt.hash(password, 10)                      ║
║                               INSERT INTO institutions       ◀──  201 OK    ║
║                                                                               ║
║  [2] LOGIN                                                                    ║
║  Enter email + password  ──▶  POST /api/auth/login                          ║
║                               bcrypt.compare(...)                            ║
║                               jwt.sign({ id, email }, secret, 7d)           ║
║                               ◀── { token, institution }                     ║
║                               Store JWT in React state                       ║
║                                                                               ║
║  [3] CONNECT WALLET                                                           ║
║  Click "Connect MetaMask"                                                     ║
║  └──▶ eth_requestAccounts → MetaMask popup → approve                        ║
║       account = "0xInst123..."                                               ║
║       signer  = BrowserProvider.getSigner()                                  ║
║                                                                               ║
║  [4] SAVE WALLET TO DB                                                        ║
║  Click "Save as official issuer wallet"                                       ║
║  └──▶ PATCH /api/institutions/wallet                                         ║
║       Authorization: Bearer <token>                                          ║
║       { walletAddress: "0xInst123..." }  ──▶  UPDATE institutions           ║
║                                               SET wallet_address = $1        ║
║                                               ◀── 200 OK                    ║
║                                                                               ║
║  [5] WHITELIST IN SMART CONTRACT  (one-time, done by deployer in Remix)     ║
║  setInstitution("0xInst123...", "Example University", true)                 ║
║  ──▶ institutions["0xInst123..."] = { name, active: true }   on-chain ✅   ║
║                                                                               ║
║  [6] ISSUE CERTIFICATE                                                        ║
║  Fill form: student name, course, wallet, expiry, URI, hash                 ║
║  Click "Issue On-Chain Certificate"                                          ║
║  └──▶ contract.issueCertificate(name, course, 0xStudent, expiry, uri, hash) ║
║       MetaMask popup: "Confirm — ~120,000 gas"                               ║
║       Confirm → tx broadcast to Sepolia          ──▶                        ║
║                                                 EVM: onlyActiveInstitution  ║
║                                                 certificateCount++          ║
║                                                 certificates[id] = {...}    ║
║                                                 emit CertificateIssued(id)  ║
║                                                          ◀──                ║
║  [7] RECEIPT                                                                  ║
║  UI: "✅ Certificate #42 issued to 0xStudent123..."                         ║
║  Student receives cert ID: 42                                                ║
║                                                                               ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║               VERIFICATION — EMPLOYER CHECKS AUTHENTICITY                    ║
╠═══════════════════════════════════════════════════════════════════════════════╣
║                                                                               ║
║  [1] Visit /verify → enter certificate ID: 42                               ║
║  [2] contract.getCertificate(42)  →  FREE read, no gas                      ║
║      Returns: { cert struct, institutionName, valid }                        ║
║  [3] Display:                                                                 ║
║      ✅ VALID CERTIFICATE                                                    ║
║      Student:     Sreyosh Majumder                                           ║
║      Course:      B.Tech Computer Science                                    ║
║      Issued by:   Example University                                         ║
║      Issued to:   0xStudent123...                                            ║
║      Issued at:   2025-06-15                                                 ║
║      Expiry:      2035-06-15                                                 ║
║      Metadata:    ipfs://Qm... (PDF link)                                   ║
║                                                                               ║
╚═══════════════════════════════════════════════════════════════════════════════╝
```

---

## 👥 Three Actor Model

```
  ┌──────────────────────────────────────────────────────────────────────┐
  │  🏛️  INSTITUTION / PORTAL OWNER  (Contract Deployer)                 │
  │                                                                      │
  │  On-chain identity: Contract owner wallet                           │
  │  Off-chain identity: PostgreSQL record + JWT                        │
  │                                                                      │
  │  Responsibilities:                                                   │
  │  • Deploy CertificatePortal.sol                                     │
  │  • Whitelist institution wallets via setInstitution()               │
  │  • Manage who can issue credentials on the network                  │
  └──────────────────────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────────────────────────┐
  │  🏫  INSTITUTION  (Issuer)                                           │
  │                                                                      │
  │  Off-chain: registers with email/password → JWT session             │
  │  On-chain: wallet whitelisted by owner → can call issueCertificate  │
  │                                                                      │
  │  Journey:                                                            │
  │  1. Register + login (DB auth)                                       │
  │  2. Connect MetaMask → save wallet to DB                            │
  │  3. Owner approves wallet in smart contract                         │
  │  4. Fill certificate form → confirm in MetaMask → cert issued       │
  │  5. Give student their certificate ID                                │
  │  6. Can revoke certificates they issued                             │
  └──────────────────────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────────────────────────┐
  │  🎓  STUDENT                                                         │
  │                                                                      │
  │  Receives: certificate ID + optional document PDF                   │
  │  Blockchain: their wallet address is stored as issuedTo in cert     │
  │                                                                      │
  │  Journey:                                                            │
  │  1. Connect wallet at /students to see their wallet address         │
  │  2. Share cert ID with employers, visa offices, universities        │
  │  3. Anyone can verify — no student action needed                    │
  └──────────────────────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────────────────────────┐
  │  🔍  VERIFIER  (Employer / University / Government)                  │
  │                                                                      │
  │  No account needed. No MetaMask. No gas.                            │
  │                                                                      │
  │  Journey:                                                            │
  │  1. Visit /verify — no auth required                                │
  │  2. Enter cert ID OR paste SHA-256 hash of PDF received             │
  │  3. getCertificate() or verifyByHash() → instant result            │
  │  4. See: valid/revoked, expiry, institution name, student wallet    │
  │  5. Zero waiting. Zero emails. Cryptographically trustless.         │
  └──────────────────────────────────────────────────────────────────────┘
```

---

## ⚙️ Environment Configuration

```bash
# backend/.env
PORT=4000
PGHOST=localhost
PGPORT=5432
PGDATABASE=cert_portal
PGUSER=postgres
PGPASSWORD=your_postgres_password_here
JWT_SECRET=super_long_random_secret_minimum_32_chars
JWT_EXPIRES_IN=7d
CLIENT_ORIGIN=http://localhost:3000

# frontend/src/blockchain/contractConfig.js
export const CERT_PORTAL_ADDRESS = "0xYourDeployedContractAddressOnSepolia";
```

---

## 🗂️ Project Structure

```
certificate-anti-fraud-portal/
│
├── 📋 README.md
│
└── 📁 cert-anti-fraud-portal/
    │
    ├── 📁 contracts/                      # Solidity
    │   └── CertificatePortal.sol          # Full contract (see above)
    │
    ├── 📁 backend/                        # Node.js + Express
    │   ├── package.json                   # express, pg, bcrypt, jsonwebtoken
    │   ├── .env                           # DB + JWT config (gitignored)
    │   ├── server.js                      # Express app entry point
    │   ├── 📁 routes/
    │   │   ├── auth.js                    # POST /auth/register + /auth/login
    │   │   └── institutions.js            # GET /me + PATCH /wallet
    │   ├── 📁 middleware/
    │   │   └── authMiddleware.js          # JWT verify → req.institution
    │   └── 📁 db/
    │       └── index.js                   # pg Pool connection
    │
    └── 📁 frontend/                       # React 18
        ├── package.json                   # React, React Router, ethers v6
        ├── public/index.html
        └── src/
            ├── App.js                     # Routes: / /institutions /students /verify
            ├── App.css                    # Dark institutional theme
            ├── index.js                   # ReactDOM.createRoot()
            │
            ├── 📁 blockchain/
            │   ├── CertificatePortalABI.json  # Compiled contract ABI
            │   └── contractConfig.js          # CERT_PORTAL_ADDRESS
            │
            ├── 📁 hooks/
            │   ├── useMetaMask.js             # MetaMask connect hook
            │   └── useInstitutionAuth.js      # JWT auth + API calls
            │
            └── 📁 pages/
                ├── HomePage.jsx               # Landing + value prop
                ├── InstitutionConsole.jsx     # Auth + wallet + issue cert
                ├── StudentCorner.jsx          # MetaMask + guidance
                └── VerifierTools.jsx          # Verify by ID / hash
```

---

## 🚀 Quick Start

### Prerequisites

```bash
✅  Node.js v18+
✅  PostgreSQL running on localhost:5432
✅  MetaMask browser extension
✅  Sepolia testnet ETH → https://sepoliafaucet.com
✅  Deployed CertificatePortal.sol address
```

### 1. Clone

```bash
git clone https://github.com/sreyoshmajumder/certificate-anti-fraud-portal.git
cd certificate-anti-fraud-portal/cert-anti-fraud-portal
```

### 2. Deploy the Smart Contract

```bash
# Remix IDE (easiest):
# 1. Open https://remix.ethereum.org
# 2. Paste CertificatePortal.sol → Compile (^0.8.20)
# 3. Deploy → Injected Provider (MetaMask → Sepolia)
# 4. Copy deployed address → paste in frontend/src/blockchain/contractConfig.js
```

### 3. Set Up PostgreSQL

```sql
-- In psql:
CREATE DATABASE cert_portal;
\c cert_portal;

CREATE TABLE institutions (
  id               SERIAL PRIMARY KEY,
  email            TEXT UNIQUE NOT NULL,
  password_hash    TEXT NOT NULL,
  display_name     TEXT NOT NULL,
  wallet_address   TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);
```

### 4. Start Backend

```bash
cd backend
cp .env.example .env   # fill in DB creds + JWT_SECRET
npm install
npm run dev
# → http://localhost:4000/api
```

### 5. Start Frontend

```bash
cd ../frontend
npm install
npm start
# → http://localhost:3000
```

### 6. Test the Full Flow

```
1. /institutions → Register: "MIT Demo", mit@demo.com, password123
2. /institutions → Sign In with same credentials
3. Click "Connect MetaMask" → connect your Sepolia wallet
4. Click "Save as official issuer wallet"
5. In Remix: setInstitution("0xYourWallet", "MIT Demo", true) → confirm
6. Fill cert form: Student Name, Course, Student Wallet, URI
7. Click "Issue On-Chain Certificate" → MetaMask → Confirm
8. Note the certificate ID (e.g., 1)
9. /verify → enter ID: 1 → see full certificate details ✅
```

---

## 🔭 Roadmap

```
v1.0 ── CURRENT ─────────────────────────────────────────────────────────
  ✅  CertificatePortal.sol: issue, revoke, verify by ID + hash
  ✅  Node.js + Express backend with JWT auth + bcrypt
  ✅  PostgreSQL: institutions table with wallet linkage
  ✅  React 18 + React Router: 4 pages
  ✅  useMetaMask hook (reusable, ethers v6)
  ✅  Institution console: register + login + issue certs
  ✅  Verifier tools: verify by ID + document hash
  ✅  ABI + contractConfig for easy contract swap

v2.0 ── STUDENT PORTAL ──────────────────────────────────────────────────
  🔲  Student login + view all certificates issued to their wallet
  🔲  Download certificate PDF via metadataURI link
  🔲  Share certificate via QR code → /verify?id=42
  🔲  Certificate expiry countdown notifications

v3.0 ── RICH FEATURES ───────────────────────────────────────────────────
  🔲  Bulk certificate issuance (CSV upload for exam cells)
  🔲  IPFS integration for metadata storage (Pinata)
  🔲  Rich verifier UI with drag-drop PDF → auto-hash → verify
  🔲  Revocation notifications to students
  🔲  Institution public profile page

v4.0 ── PRODUCTION SCALE ────────────────────────────────────────────────
  🔲  Deploy to Polygon/Arbitrum (lower gas for institutions)
  🔲  Gas sponsorship via ERC-4337 Account Abstraction
  🔲  Government-grade audit trail and compliance logging
  🔲  Multi-network support (Ethereum, Polygon, BNB Chain)
  🔲  Mobile app (React Native) for students
```

---

## 🛠️ Tech Stack

<div align="center">

![Solidity](https://img.shields.io/badge/Solidity-071428?style=for-the-badge&logo=solidity&logoColor=22d3ee)
![Ethereum](https://img.shields.io/badge/Ethereum%20Sepolia-071428?style=for-the-badge&logo=ethereum&logoColor=627eea)
![React](https://img.shields.io/badge/React%2018-071428?style=for-the-badge&logo=react&logoColor=61dafb)
![Node.js](https://img.shields.io/badge/Node.js-071428?style=for-the-badge&logo=nodedotjs&logoColor=3c873a)
![Express](https://img.shields.io/badge/Express-071428?style=for-the-badge&logo=express&logoColor=ffffff)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-071428?style=for-the-badge&logo=postgresql&logoColor=336791)
![JWT](https://img.shields.io/badge/JWT-071428?style=for-the-badge&logo=jsonwebtokens&logoColor=f59e0b)
![ethers.js](https://img.shields.io/badge/ethers.js%20v6-071428?style=for-the-badge&logo=ethereum&logoColor=22d3ee)
![MetaMask](https://img.shields.io/badge/MetaMask-071428?style=for-the-badge&logo=metamask&logoColor=f6851b)
![CSS3](https://img.shields.io/badge/CSS3-071428?style=for-the-badge&logo=css3&logoColor=22d3ee)

</div>

---

## 👨‍💻 Author

<div align="center">

**Built with 🎓 + ⛓️ + ❤️ by [Sreyosh Majumder](https://github.com/sreyoshmajumder)**

[![GitHub](https://img.shields.io/badge/GitHub-sreyoshmajumder-071428?style=for-the-badge&logo=github&logoColor=22d3ee)](https://github.com/sreyoshmajumder)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0284c7?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/YOUR_LINKEDIN)

> *"Every forged certificate damages the value of every real one. Blockchain fixes this — permanently."*

</div>

---

## ⭐ Show Some Love

```
★  Star this repository
🍴  Fork it and add bulk issuance or QR verification
🐛  Open issues for bugs or feature suggestions
📢  Share with universities, EdTech builders, and Web3 developers
```

---

<div align="center">

![Footer](https://capsule-render.vercel.app/api?type=waving&color=0:0a1f3d,50:071428,100:020812&height=120&section=footer&text=Issue%20Once.%20Verify%20Forever.&fontSize=16&fontColor=22d3ee&fontAlignY=65)

</div>
