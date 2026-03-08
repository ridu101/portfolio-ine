import { useState, useRef, FormEvent } from "react";
import { Send, Mail, Github, Linkedin } from "lucide-react";
import emailjs from "@emailjs/browser";
import ScrollReveal from "@/components/ScrollReveal";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    setLoading(true);
    try {
      // Replace these with your actual EmailJS service/template/public key
      await emailjs.sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        formRef.current,
        "YOUR_PUBLIC_KEY"
      );
      toast({ title: "Message sent!", description: "Thank you for reaching out. I'll get back to you soon." });
      formRef.current.reset();
    } catch {
      toast({ title: "Failed to send", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-16">
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
                    { icon: Github, href: "https://github.com", label: "GitHub" },
                    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                    { icon: Mail, href: "mailto:ridu116540@gmail.com", label: "Email" },
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
