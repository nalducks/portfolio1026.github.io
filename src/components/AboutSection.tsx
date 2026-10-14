import { ArrowUpRight, Award, BookOpen, Code2, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { certificates, profile } from "@/data/profile";

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation(0.05);
  return (
    <section id="about" ref={ref} className={`section-padding max-w-6xl mx-auto transition-all duration-700 motion-reduce:transition-none ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="section-heading">
        <span className="section-eyebrow">01 / Tentang saya</span>
        <h2>Dari elektronika,<br /><span className="text-muted-foreground">menuju dunia digital.</span></h2>
      </div>
      <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16">
        <div>
          <p className="text-foreground/90 text-base leading-8">Saya Dhany, profesional di bidang perawatan mesin dan administrasi dengan latar belakang teknik elektronika. Saya memadukan ketelitian teknis, pelayanan pelanggan, dan pengelolaan data dalam pekerjaan sehari-hari.</p>
          <p className="text-muted-foreground text-sm leading-7 mt-5">Pengalaman saya mencakup analisis kerusakan, perbaikan mesin dan board, pengelolaan sparepart, serta pencatatan administrasi dan keuangan. Saat ini saya melanjutkan studi Informatika di Universitas Widyagama Malang dengan fokus Data Science.</p>
          <div className="mt-8 pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground mb-3">Bidang yang ingin saya eksplorasi</p>
            <div className="flex flex-wrap gap-2">{profile.interests.map(item => <Badge key={item} variant="secondary" className="rounded-md border border-primary/20 bg-primary/5 text-primary py-2 px-3">{item}</Badge>)}</div>
          </div>
        </div>
        <div className="space-y-7">
          <div>
            <h3 className="detail-heading"><Wrench size={18} /> Keahlian & perangkat</h3>
            <div className="mt-4 flex flex-wrap gap-2">{["Maintenance & repair", "Analisis kerusakan", "Administrasi pelanggan", "Inventory sparepart", "Microsoft Word", "Excel", "Accurate", "Thunderbird"].map(item => <Badge key={item} variant="secondary" className="profile-badge">{item}</Badge>)}</div>
          </div>
          <div className="flex gap-3 border-t border-border pt-5">
            <Code2 size={18} className="text-primary shrink-0 mt-1" />
            <div><h3 className="text-sm font-semibold">Pengembangan web</h3><p className="text-sm text-muted-foreground mt-2 leading-6">Belajar HTML hingga Fullstack dan mengembangkan situs portofolio pribadi.</p></div>
          </div>
          <div className="border-t border-border pt-5">
            <div className="flex flex-wrap justify-between gap-3 items-center"><h3 className="detail-heading"><Award size={18} /> Sertifikasi</h3><a href="https://drive.google.com/drive/folders/1EiWfN_RKm6xdpG-e56c8mFy9EwU0fjRW?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-xs text-primary inline-flex items-center gap-1 hover:underline">Lihat koleksi <ArrowUpRight size={14} /></a></div>
            <ul className="mt-3 divide-y divide-border/60">{certificates.map((cert, i) => <li key={cert} className="flex gap-3 py-3.5 text-sm leading-6"><span className="text-muted-foreground/60 text-xs pt-0.5 shrink-0">0{i + 1}</span><span className="min-w-0">{cert}</span></li>)}</ul>
          </div>
          <div className="flex gap-3 border-t border-border pt-5"><BookOpen size={18} className="text-primary shrink-0" /><div><h3 className="text-sm font-semibold">Bahasa Indonesia</h3><p className="text-xs text-muted-foreground mt-1">Professional Working Proficiency</p></div></div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;