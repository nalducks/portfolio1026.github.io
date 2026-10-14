import { ArrowUpRight, GraduationCap, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { education, experiences } from "@/data/profile";

const ExperienceSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.05);
  return (
    <section id="experience" ref={ref} className={`section-padding max-w-6xl mx-auto transition-all duration-700 motion-reduce:transition-none ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="section-heading"><span className="section-eyebrow">02 / Perjalanan profesional</span><h2>Pengalaman yang<br /><span className="text-muted-foreground">membentuk keahlian.</span></h2></div>
      <div className="border-t border-border">
        {experiences.map((exp, i) => <article key={`${exp.company}-${exp.position}`} className="grid md:grid-cols-[0.8fr_1.4fr] gap-5 md:gap-12 py-8 md:py-10 border-b border-border">
          <div><p className="text-xs text-primary mb-3">{exp.duration}</p><h3 className="font-semibold text-lg">{exp.company}</h3><p className="flex gap-1.5 items-center text-xs text-muted-foreground mt-3"><MapPin size={13} />{exp.location}</p>{i === 0 && <span className="inline-flex items-center gap-2 mt-4 text-xs text-primary"><span className="w-1.5 h-1.5 rounded-full bg-primary" />Posisi saat ini</span>}</div>
          <div><h4 className="text-xl font-medium mb-4 flex justify-between gap-3">{exp.position}<ArrowUpRight size={20} className="text-muted-foreground shrink-0 mt-1" /></h4><ul className="space-y-3">{exp.tasks.map(task => <li key={task} className="text-sm text-muted-foreground leading-7 flex gap-3"><span className="text-primary shrink-0">—</span><span>{task}</span></li>)}</ul></div>
        </article>)}
      </div>
      <div className="mt-14 md:mt-20">
        <h3 className="detail-heading"><GraduationCap size={18} /> Pendidikan</h3>
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mt-6">
          {education.map(edu => <div key={edu.title} className="glass rounded-xl p-6 border border-border/60 hover:border-primary/40 transition-colors duration-300">
            <p className="text-xs text-primary mb-3">{edu.period}</p>
            <h4 className="text-base font-semibold">{edu.title}</h4>
            <p className="text-sm text-foreground/80 mt-1">{edu.place}</p>
            <p className="text-xs leading-6 text-muted-foreground mt-3">{edu.desc}</p>
          </div>)}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;