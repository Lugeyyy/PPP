import { Profile, SkillLevel } from '@/lib/types';
import { 
  MapPin, Mail, Phone, Linkedin, Globe, Calendar, 
  Briefcase, GraduationCap, Award, Folder, Share2,
  ExternalLink, ChevronRight, Star
} from 'lucide-react';

interface ProfilePageProps {
  profile: Profile;
  onNavigate: (page: string) => void;
}

const skillLevelColors: Record<SkillLevel, string> = {
  beginner: 'skill-level-beginner',
  intermediate: 'skill-level-intermediate',
  advanced: 'skill-level-advanced',
  expert: 'skill-level-expert',
};

export function ProfilePage({ profile, onNavigate }: ProfilePageProps) {
  const yearsExp = profile.experience.reduce((acc, exp) => {
    const start = new Date(exp.startDate);
    const end = exp.endDate === 'Present' ? new Date() : new Date(exp.endDate);
    const years = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);
    return acc + years;
  }, 0);

  const formatDate = (dateStr: string) => {
    if (dateStr === 'Present') return 'Present';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen pt-16 pb-16">
      {/* Top Section - Hero */}
      <div className="relative bg-card border-b border-border/50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 h-48 bg-gradient-to-br from-primary/5 via-transparent to-amber-100/20" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-10">
          <div className="flex flex-col sm:flex-row items-start gap-8">
            {/* Profile Photo */}
            <div className="relative">
              <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden border-4 border-background shadow-2xl">
                <img
                  src={profile.profilePhoto}
                  alt={`${profile.firstName} ${profile.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              {profile.availability.openToWork && (
                <span className="absolute -bottom-2 -right-2 px-4 py-1.5 text-xs font-semibold bg-emerald-500 text-white rounded-full shadow-lg">
                  Available
                </span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-xl text-primary font-medium mt-2">{profile.primaryField}</p>
              
              <div className="flex flex-wrap items-center gap-5 mt-5 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {profile.location}
                </span>
                <span className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4" />
                  {yearsExp > 0 ? `${Math.round(yearsExp)}+ years` : 'Entry Level'}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Member since {new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>

              {/* Availability Badge */}
              <div className="flex flex-wrap gap-2 mt-5">
                <span className={`px-3.5 py-1.5 text-xs font-semibold rounded-full ${
                  profile.availability.openToWork ? 'availability-open' : 'availability-closed'
                }`}>
                  {profile.availability.openToWork ? 'Open to Work' : 'Not Available'}
                </span>
                <span className="px-3.5 py-1.5 text-xs font-semibold bg-secondary text-secondary-foreground rounded-full capitalize">
                  {profile.availability.type.replace('-', ' ')}
                </span>
                <span className="px-3.5 py-1.5 text-xs font-semibold bg-secondary text-secondary-foreground rounded-full capitalize">
                  {profile.availability.location.replace('-', ' ')}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:items-end">
              <button
                onClick={() => window.location.href = `mailto:${profile.email}`}
                className="btn-primary"
              >
                <Mail className="w-4 h-4" />
                Contact
              </button>
              <button className="btn-secondary">
                <Share2 className="w-4 h-4" />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 py-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Professional Summary */}
            <section className="animate-fade-in-up">
              <h2 className="font-display text-2xl font-semibold mb-5 flex items-center gap-3">
                <span className="w-1 h-8 bg-primary rounded-full" />
                Professional Summary
              </h2>
              <p className="text-muted-foreground leading-loose text-lg">{profile.professionalSummary}</p>
            </section>

            {/* Career Objective */}
            {profile.careerObjective && (
              <section className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <h2 className="font-display text-2xl font-semibold mb-5 flex items-center gap-3">
                  <span className="w-1 h-8 bg-primary rounded-full" />
                  Career Objective
                </h2>
                <p className="text-muted-foreground leading-loose text-lg">{profile.careerObjective}</p>
              </section>
            )}

            {/* Experience Timeline */}
            {profile.experience.length > 0 && (
              <section className="animate-fade-in-up" style={{ animationDelay: '150ms' }}>
                <h2 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3">
                  <span className="w-1 h-8 bg-primary rounded-full" />
                  Experience
                </h2>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-[11px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-primary to-primary/20" />
                  
                  <div className="space-y-8">
                    {profile.experience.map((exp, idx) => (
                      <div key={exp.id || idx} className="relative pl-10 group">
                        {/* Timeline Dot */}
                        <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-gradient-to-br from-primary to-amber-400 flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                          <Briefcase className="w-3 h-3 text-white" />
                        </div>
                        
                        <div className="p-6 bg-card border border-border/50 rounded-2xl hover:border-primary/20 transition-all duration-300">
                          <h3 className="font-semibold text-lg">{exp.jobTitle}</h3>
                          <p className="text-primary font-medium mt-1">{exp.company}</p>
                          <p className="text-sm text-muted-foreground mt-2 flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                          </p>
                          <p className="mt-4 text-muted-foreground leading-relaxed">{exp.description}</p>
                          {exp.keyAchievements.length > 0 && (
                            <ul className="mt-4 space-y-2">
                              {exp.keyAchievements.map((achievement, i) => (
                                <li key={i} className="flex items-start gap-3 text-muted-foreground">
                                  <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Projects / Portfolio */}
            {profile.projects.length > 0 && (
              <section className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <h2 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3">
                  <span className="w-1 h-8 bg-primary rounded-full" />
                  Portfolio
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {profile.projects.map((project) => (
                    <div 
                      key={project.id}
                      className="group bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
                    >
                      {project.images.length > 0 && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={project.images[0]}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-5">
                        <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{project.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                        {project.links.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.links.map((link) => (
                              <a
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
                              >
                                {link.label}
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {profile.education.length > 0 && (
              <section className="animate-fade-in-up" style={{ animationDelay: '250ms' }}>
                <h2 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3">
                  <span className="w-1 h-8 bg-primary rounded-full" />
                  Education
                </h2>
                <div className="grid gap-4">
                  {profile.education.map((edu, idx) => (
                    <div key={edu.id || idx} className="p-5 bg-card border border-border/50 rounded-xl hover:border-primary/20 transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{edu.degree}</h3>
                          <p className="text-primary font-medium mt-1">{edu.institution}</p>
                        </div>
                        <span className="px-3 py-1 text-xs font-medium bg-secondary rounded-full text-muted-foreground">
                          {edu.yearCompleted}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {profile.certifications.length > 0 && (
              <section className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <h2 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3">
                  <span className="w-1 h-8 bg-primary rounded-full" />
                  Certifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {profile.certifications.map((cert, idx) => (
                    <div key={cert.id || idx} className="p-5 bg-card border border-border/50 rounded-xl hover:border-primary/20 transition-all duration-300">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Award className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{cert.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{cert.issuer} • {cert.year}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Skills */}
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold mb-5 flex items-center gap-2">
                <Star className="w-5 h-5 text-primary" />
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`skill-tag ${skillLevelColors[skill.level]}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold mb-5 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                Tools & Software
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 text-sm font-medium bg-secondary/50 text-secondary-foreground rounded-md border border-border/30"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-card border border-border/50 rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold mb-5 flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Contact
              </h3>
              <div className="space-y-4">
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  {profile.email}
                </a>
                {profile.phone && (
                  <a
                    href={`tel:${profile.phone}`}
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    {profile.phone}
                  </a>
                )}
                {profile.linkedin && (
                  <a
                    href={`https://${profile.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Linkedin className="w-4 h-4 text-primary" />
                    </div>
                    LinkedIn
                  </a>
                )}
                {profile.portfolio && (
                  <a
                    href={`https://${profile.portfolio}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Globe className="w-4 h-4 text-primary" />
                    </div>
                    Portfolio
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
