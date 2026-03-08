import { useState, useRef, FormEvent } from "react";
import { Send, Mail, Github, Linkedin, CheckCircle2, XCircle, Zap,Facebook } from "lucide-react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ScrollReveal";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState<{ show: boolean; success: boolean; message: string }>({
    show: false,
    success: false,
    message: "",
  });

  const showPopup = (success: boolean, message: string) => {
    setPopup({ show: true, success, message });
    setTimeout(() => setPopup((p) => ({ ...p, show: false })), 4000);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);
    try {
      await emailjs.sendForm(
        "service_5nyumbf",
        "template_vys31oj",
        formRef.current,
        "reVYrtLxObA61ImtU"
      );
      showPopup(true, "Message transmitted successfully! I'll respond soon.");
      formRef.current.reset();
    } catch {
      showPopup(false, "Transmission failed. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16 relative">
      {/* Futuristic Popup */}
      <AnimatePresence>
        {popup.show && (
          <motion.div
            initial={{ opacity: 0, y: -40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-md"
          >
            <div className={`relative overflow-hidden rounded-xl border p-5 backdrop-blur-xl shadow-2xl ${popup.success
                ? "border-primary/40 bg-background/90 shadow-[0_0_30px_hsl(var(--primary)/0.3)]"
                : "border-destructive/40 bg-background/90 shadow-[0_0_30px_hsl(var(--destructive)/0.3)]"
              }`}>
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className={`absolute inset-x-0 h-px animate-scan ${popup.success ? "bg-primary/60" : "bg-destructive/60"}`} />
              </div>
              <div className={`absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 ${popup.success ? "border-primary" : "border-destructive"}`} />
              <div className={`absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 ${popup.success ? "border-primary" : "border-destructive"}`} />
              <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 ${popup.success ? "border-primary" : "border-destructive"}`} />
              <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 ${popup.success ? "border-primary" : "border-destructive"}`} />
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${popup.success ? "bg-primary/20" : "bg-destructive/20"}`}>
                  {popup.success ? <CheckCircle2 className="text-primary" size={22} /> : <XCircle className="text-destructive" size={22} />}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <Zap size={12} className={popup.success ? "text-primary" : "text-destructive"} />
                    <span className="font-heading text-xs uppercase tracking-widest text-muted-foreground">
                      {popup.success ? "Transmission Complete" : "Transmission Error"}
                    </span>
                  </div>
                  <p className="text-sm font-medium text-foreground">{popup.message}</p>
                </div>
              </div>
              <motion.div
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 4, ease: "linear" }}
                className={`absolute bottom-0 left-0 right-0 h-0.5 origin-left ${popup.success ? "bg-primary" : "bg-destructive"}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="section-container">
        <ScrollReveal>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-center mb-4">
            Get In <span className="text-gradient-neon">Touch</span>
          </h1>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto text-sm">
            Have a question or want to work together? Send me a message!
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <ScrollReveal>
            <form ref={formRef} onSubmit={handleSubmit} className="glass-card-hover p-8 space-y-5">
              {[
                { name: "user_name", label: "Name", type: "text" },
                { name: "user_email", label: "Email", type: "email" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm text-muted-foreground mb-1.5 font-medium">{field.label}</label>
                  <input
                    name={field.name}
                    type={field.type}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-glass text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-neon transition-all duration-300"
                    placeholder={`Your ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm text-muted-foreground mb-1.5 font-medium">Message</label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-secondary/50 border border-glass text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:shadow-neon transition-all duration-300 resize-none"
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-heading font-semibold text-sm gradient-neon text-primary-foreground hover:shadow-neon-strong hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"} <Send size={16} />
              </button>
            </form>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="space-y-6">
              <div className="glass-card-hover p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Contact Info</h3>
                <a href="mailto:ridu116540@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-primary transition-colors mb-3">
                  <Mail size={18} className="text-primary" /> ridu116540@gmail.com
                </a>
              </div>
              <div className="glass-card-hover p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">Social Links</h3>
                <div className="flex gap-4">
                  {[
                    { icon: Github, href: "https://github.com/ridu101", label: "GitHub" },
                    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                    { icon: Mail, href: "mailto:ridu116540@gmail.com", label: "Email" },
                    { icon: Facebook, href: "https://www.facebook.com/ridwan.ahmed.116540", label: "Facebook" },

                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg border border-glass text-muted-foreground hover:text-primary hover:border-glass-hover hover:shadow-neon transition-all duration-300"
                    >
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Contact;
