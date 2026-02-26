import { Profile, SkillLevel } from '@/lib/types';
import { MapPin, Briefcase, ArrowRight, Star } from 'lucide-react';

interface ProfileCardProps {
  profile: Profile;
  onClick: () => void;
}

export function ProfileCard({ profile, onClick }: ProfileCardProps) {
  const topSkills = profile.skills.slice(0, 3);
  const yearsExp = profile.experience.reduce((acc, exp) => {
    const start = new Date(exp.startDate);
    const end = exp.endDate === 'Present' ? new Date() : new Date(exp.endDate);
    const years = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);
    return acc + years;
  }, 0);

  return (
    <button
      onClick={onClick}
      className="group w-full text-left bg-card border border-border/50 rounded-2xl overflow-hidden hover:border-foreground/10 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative h-40 overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-secondary/50 via-transparent to-transparent" />
        <img
          src={profile.profilePhoto}
          alt={`${profile.firstName} ${profile.lastName}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {profile.availability.openToWork && (
          <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium bg-emerald-500 text-white rounded-full">
            Available
          </span>
        )}
      </div>

      <div className="p-5">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            {profile.firstName} {profile.lastName}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            {profile.primaryField}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {profile.location.split(',')[0]}
          </span>
          <span className="flex items-center gap-1">
            <Briefcase className="w-3 h-3" />
            {yearsExp > 0 ? `${Math.round(yearsExp)}+ yrs` : 'Entry Level'}
          </span>
        </div>

        <p className="mt-3 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {profile.shortBio}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {topSkills.map((skill) => (
            <span
              key={skill.name}
              className="px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground rounded-md"
            >
              {skill.name}
            </span>
          ))}
          {profile.skills.length > 3 && (
            <span className="px-2 py-0.5 text-xs text-muted-foreground">
              +{profile.skills.length - 3}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 mt-5 text-xs font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
          View Profile
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </button>
  );
}
