import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AlertCircle, Eye, EyeOff, CheckCircle2, Loader2 } from "lucide-react";
import { C } from "@/lib/aqua/tokens";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const nav = useNavigate();
  const [formData, setFormData] = useState({
    farmName: "",
    ownerName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^a-zA-Z0-9]/.test(pwd)) strength++;
    return strength;
  };

  const validateForm = () => {
    if (!formData.farmName.trim()) {
      setError("Farm name is required");
      return false;
    }
    if (!formData.ownerName.trim()) {
      setError("Owner name is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      setError("Please enter a valid 10-digit phone number");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (!formData.agreeTerms) {
      setError("You must agree to the terms and conditions");
      return false;
    }
    return true;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setError("");

    if (name === "password") {
      setPasswordStrength(calculatePasswordStrength(value));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Store user data
      localStorage.setItem("aquafinance_user", JSON.stringify({
        farmName: formData.farmName,
        ownerName: formData.ownerName,
        email: formData.email,
        phone: formData.phone,
        registeredAt: new Date().toISOString(),
        loggedIn: true,
      }));

      // Navigate to dashboard
      nav({ to: "/" });
    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return C.textSecondary;
    if (passwordStrength === 1) return C.textDanger;
    if (passwordStrength === 2) return C.textWarning;
    if (passwordStrength === 3) return "#7c3aed";
    return C.textSuccess;
  };

  const getPasswordStrengthLabel = () => {
    if (passwordStrength === 0) return "No password";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
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
          maxWidth: 500,
          background: C.bgWash,
          borderRadius: 20,
          padding: 32,
          boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
          border: `1px solid ${C.borderPrimary}`,
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 36, marginBottom: 12 }}>🦐</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: C.textPrimary, margin: "0 0 8px 0" }}>
            Create Account
          </h1>
          <p style={{ fontSize: 14, color: C.textSecondary, margin: 0 }}>
            Start managing your shrimp farm finances
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

        {/* Registration Form */}
        <form onSubmit={handleRegister} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {/* Farm Name */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, display: "block", marginBottom: 6 }}>
              Farm Name
            </label>
            <input
              type="text"
              name="farmName"
              value={formData.farmName}
              onChange={handleChange}
              placeholder="e.g., Bhimavaram Farms"
              style={{
                width: "100%",
                padding: "10px 12px",
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

          {/* Owner Name */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, display: "block", marginBottom: 6 }}>
              Owner Name
            </label>
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              placeholder="Full name"
              style={{
                width: "100%",
                padding: "10px 12px",
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

          {/* Email */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, display: "block", marginBottom: 6 }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@farm.com"
              style={{
                width: "100%",
                padding: "10px 12px",
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

          {/* Phone */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, display: "block", marginBottom: 6 }}>
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="10-digit phone number"
              style={{
                width: "100%",
                padding: "10px 12px",
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

          {/* Password */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>Password</label>
              {formData.password && (
                <span style={{ fontSize: 12, color: getPasswordStrengthColor(), fontWeight: 600 }}>
                  {getPasswordStrengthLabel()}
                </span>
              )}
            </div>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                style={{
                  width: "100%",
                  padding: "10px 12px",
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
            {formData.password && (
              <div style={{ marginTop: 6, display: "flex", gap: 4 }}>
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    style={{
                      height: 3,
                      flex: 1,
                      borderRadius: 3,
                      background: i <= passwordStrength ? getPasswordStrengthColor() : C.borderTertiary,
                      transition: "all 0.2s ease",
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, display: "block", marginBottom: 6 }}>
              Confirm Password
            </label>
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                style={{
                  width: "100%",
                  padding: "10px 12px",
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                {showConfirmPassword ? (
                  <EyeOff size={18} color={C.textSecondary} />
                ) : (
                  <Eye size={18} color={C.textSecondary} />
                )}
              </button>
            </div>
            {formData.password && formData.confirmPassword && (
              <div
                style={{
                  marginTop: 6,
                  display: "flex",
                  gap: 6,
                  alignItems: "center",
                  fontSize: 12,
                  color: formData.password === formData.confirmPassword ? C.textSuccess : C.textDanger,
                }}
              >
                <CheckCircle2 size={16} />
                {formData.password === formData.confirmPassword ? "Passwords match" : "Passwords do not match"}
              </div>
            )}
          </div>

          {/* Terms & Conditions */}
          <label style={{ display: "flex", gap: 8, alignItems: "flex-start", cursor: "pointer", marginTop: 8 }}>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={formData.agreeTerms}
              onChange={handleChange}
              style={{ cursor: "pointer", width: 16, height: 16, marginTop: 2, flexShrink: 0 }}
            />
            <span style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.4 }}>
              I agree to the Terms of Service and Privacy Policy
            </span>
          </label>

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 16px",
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
              marginTop: 12,
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
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Sign In Link */}
        <p style={{ textAlign: "center", fontSize: 14, color: C.textSecondary, margin: "20px 0 0 0" }}>
          Already have an account?{" "}
          <button
            onClick={() => nav({ to: "/login" })}
            style={{
              background: "none",
              border: "none",
              color: C.brandPrimary,
              cursor: "pointer",
              fontWeight: 700,
              fontSize: 14,
            }}
          >
            Sign in here
          </button>
        </p>
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
