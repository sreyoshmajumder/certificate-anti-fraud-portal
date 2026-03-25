import { pool } from "../db.js";

export async function createInstitution({ email, passwordHash, displayName }) {
  const q = `
    INSERT INTO institutions (email, password_hash, display_name)
    VALUES ($1, $2, $3)
    RETURNING id, email, display_name AS "displayName", wallet_address AS "walletAddress"
  `;
  const values = [email, passwordHash, displayName];
  const { rows } = await pool.query(q, values);
  return rows[0];
}

export async function findInstitutionByEmail(email) {
  const q = `
    SELECT id, email, password_hash AS "passwordHash", display_name AS "displayName",
           wallet_address AS "walletAddress"
    FROM institutions
    WHERE email = $1
  `;
  const { rows } = await pool.query(q, [email]);
  return rows[0] || null;
}

export async function updateInstitutionWallet(id, walletAddress) {
  const q = `
    UPDATE institutions
    SET wallet_address = $2
    WHERE id = $1
    RETURNING id, email, display_name AS "displayName", wallet_address AS "walletAddress"
  `;
  const { rows } = await pool.query(q, [id, walletAddress]);
  return rows[0];
}
