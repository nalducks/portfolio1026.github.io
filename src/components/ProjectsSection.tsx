import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    title: "Kalkulator",
    desc: "Web-based calculator with clean UI",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Portfolio Website",
    desc: "Personal portfolio with modern design",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Data Analysis Dashboard",
    desc: "Interactive data visualization dashboard",
    tags: ["Python", "Excel"],
  },
  {
    title: "Arduino Line Follower",
    desc: "Autonomous robot with line tracking",
    tags: ["C++", "Arduino"],
  },
];

import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="projects" ref={ref} className={`section-padding max-w-6xl mx-auto transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2 text-center font-display">
        Projects
      </h2>
      <div className="w-12 h-1 bg-primary rounded-full mx-auto mb-12" />

      <div className="grid sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <Card
            key={project.title}
            className="glass border-0 rounded-2xl gradient-border group hover:glow-box transition-all duration-500"
          >
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-foreground font-display group-hover:text-primary transition-colors">
                {project.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{project.desc}</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="bg-secondary text-primary/80 px-3 py-1 text-xs rounded-md border border-primary/10"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
