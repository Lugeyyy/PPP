import { Profile } from '@/lib/types';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { HeroBackground } from '@/components/ui/HeroBackground';
import { ArrowRight, Users, Search, FileText, Link as LinkIcon, Sparkles } from 'lucide-react';

interface HomepageProps {
  featuredProfiles: Profile[];
  onNavigate: (page: string, profileId?: string) => void;
}

export function Homepage({ featuredProfiles, onNavigate }: HomepageProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[85vh] flex items-center">
        <HeroBackground />
        
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-black/3 dark:bg-white/2 rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-black/2 dark:bg-white/2 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-5xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-8 rounded-full bg-secondary border border-border/50 text-sm text-muted-foreground animate-fade-in">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Trusted by 10,000+ professionals</span>
            </div>
            
            <h1 className="hero-title text-foreground animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Craft Your{' '}
              <span className="text-gradient">Professional</span>{' '}
              Story.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Build a structured public profile that commands attention. 
              Showcase your expertise in a format employers instantly understand.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <button
                onClick={() => onNavigate('create')}
                className="btn-primary text-base px-7 py-3.5"
              >
                Create Profile
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('browse')}
                className="btn-ghost text-base px-7 py-3.5 bg-secondary/50"
              >
                Explore Talent
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-gradient-subtle border-y border-border/50">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              {
                icon: Users,
                title: 'Structured Profiles',
                description: 'Standardized layouts that present your skills with clarity and impact.',
              },
              {
                icon: Search,
                title: 'Smart Discovery',
                description: 'Find talent by expertise, tools, experience, or location.',
              },
              {
                icon: FileText,
                title: 'Instant Export',
                description: 'Generate polished PDF resumes with one click.',
              },
              {
                icon: LinkIcon,
                title: 'Shareable URL',
                description: 'Your unique profile link, ready for any opportunity.',
              },
            ].map((feature, i) => (
              <div 
                key={feature.title}
                className="card-glass p-5 lg:p-6 group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                  <feature.icon className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Profiles Grid */}
      <section className="section-padding">
        <div className="container-main">
          <div className="flex flex-col sm:flex-row items-end justify-between gap-4 mb-10">
            <div>
              <h2 className="section-title">Featured Profiles</h2>
              <p className="mt-2 text-muted-foreground">Discover exceptional talent making waves</p>
            </div>
            <button
              onClick={() => onNavigate('browse')}
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-foreground hover:gap-3 transition-all group"
            >
              View All
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredProfiles.map((profile, i) => (
              <div
                key={profile.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <ProfileCard
                  profile={profile}
                  onClick={() => onNavigate('profile', profile.id)}
                />
              </div>
            ))}
          </div>

          <div className="mt-10 text-center sm:hidden">
            <button
              onClick={() => onNavigate('browse')}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
            >
              View All Profiles
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-main">
          <div className="relative rounded-3xl overflow-hidden bg-zinc-900 dark:bg-zinc-950">
            <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            
            <div className="absolute top-0 left-1/4 w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-white/3 rounded-full blur-[80px]" />
            
            <div className="relative p-10 sm:p-16 lg:p-20 text-center">
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-semibold text-white tracking-tight" style={{ letterSpacing: '-0.03em' }}>
                Ready to Make Your Mark?
              </h2>
              <p className="mt-5 text-base sm:text-lg text-zinc-400 max-w-lg mx-auto">
                Join thousands of professionals who have transformed their visibility 
                with a powerful, shareable profile.
              </p>
              <button
                onClick={() => onNavigate('create')}
                className="mt-8 sm:mt-10 inline-flex items-center gap-2 px-7 py-3.5 bg-white text-zinc-900 font-semibold rounded-xl hover:bg-zinc-100 transition-all hover:-translate-y-0.5 hover:shadow-xl"
              >
                Create Your Profile
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
