import { ArrowUpRight, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const ContactSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="contact" ref={ref} className={`section-padding max-w-3xl mx-auto text-center relative transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-80 h-80 bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        <p className="section-eyebrow mb-4">Mari terhubung</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 font-display">Langkah berikutnya,<br />dimulai dari percakapan.</h2>
        <div className="w-12 h-1 bg-primary rounded-full mx-auto mb-6" />
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Tertarik untuk bekerja sama? Silakan hubungi saya melalui email atau media sosial.
        </p>

        <Button asChild size="lg" className="rounded-lg px-8 text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 glow-box mb-10">
          <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2">
            <Mail size={16} />
            {profile.email}
          </a>
        </Button>

        <div className="flex items-center justify-center gap-8 text-muted-foreground">
          <a href="https://github.com/nalducks" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors"><Github size={17} />GitHub<ArrowUpRight size={13} /></a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm hover:text-primary transition-colors"><Linkedin size={17} />LinkedIn<ArrowUpRight size={13} /></a>
        </div>
        <p className="mt-8 inline-flex items-center gap-2 text-xs text-muted-foreground"><MapPin size={14} />{profile.location}</p>
      </div>
    </section>
  );
};

export default ContactSection;
