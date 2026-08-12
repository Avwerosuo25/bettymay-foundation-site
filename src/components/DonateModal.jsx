import React, { useState } from "react";
import { X, Copy, Check, Landmark, CreditCard } from "lucide-react";
import { c, CONTACT_EMAIL } from "../lib/theme";
import { useDonateModal } from "../lib/DonateModalContext";

// ---------------------------------------------------------------------------
// Placeholder payment details — replace the USD entry with real info once
// the foundation opens a domiciliary/USD account. The Naira account is real.
// ---------------------------------------------------------------------------
const BANK_ACCOUNTS = [
  {
    currency: "NGN",
    label: "Naira Account",
    accountName: "The BettyMay Foundation",
    bankName: "Sterling Bank Plc",
    accountNumber: "0093048256",
  },
  {
    currency: "USD",
    label: "USD Account",
    accountName: "The BettyMay Foundation (USD)",
    bankName: "Sterling Bank Plc",
    accountNumber: "0093156104",
    swiftCode: "NAMENGLAXXX",
  },
];

// Replace these with real payment links once Paystack / Flutterwave
// accounts are set up (e.g. a Paystack Payment Page or Flutterwave Store
// link). These currently point to each provider's homepage as a safe
// placeholder so the button never 404s.
const PAYSTACK_URL = "https://paystack.com/pay/bettymay-foundation";
const FLUTTERWAVE_URL = "https://flutterwave.com/pay/w7qlyqmljgi8?_gl=1%2a1etlxxe%2a_ga%2aMTUyNDgwODk5NC4xNjgxNzQ2NTQ5%2a_ga_KQ9NSEMFCF%2aMTY4MjM2NTI1Mi40LjEuMTY4MjM2NTcxMi41OS4wLjA"

function PlainField({ label, value, noBorder = false }) {
  return (
    <div className="py-3" style={{ borderBottom: noBorder ? "none" : `1px solid ${c.creamDeep}` }}>
      <p className="font-utility text-[10px] uppercase tracking-wide" style={{ color: c.inkSoft }}>
        {label}
      </p>
      <p className="text-sm font-medium mt-0.5" style={{ color: c.ink }}>
        {value}
      </p>
    </div>
  );
}

function CopyField({ label, value, noBorder = false }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — silently ignore, value is still visible.
    }
  }

  return (
    <div className="flex items-center justify-between gap-3 py-3" style={{ borderBottom: noBorder ? "none" : `1px solid ${c.creamDeep}` }}>
      <div>
        <p className="font-utility text-[10px] uppercase tracking-wide" style={{ color: c.inkSoft }}>
          {label}
        </p>
        <p className="text-sm font-medium mt-0.5" style={{ color: c.ink }}>
          {value}
        </p>
      </div>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={`Copy ${label}`}
        className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-colors"
        style={{ backgroundColor: copied ? c.forest : c.plumTint }}
      >
        {copied ? <Check size={15} color={c.cream} /> : <Copy size={15} color={c.plum} />}
      </button>
    </div>
  );
}

export default function DonateModal() {
  const { isOpen, closeDonateModal } = useDonateModal();
  const [currency, setCurrency] = useState("NGN");

  if (!isOpen) return null;

  const account = BANK_ACCOUNTS.find((a) => a.currency === currency);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="donate-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(36,31,38,0.6)" }}
        onClick={closeDonateModal}
      />

      {/* Modal card */}
      <div
        className="relative w-full max-w-lg rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: c.cream }}
      >
        <div className="flex items-center justify-between px-6 py-5" style={{ backgroundColor: c.plum }}>
          <h2 id="donate-modal-title" className="font-display text-xl" style={{ color: c.cream }}>
            Support The BettyMay Foundation
          </h2>
          <button
            type="button"
            onClick={closeDonateModal}
            aria-label="Close"
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors hover:bg-white/10"
          >
            <X size={20} color={c.cream} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Pay online */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CreditCard size={18} color={c.plum} />
              <h3 className="font-display text-lg" style={{ color: c.plum }}>
                Pay Online
              </h3>
            </div>
            <p className="text-sm mb-4" style={{ color: c.inkSoft }}>
              Give securely by card, bank transfer, or USSD through our
              payment partners.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={PAYSTACK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center font-utility text-sm font-semibold px-5 py-3.5 rounded-full transition-transform hover:-translate-y-0.5"
                style={{ backgroundColor: c.gold, color: c.plumDeep }}
              >
                Pay with Paystack
              </a>
              <a
                href={FLUTTERWAVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center font-utility text-sm font-semibold px-5 py-3.5 rounded-full border transition-colors hover:bg-black/5"
                style={{ borderColor: c.plum, color: c.plum }}
              >
                Pay with Flutterwave
              </a>
            </div>
          </div>

          {/* Bank transfer */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Landmark size={18} color={c.plum} />
                <h3 className="font-display text-lg" style={{ color: c.plum }}>
                  Bank Transfer
                </h3>
              </div>
              <div className="flex rounded-full p-1" style={{ backgroundColor: c.plumTint }}>
                {BANK_ACCOUNTS.map((a) => (
                  <button
                    key={a.currency}
                    type="button"
                    onClick={() => setCurrency(a.currency)}
                    className="font-utility text-xs font-semibold px-4 py-1.5 rounded-full transition-colors"
                    style={{
                      backgroundColor: currency === a.currency ? c.plum : "transparent",
                      color: currency === a.currency ? c.cream : c.plum,
                    }}
                  >
                    {a.currency}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl px-5" style={{ backgroundColor: "white" }}>
              <PlainField label="Account Name" value={account.accountName} />
              <PlainField label="Bank Name" value={account.bankName} />
              {account.swiftCode && (
                <PlainField label="SWIFT / BIC Code" value={account.swiftCode} />
              )}
              <CopyField label="Account Number" value={account.accountNumber} noBorder />
            </div>
            <p className="text-xs mt-3" style={{ color: c.inkSoft }}>
              Please send your donor name and email to{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: c.plum }}>
                {CONTACT_EMAIL}
              </a>{" "}
              after transferring, so we can send a confirmation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
