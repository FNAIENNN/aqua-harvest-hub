import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { C } from "@/lib/aqua/tokens";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    if (!email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!password) {
      setError("Password is required");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Store login state
      if (rememberMe) {
        localStorage.setItem("aquafinance_remember", email);
      }
      localStorage.setItem("aquafinance_user", JSON.stringify({ email, loggedIn: true }));

      // Navigate to dashboard
      nav({ to: "/" });
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    nav({ to: "/register" });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${C.bgPrimary} 0%, ${C.bgSecondary} 100%)`,
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: C.bgWash,
          borderRadius: 20,
          padding: 32,
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          border: `1px solid ${C.borderPrimary}`,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🦐</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: C.textPrimary, margin: "0 0 8px 0" }}>
            AquaFinance
          </h1>
          <p style={{ fontSize: 14, color: C.textSecondary, margin: 0 }}>
            Shrimp Culture Finance Management
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              display: "flex",
              gap: 12,
              padding: 12,
              borderRadius: 12,
              background: C.bgDanger,
              marginBottom: 20,
              border: `1px solid ${C.borderDanger}`,
            }}
          >
            <AlertCircle size={20} style={{ color: C.textDanger, flexShrink: 0 }} />
            <p style={{ fontSize: 13, color: C.textDanger, margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Email Field */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, display: "block", marginBottom: 8 }}>
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="your@email.com"
              style={{
                width: "100%",
                padding: "12px 14px",
                fontSize: 14,
                border: `1px solid ${C.borderTertiary}`,
                borderRadius: 10,
                background: C.bgPrimary,
                color: C.textPrimary,
                fontFamily: "inherit",
                transition: "all 0.2s ease",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = C.brandPrimary;
                e.currentTarget.style.background = C.bgWash;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = C.borderTertiary;
                e.currentTarget.style.background = C.bgPrimary;
              }}
            />
          </div>

          {/* Password Field */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, display: "block", marginBottom: 8 }}>
              Password
            </label>
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter your password"
                style={{
                  width: "100%",
                  padding: "12px 14px",
                  paddingRight: 40,
                  fontSize: 14,
                  border: `1px solid ${C.borderTertiary}`,
                  borderRadius: 10,
                  background: C.bgPrimary,
                  color: C.textPrimary,
                  fontFamily: "inherit",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = C.brandPrimary;
                  e.currentTarget.style.background = C.bgWash;
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = C.borderTertiary;
                  e.currentTarget.style.background = C.bgPrimary;
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 12,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 4,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {showPassword ? (
                  <EyeOff size={18} color={C.textSecondary} />
                ) : (
                  <Eye size={18} color={C.textSecondary} />
                )}
              </button>
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: 13,
            }}
          >
            <label style={{ display: "flex", gap: 6, alignItems: "center", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ cursor: "pointer", width: 16, height: 16 }}
              />
              <span style={{ color: C.textSecondary }}>Remember me</span>
            </label>
            <button
              type="button"
              onClick={handleForgotPassword}
              style={{
                background: "none",
                border: "none",
                color: C.brandPrimary,
                cursor: "pointer",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              Forgot Password?
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "14px 16px",
              fontSize: 15,
              fontWeight: 700,
              background: C.brandPrimary,
              color: "#fff",
              border: "none",
              borderRadius: 12,
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              marginTop: 8,
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = C.brandDark;
                e.currentTarget.style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = C.brandPrimary;
              e.currentTarget.style.transform = "translateY(0)";
            }}
          >
            {loading && <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} />}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Sign Up Link */}
        <p style={{ textAlign: "center", fontSize: 14, color: C.textSecondary, marginTop: 20, margin: "20px 0 0 0" }}>
          Don't have an account?{" "}
          <button
            onClick={() => nav({ to: "/register" })}
            style={{
              background: "none",
              border: "none",
              color: C.brandPrimary,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Sign up here
          </button>
        </p>

        {/* Demo Credentials */}
        <div
          style={{
            marginTop: 24,
            padding: 12,
            background: C.bgInfo,
            borderRadius: 10,
            border: `1px solid ${C.borderInfo}`,
            fontSize: 12,
          }}
        >
          <p style={{ margin: "0 0 6px 0", color: C.textInfo, fontWeight: 600 }}>Demo Credentials:</p>
          <p style={{ margin: "0 0 3px 0", color: C.textInfo }}>Email: demo@aquafinance.com</p>
          <p style={{ margin: 0, color: C.textInfo }}>Password: demo123</p>
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
