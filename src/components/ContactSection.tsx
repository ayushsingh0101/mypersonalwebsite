import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    recruiterName: '',
    recruiterEmail: '',
    recruiterRole: '',
    recruiterMessage: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copyToast, setCopyToast] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.recruiterName || !formData.recruiterEmail || !formData.recruiterMessage) {
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        recruiterName: '',
        recruiterEmail: '',
        recruiterRole: '',
        recruiterMessage: '',
      });
    }, 900);
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopyToast(`${label} copied!`);
    setTimeout(() => setCopyToast(null), 2500);
  };

  return (
    <section id="contact" className="px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-6 bg-[#090e1c]">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#22d3ee]">connect_without_contact</span>
          <h2 className="font-headline text-xl sm:text-2xl text-[#dee2f6] font-semibold tracking-tight">
            Let's Build Scalable Systems Together
          </h2>
        </div>
        <p className="font-mono text-xs sm:text-sm text-[#bbc9cd]">
          Available for backend internships, junior developer positions, and contract engineering.
        </p>
      </div>

      {/* Copy notification toast */}
      {copyToast && (
        <div className="p-2.5 bg-[#007068] text-[#9af0e5] font-mono text-xs flex items-center justify-between border border-[#80d5cb]/50 shadow-md">
          <span className="flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">check</span>
            {copyToast}
          </span>
          <span className="text-[10px] text-[#80d5cb]">BUFFER: READY</span>
        </div>
      )}

      {/* Direct Channel Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-4 bg-[#1a1f2e] border border-[#3c494c]/50 hover:border-[#22d3ee]/60 flex items-center justify-between shadow-md transition-colors group">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 bg-[#303444] text-[#22d3ee] border border-[#3c494c]/60">
              <span className="material-symbols-outlined text-xl">mail</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-mono text-[11px] text-[#859397] uppercase tracking-wider font-semibold">
                Direct Inbox
              </span>
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="font-mono text-xs sm:text-sm text-[#8aebff] hover:text-[#22d3ee] truncate"
              >
                {PERSONAL_INFO.email}
              </a>
            </div>
          </div>
          <button
            onClick={() => handleCopy(PERSONAL_INFO.email, 'Email address')}
            className="p-1.5 text-[#859397] hover:text-[#22d3ee] transition-colors"
            title="Copy email"
          >
            <span className="material-symbols-outlined text-base">content_copy</span>
          </button>
        </div>

        <div className="p-4 bg-[#1a1f2e] border border-[#3c494c]/50 hover:border-[#80d5cb]/60 flex items-center justify-between shadow-md transition-colors group">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2.5 bg-[#303444] text-[#80d5cb] border border-[#3c494c]/60">
              <span className="material-symbols-outlined text-xl">call</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-mono text-[11px] text-[#859397] uppercase tracking-wider font-semibold">
                Voice & WhatsApp
              </span>
              <a
                href="https://wa.me/918081156636"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs sm:text-sm text-[#dee2f6] hover:text-[#80d5cb] truncate"
              >
                {PERSONAL_INFO.phone}
              </a>
            </div>
          </div>
          <button
            onClick={() => handleCopy(PERSONAL_INFO.phone, 'Phone number')}
            className="p-1.5 text-[#859397] hover:text-[#80d5cb] transition-colors"
            title="Copy phone"
          >
            <span className="material-symbols-outlined text-base">content_copy</span>
          </button>
        </div>
      </div>

      {/* Recruiter Inquiry Interactive Form */}
      <div className="bg-[#1a1f2e] border border-[#3c494c]/50 p-4 sm:p-6 shadow-xl flex flex-col gap-4 font-mono">
        <div className="flex items-center justify-between border-b border-[#3c494c]/40 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-[#22d3ee]"></span>
            <span className="text-xs sm:text-sm text-[#dee2f6] uppercase tracking-wider font-semibold">
              Transmit Opportunity
            </span>
          </div>
          <span className="text-[11px] text-[#859397]">ENCRYPTED_SUBMIT</span>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4" id="portfolioContactForm">
          {/* Field: Name */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[11px] text-[#bbc9cd] uppercase tracking-wider flex items-center gap-1 font-semibold"
              htmlFor="recruiterName"
            >
              <span className="text-[#22d3ee] font-bold">&gt;</span> Full Name / Recruiter ID
            </label>
            <input
              id="recruiterName"
              type="text"
              required
              value={formData.recruiterName}
              onChange={(e) => setFormData({ ...formData, recruiterName: e.target.value })}
              placeholder="e.g. Sarah Connor"
              className="w-full px-3.5 py-2.5 bg-[#090e1c] border border-[#3c494c]/60 text-xs sm:text-sm text-[#dee2f6] placeholder-[#859397] outline-none focus:border-[#22d3ee] transition-colors"
            />
          </div>

          {/* Field: Email */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[11px] text-[#bbc9cd] uppercase tracking-wider flex items-center gap-1 font-semibold"
              htmlFor="recruiterEmail"
            >
              <span className="text-[#22d3ee] font-bold">&gt;</span> Work Email Address
            </label>
            <input
              id="recruiterEmail"
              type="email"
              required
              value={formData.recruiterEmail}
              onChange={(e) => setFormData({ ...formData, recruiterEmail: e.target.value })}
              placeholder="name@company.com"
              className="w-full px-3.5 py-2.5 bg-[#090e1c] border border-[#3c494c]/60 text-xs sm:text-sm text-[#dee2f6] placeholder-[#859397] outline-none focus:border-[#22d3ee] transition-colors"
            />
          </div>

          {/* Field: Role */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[11px] text-[#bbc9cd] uppercase tracking-wider flex items-center gap-1 font-semibold"
              htmlFor="recruiterRole"
            >
              <span className="text-[#22d3ee] font-bold">&gt;</span> Organization & Role Title
            </label>
            <input
              id="recruiterRole"
              type="text"
              value={formData.recruiterRole}
              onChange={(e) => setFormData({ ...formData, recruiterRole: e.target.value })}
              placeholder="e.g. TechCorp | Backend Intern or Junior Dev"
              className="w-full px-3.5 py-2.5 bg-[#090e1c] border border-[#3c494c]/60 text-xs sm:text-sm text-[#dee2f6] placeholder-[#859397] outline-none focus:border-[#22d3ee] transition-colors"
            />
          </div>

          {/* Field: Message */}
          <div className="flex flex-col gap-1.5">
            <label
              className="text-[11px] text-[#bbc9cd] uppercase tracking-wider flex items-center gap-1 font-semibold"
              htmlFor="recruiterMessage"
            >
              <span className="text-[#22d3ee] font-bold">&gt;</span> Transmission Payload / Message
            </label>
            <textarea
              id="recruiterMessage"
              rows={3}
              required
              value={formData.recruiterMessage}
              onChange={(e) => setFormData({ ...formData, recruiterMessage: e.target.value })}
              placeholder="We'd like to discuss a backend internship / junior developer role for our upcoming product sprint..."
              className="w-full px-3.5 py-2.5 bg-[#090e1c] border border-[#3c494c]/60 text-xs sm:text-sm text-[#dee2f6] placeholder-[#859397] outline-none focus:border-[#22d3ee] transition-colors resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3.5 bg-[#22d3ee] hover:bg-[#8aebff] text-[#00363e] font-mono text-xs sm:text-[13px] uppercase tracking-widest font-bold flex items-center justify-center gap-2 shadow-[0_0_16px_rgba(34,211,238,0.3)] active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-lg">send</span>
            {submitting ? 'ENCRYPTING & TRANSMITTING...' : 'Send Message'}
          </button>

          {/* Success Pill */}
          {submitted && (
            <div
              id="formConfirmation"
              className="p-3 bg-[#007068] text-[#9af0e5] flex items-center justify-between border border-[#80d5cb]/50 shadow-sm"
            >
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="material-symbols-outlined text-base">check_circle</span>
                <span>Payload transmitted! Ayush will review and respond shortly.</span>
              </div>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-[10px] text-[#9af0e5] underline hover:text-white"
              >
                DISMISS
              </button>
            </div>
          )}
        </form>
      </div>

      {/* Footer Colophon */}
      <footer className="w-full pt-4 pb-2 flex flex-col items-center justify-center text-center gap-2 font-mono">
        <div className="flex items-center gap-2 text-[#859397] text-xs">
          <span className="material-symbols-outlined text-sm">code</span>
          <span className="uppercase tracking-widest text-[11px]">
            Ayush Singh // Portfolio Engine v2.5
          </span>
        </div>
        <p className="text-xs text-[#bbc9cd]">
          &copy; {new Date().getFullYear()} Ayush Singh. Built with precision & code.
        </p>
      </footer>
    </section>
  );
};
