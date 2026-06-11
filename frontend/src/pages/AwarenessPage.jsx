import React from "react";
import {
  ShieldCheck,
  Link2Off,
  Eye,
  BellRing,
  Smartphone,
  Lock,
  AlertTriangle
} from "lucide-react";

const AwarenessPage = () => {
  return (
    <div className="awareness-page">

      {/* ================= HERO SECTION ================= */}
      <section className="awareness-hero">
        <div className="awareness-tag">
          Awareness & Education
        </div>

        <h1>
          Stay <span className="glow">Safe</span> from Smishing
        </h1>

        <p className="awareness-desc">
          Smishing (SMS phishing) attacks are increasing rapidly.
          Learn how to identify suspicious messages and protect your
          personal and financial information from fraudsters.
        </p>
      </section>


      {/* ================= PROTECT SECTION ================= */}
      <section className="protect-section">
        <h2>
          How to Protect <span className="glow">Yourself</span>
        </h2>

        <div className="protect-grid">

          <div className="protect-card">
            <Link2Off className="protect-icon" size={22} />
            <h3>Avoid Suspicious Links</h3>
            <p>
              Do not click shortened or unknown URLs.
              Always verify the website before entering any sensitive data.
            </p>
          </div>

          <div className="protect-card">
            <Eye className="protect-icon" size={22} />
            <h3>Verify the Sender</h3>
            <p>
              Check the phone number carefully.
              Trusted institutions never ask for passwords or OTP via SMS.
            </p>
          </div>

          <div className="protect-card">
            <BellRing className="protect-icon" size={22} />
            <h3>Watch for Urgency</h3>
            <p>
              Messages that pressure you to act immediately
              are often scams designed to trigger panic.
            </p>
          </div>

          <div className="protect-card">
            <ShieldCheck className="protect-icon" size={22} />
            <h3>Enable Two-Factor Authentication</h3>
            <p>
              Activate 2FA on banking and social apps
              to add an extra layer of account security.
            </p>
          </div>

          <div className="protect-card">
            <Smartphone className="protect-icon" size={22} />
            <h3>Keep Devices Updated</h3>
            <p>
              Install updates regularly to fix security
              vulnerabilities exploited by attackers.
            </p>
          </div>

          <div className="protect-card">
            <Lock className="protect-icon" size={22} />
            <h3>Report Suspicious Messages</h3>
            <p>
              Forward phishing SMS to your telecom provider
              or cybersecurity authority immediately.
            </p>
          </div>

        </div>
      </section>


      {/* ================= EXAMPLES SECTION ================= */}
      <section className="examples-section">
        <h2>
          Real Smishing <span className="glow">Examples</span>
        </h2>

        <div className="examples-wrapper">

          <div className="example-card">
            <AlertTriangle className="example-icon" size={20} />
            <div>
              <p className="example-message">
                ALERT: Your bank account has been compromised.
                Verify now: bit.ly/secure-login
              </p>
              <span>
                Creates urgency and uses shortened URLs to hide malicious websites.
              </span>
            </div>
          </div>

          <div className="example-card">
            <AlertTriangle className="example-icon" size={20} />
            <div>
              <p className="example-message">
                Hi Mom, I lost my phone. This is my new number.
                Can you send ₹300 immediately?
              </p>
              <span>
                Impersonates a trusted contact to emotionally manipulate victims.
              </span>
            </div>
          </div>

          <div className="example-card">
            <AlertTriangle className="example-icon" size={20} />
            <div>
              <p className="example-message">
                Congratulations! You’ve won a ₹10,000 gift card.
                Claim now before it expires!
              </p>
              <span>
                Fake reward schemes designed to steal personal information.
              </span>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default AwarenessPage;