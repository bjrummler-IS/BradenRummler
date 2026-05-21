import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const copy = (text: string, type: "email" | "phone") => {
    navigator.clipboard.writeText(text);
    if (type === "email") {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-sm cursor-pointer"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="bg-white rounded-xl shadow-2xl relative w-full max-w-sm overflow-hidden border border-outline-variant/30"
          >
            <div className="h-1 w-full bg-primary"></div>

            {/* Header */}
            <div className="px-6 py-4 border-b border-outline-variant/20 flex justify-between items-center">
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-[20px]">contact_page</span>
                <h3 className="font-sans text-lg font-bold">Get in Touch</h3>
              </div>
              <button
                onClick={onClose}
                className="text-outline hover:text-primary transition-colors p-1 rounded hover:bg-slate-100"
              >
                <span className="material-symbols-outlined text-md">close</span>
              </button>
            </div>

            {/* Contact items */}
            <div className="px-6 py-6 space-y-4">

              {/* Email */}
              <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-[#F8FAFC] border border-outline-variant/20">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="material-symbols-outlined text-primary text-xl shrink-0">mail</span>
                  <a
                    href="mailto:Bjrummler@gmail.com"
                    className="font-sans text-sm font-semibold text-primary hover:underline truncate"
                  >
                    Bjrummler@gmail.com
                  </a>
                </div>
                <button
                  onClick={() => copy("Bjrummler@gmail.com", "email")}
                  className="shrink-0 text-ink-medium hover:text-primary transition-colors p-1 rounded hover:bg-slate-200"
                  title="Copy email"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {copiedEmail ? "check" : "content_copy"}
                  </span>
                </button>
              </div>

              {/* Phone */}
              <div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-[#F8FAFC] border border-outline-variant/20">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="material-symbols-outlined text-primary text-xl shrink-0">phone</span>
                  <a
                    href="tel:7203820113"
                    className="font-sans text-sm font-semibold text-primary hover:underline truncate"
                  >
                    (720) 382-0113
                  </a>
                </div>
                <button
                  onClick={() => copy("7203820113", "phone")}
                  className="shrink-0 text-ink-medium hover:text-primary transition-colors p-1 rounded hover:bg-slate-200"
                  title="Copy number"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {copiedPhone ? "check" : "content_copy"}
                  </span>
                </button>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
