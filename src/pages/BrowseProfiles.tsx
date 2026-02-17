import { useState, useMemo } from 'react';
import { Profile } from '@/lib/types';
import { ProfileCard } from '@/components/profile/ProfileCard';
import { Search, SlidersHorizontal, X, ChevronDown, Users } from 'lucide-react';
import { primaryFields, locations } from '@/data/profiles';

interface BrowseProfilesProps {
  profiles: Profile[];
  onNavigate: (page: string, profileId?: string) => void;
  initialSearch?: string;
}

export function BrowseProfiles({ profiles, onNavigate, initialSearch = '' }: BrowseProfilesProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    primaryField: '',
    availability: '',
    location: '',
    experience: '',
    remoteOnly: false,
  });

  const filteredProfiles = useMemo(() => {
    return profiles.filter((profile) => {
      const matchesSearch = 
        searchQuery === '' ||
        `${profile.firstName} ${profile.lastName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.primaryField.toLowerCase().includes(searchQuery.toLowerCase()) ||
        profile.skills.some(s => s.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        profile.tools.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesField = !filters.primaryField || profile.primaryField === filters.primaryField;
      
      const matchesAvailability = !filters.availability || 
        (filters.availability === 'open' && profile.availability.openToWork) ||
        (filters.availability === 'closed' && !profile.availability.openToWork);

      const matchesLocation = !filters.location || 
        profile.location.toLowerCase().includes(filters.location.toLowerCase().split(',')[0]);

      const matchesRemote = !filters.remoteOnly || profile.availability.location === 'remote';

      let matchesExperience = true;
      if (filters.experience) {
        const yearsExp = profile.experience.reduce((acc, exp) => {
          const start = new Date(exp.startDate);
          const end = exp.endDate === 'Present' ? new Date() : new Date(exp.endDate);
          return acc + (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 365);
        }, 0);
        
        if (filters.experience === '0-2') matchesExperience = yearsExp >= 0 && yearsExp <= 2;
        if (filters.experience === '3-5') matchesExperience = yearsExp > 2 && yearsExp <= 5;
        if (filters.experience === '6-10') matchesExperience = yearsExp > 5 && yearsExp <= 10;
        if (filters.experience === '10+') matchesExperience = yearsExp > 10;
      }

      return matchesSearch && matchesField && matchesAvailability && matchesLocation && matchesRemote && matchesExperience;
    });
  }, [profiles, searchQuery, filters]);

  const clearFilters = () => {
    setFilters({
      primaryField: '',
      availability: '',
      location: '',
      experience: '',
      remoteOnly: false,
    });
    setSearchQuery('');
  };

  const hasActiveFilters = filters.primaryField || filters.availability || filters.location || filters.experience || filters.remoteOnly;

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold">Browse Talent</h1>
          <p className="mt-3 text-muted-foreground">
            Discover {filteredProfiles.length} {filteredProfiles.length === 1 ? 'professional' : 'professionals'}
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search by name, skill, job title, or tool..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-card border border-border/50 rounded-xl focus:outline-none focus:border-primary/30 focus:bg-card transition-all shadow-sm"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-medium transition-all ${
              showFilters || hasActiveFilters
                ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                : 'bg-card border border-border/50 hover:border-primary/30'
            }`}
          >
            <SlidersHorizontal className="w-5 h-5" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 px-2 py-0.5 text-xs bg-white/20 rounded-full">
                {[filters.primaryField, filters.availability, filters.location, filters.experience, filters.remoteOnly].filter(Boolean).length}
              </span>
            )}
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mb-8 p-6 bg-card border border-border/50 rounded-2xl animate-scale-in shadow-lg shadow-black/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Filters</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary hover:underline flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  Clear all
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Primary Field */}
              <div>
                <label className="block text-sm font-medium mb-2">Industry</label>
                <select
                  value={filters.primaryField}
                  onChange={(e) => setFilters(f => ({ ...f, primaryField: e.target.value }))}
                  className="input-premium"
                >
                  <option value="">All Industries</option>
                  {primaryFields.map(field => (
                    <option key={field} value={field}>{field}</option>
                  ))}
                </select>
              </div>

              {/* Availability */}
              <div>
                <label className="block text-sm font-medium mb-2">Availability</label>
                <select
                  value={filters.availability}
                  onChange={(e) => setFilters(f => ({ ...f, availability: e.target.value }))}
                  className="input-premium"
                >
                  <option value="">Any</option>
                  <option value="open">Open to Work</option>
                  <option value="closed">Not Available</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-2">Location</label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters(f => ({ ...f, location: e.target.value }))}
                  className="input-premium"
                >
                  <option value="">Any Location</option>
                  {locations.map(loc => (
                    <option key={loc} value={loc}>{loc}</option>
                  ))}
                </select>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-medium mb-2">Experience</label>
                <select
                  value={filters.experience}
                  onChange={(e) => setFilters(f => ({ ...f, experience: e.target.value }))}
                  className="input-premium"
                >
                  <option value="">Any Level</option>
                  <option value="0-2">Entry Level (0-2 yrs)</option>
                  <option value="3-5">Mid Level (3-5 yrs)</option>
                  <option value="6-10">Senior (6-10 yrs)</option>
                  <option value="10+">Executive (10+ yrs)</option>
                </select>
              </div>

              {/* Remote Only */}
              <div className="flex items-end">
                <label className="flex items-center gap-3 px-4 py-3 bg-secondary/50 rounded-xl cursor-pointer w-full border border-border/30">
                  <input
                    type="checkbox"
                    checked={filters.remoteOnly}
                    onChange={(e) => setFilters(f => ({ ...f, remoteOnly: e.target.checked }))}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50"
                  />
                  <span className="text-sm font-medium">Remote Only</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {filteredProfiles.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProfiles.map((profile, i) => (
              <div
                key={profile.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <ProfileCard
                  profile={profile}
                  onClick={() => onNavigate('profile', profile.id)}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-secondary/50 flex items-center justify-center">
              <Users className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="font-display text-xl font-semibold">No profiles found</h3>
            <p className="mt-3 text-muted-foreground max-w-md mx-auto">
              Try adjusting your search or filters to discover more talent.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mt-8 btn-primary"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
