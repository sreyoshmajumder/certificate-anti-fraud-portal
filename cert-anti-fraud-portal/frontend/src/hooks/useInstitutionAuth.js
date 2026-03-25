import { useEffect, useState } from "react";

const API_BASE = "http://localhost:4000/api";

function getToken() {
  return window.localStorage.getItem("cert_jwt") || "";
}

function setToken(token) {
  if (token) window.localStorage.setItem("cert_jwt", token);
  else window.localStorage.removeItem("cert_jwt");
}

export function useInstitutionAuth() {
  const [current, setCurrent] = useState(null); // {id, email, displayName, walletAddress}
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Load current institution if token already exists
  useEffect(() => {
    const token = getToken();
    if (!token) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/institutions/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!res.ok) {
          setToken("");
          setCurrent(null);
        } else {
          const data = await res.json();
          setCurrent(data.institution);
        }
      } catch {
        setToken("");
        setCurrent(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const signUp = async (email, password, displayName) => {
    setLoading(true);
    setAuthError("");
    try {
      const res = await fetch(`${API_BASE}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, displayName })
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.message || "Signup failed");
        return false;
      }
      setToken(data.token);
      setCurrent(data.institution);
      return true;
    } catch (err) {
      setAuthError(err.message || "Signup failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email, password) => {
    setLoading(true);
    setAuthError("");
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.message || "Login failed");
        return false;
      }
      setToken(data.token);
      setCurrent(data.institution);
      return true;
    } catch (err) {
      setAuthError(err.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setToken("");
    setCurrent(null);
  };

  const setWalletForCurrent = async (walletAddress) => {
    const token = getToken();
    if (!token || !current) return;
    try {
      const res = await fetch(`${API_BASE}/institutions/wallet`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ walletAddress })
      });
      const data = await res.json();
      if (!res.ok) {
        setAuthError(data.message || "Failed to update wallet");
        return;
      }
      setCurrent(data.institution);
    } catch (err) {
      setAuthError(err.message || "Failed to update wallet");
    }
  };

  return {
    current,
    loading,
    authError,
    signUp,
    signIn,
    signOut,
    setWalletForCurrent
  };
}
