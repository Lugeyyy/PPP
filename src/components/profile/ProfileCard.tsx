import { Profile, SkillLevel } from '@/lib/types';
import { MapPin, Briefcase, ArrowRight, Star } from 'lucide-react';

interface ProfileCardProps {
  profile: Profile;
  onClick: () => void;
}

const skillLevelLabels: Record<SkillLevel, string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
  expert: 'Expert',
};

export function ProfileCard({ profile, onClick }: ProfileCardProps) {
  const topSkills = profile.skills.slice(0, 4);
  const yearsExp = profile.experience.reduce((acc, exp) => {
    const start = new Date(exp.startDate);
    const end = exp.endDate === 'Present' ? new Date() : new Date(exp.endDate);
    const years = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);
    return acc + years;
  }, 0);

  return (
    <button
      onClick={onClick}
      className="group w-full text-left bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5"
    >
      {/* Profile Photo Section */}
      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-amber-100/30" />
        <img
          src={profile.profilePhoto}
          alt={`${profile.firstName} ${profile.lastName}`}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {profile.availability.openToWork && (
          <span className="absolute top-4 right-4 px-3 py-1.5 text-xs font-semibold bg-emerald-500 text-white rounded-full shadow-lg">
            Available
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
              {profile.firstName} {profile.lastName}
            </h3>
            <p className="text-sm font-medium text-primary mt-1.5">
              {profile.primaryField}
            </p>
          </div>
          {yearsExp > 0 && (
            <div className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 dark:bg-amber-900/20 rounded-full">
              <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
                {Math.round(yearsExp)}+
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {profile.location.split(',')[0]}
          </span>
          <span className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" />
            {yearsExp > 0 ? `${Math.round(yearsExp)}+ yrs` : 'Entry Level'}
          </span>
        </div>

        <p className="mt-4 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {profile.shortBio}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-5">
          {topSkills.map((skill) => (
            <span
              key={skill.name}
              className="px-2.5 py-1 text-xs font-medium bg-secondary/50 text-secondary-foreground rounded-md border border-border/30"
            >
              {skill.name}
            </span>
          ))}
          {profile.skills.length > 4 && (
            <span className="px-2.5 py-1 text-xs text-muted-foreground">
              +{profile.skills.length - 4} more
            </span>
          )}
        </div>

        {/* View Profile Button */}
        <div className="flex items-center gap-2 mt-6 text-sm font-semibold text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          View Full Profile
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </button>
  );
}
