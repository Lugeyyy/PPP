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
      <section className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[90vh] flex items-center">
        {/* Three.js Background */}
        <HeroBackground />
        
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm animate-fade-in">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-medium text-white/80">Trusted by 10,000+ professionals</span>
            </div>
            
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight text-white animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Craft Your{' '}
              <span className="relative">
                <span className="relative z-10 text-gradient">Professional</span>
                <svg className="absolute -bottom-3 left-0 w-full h-4 text-amber-400/20" viewBox="0 0 100 12" preserveAspectRatio="none">
                  <path d="M0,6 Q50,12 100,6" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
              </span>{' '}
              Story.
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              Build a structured public profile that commands attention. 
              Showcase your expertise in a format employers instantly understand.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <button
                onClick={() => onNavigate('create')}
                className="btn-primary text-base px-8 py-4 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500"
              >
                Create Profile
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => onNavigate('browse')}
                className="btn-secondary text-base px-8 py-4 bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                Explore Talent
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Users,
                title: 'Structured Profiles',
                description: 'Standardized layouts that present your skills with clarity and impact.',
                gradient: 'from-teal-500/20 to-blue-500/20',
              },
              {
                icon: Search,
                title: 'Smart Discovery',
                description: 'Find talent by expertise, tools, experience, or location.',
                gradient: 'from-amber-500/20 to-teal-500/20',
              },
              {
                icon: FileText,
                title: 'Instant Export',
                description: 'Generate polished PDF resumes with one click.',
                gradient: 'from-blue-500/20 to-violet-500/20',
              },
              {
                icon: LinkIcon,
                title: 'Shareable URL',
                description: 'Your unique profile link, ready for any opportunity.',
                gradient: 'from-violet-500/20 to-amber-500/20',
              },
            ].map((feature, i) => (
              <div 
                key={feature.title}
                className="card-glass p-6 group"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-teal-400" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Profiles Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold">Featured Profiles</h2>
              <p className="mt-2 text-muted-foreground">Discover exceptional talent making waves</p>
            </div>
            <button
              onClick={() => onNavigate('browse')}
              className="hidden sm:flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all group"
            >
              View All
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProfiles.map((profile, i) => (
              <div
                key={profile.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
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
              className="inline-flex items-center gap-2 text-primary font-medium"
            >
              View All Profiles
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-600 via-blue-600 to-violet-700" />
            
            {/* Pattern overlay */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
            
            {/* Glow effects */}
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-teal-400/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-400/20 rounded-full blur-[100px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl" />
            
            <div className="relative p-12 sm:p-16 text-center">
              <h2 className="font-display text-3xl sm:text-5xl font-semibold text-white leading-tight">
                Ready to Make Your Mark?
              </h2>
              <p className="mt-6 text-lg text-white/80 max-w-xl mx-auto">
                Join thousands of professionals who have transformed their visibility 
                with a powerful, shareable profile.
              </p>
              <button
                onClick={() => onNavigate('create')}
                className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 font-semibold rounded-xl hover:bg-white/95 transition-all hover:scale-105 hover:shadow-2xl hover:shadow-white/20"
              >
                Create Your Profile
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
