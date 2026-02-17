import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Homepage } from '@/pages/Homepage';
import { BrowseProfiles } from '@/pages/BrowseProfiles';
import { ProfilePage } from '@/pages/ProfilePage';
import { CreateProfile } from '@/pages/CreateProfile';
import { LoginPage, RegisterPage } from '@/pages/Auth';
import { Profile, mockProfiles } from '@/data/profiles';

type Page = 'home' | 'browse' | 'profile' | 'create' | 'login' | 'register';

export function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [profiles, setProfiles] = useState<Profile[]>(mockProfiles);
  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleNavigate = (page: string, profileId?: string) => {
    setCurrentPage(page as Page);
    if (profileId) {
      setSelectedProfileId(profileId);
    }
    if (page === 'home') {
      setSelectedProfileId(null);
      setSearchQuery('');
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSaveProfile = (profileData: Partial<Profile>) => {
    const newProfile: Profile = {
      id: Date.now().toString(),
      slug: profileData.slug || `${profileData.firstName?.toLowerCase()}-${profileData.lastName?.toLowerCase()}`,
      firstName: profileData.firstName || '',
      lastName: profileData.lastName || '',
      dateOfBirth: profileData.dateOfBirth || '',
      location: profileData.location || '',
      profilePhoto: profileData.profilePhoto || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      professionalSummary: profileData.professionalSummary || '',
      shortBio: profileData.shortBio || '',
      careerObjective: profileData.careerObjective || '',
      primaryField: profileData.primaryField || '',
      skills: profileData.skills || [],
      tools: profileData.tools || [],
      experience: profileData.experience || [],
      education: profileData.education || [],
      certifications: profileData.certifications || [],
      projects: profileData.projects || [],
      availability: profileData.availability || { openToWork: true, type: 'full-time', location: 'remote' },
      email: profileData.email || '',
      createdAt: profileData.createdAt || new Date().toISOString(),
    };
    setProfiles(p => [newProfile, ...p]);
    setSelectedProfileId(newProfile.id);
    setCurrentPage('profile');
  };

  const selectedProfile = profiles.find(p => p.id === selectedProfileId) || null;
  const featuredProfiles = profiles.filter(p => p.featured).slice(0, 6);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <Homepage
            featuredProfiles={featuredProfiles}
            onNavigate={handleNavigate}
          />
        );
      case 'browse':
        return (
          <BrowseProfiles
            profiles={profiles}
            onNavigate={handleNavigate}
            initialSearch={searchQuery}
          />
        );
      case 'profile':
        if (selectedProfile) {
          return (
            <ProfilePage
              profile={selectedProfile}
              onNavigate={handleNavigate}
            />
          );
        }
        return (
          <BrowseProfiles
            profiles={profiles}
            onNavigate={handleNavigate}
          />
        );
      case 'create':
        return (
          <CreateProfile
            onSave={handleSaveProfile}
            onCancel={() => setCurrentPage('home')}
          />
        );
      case 'login':
        return (
          <LoginPage
            onLogin={() => setCurrentPage('home')}
            onSwitchToRegister={() => setCurrentPage('register')}
            onNavigate={handleNavigate}
          />
        );
      case 'register':
        return (
          <RegisterPage
            onRegister={() => setCurrentPage('home')}
            onSwitchToLogin={() => setCurrentPage('login')}
            onNavigate={handleNavigate}
          />
        );
      default:
        return (
          <Homepage
            featuredProfiles={featuredProfiles}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="grain-overlay" />
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onSearch={handleSearch}
      />
      <main>
        {renderPage()}
      </main>
      
      {/* Footer */}
      <footer className="border-t border-border py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display text-sm font-bold">P</span>
            </div>
            <span className="font-display text-lg font-semibold">PPP</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2026 Professional Public Profile. Built for the modern workforce.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
