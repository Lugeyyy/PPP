import { useState } from 'react';
import { Profile, SkillLevel, Experience, Education, Skill } from '@/lib/types';
import { primaryFields, locations } from '@/data/profiles';
import { 
  User, Briefcase, GraduationCap, Award, Folder, 
  Check, ChevronRight, ChevronLeft, Plus, X, Upload
} from 'lucide-react';

interface CreateProfileProps {
  onSave: (profile: Partial<Profile>) => void;
  onCancel: () => void;
}

const steps = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'professional', label: 'Professional', icon: Briefcase },
  { id: 'experience', label: 'Experience', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'portfolio', label: 'Portfolio', icon: Folder },
  { id: 'availability', label: 'Availability', icon: Award },
];

export function CreateProfile({ onSave, onCancel }: CreateProfileProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [profile, setProfile] = useState<Partial<Profile>>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    location: '',
    profilePhoto: '',
    professionalSummary: '',
    shortBio: '',
    careerObjective: '',
    primaryField: '',
    skills: [],
    tools: [],
    experience: [],
    education: [],
    certifications: [],
    projects: [],
    availability: {
      openToWork: true,
      type: 'full-time',
      location: 'remote',
    },
    email: '',
  });

  const [newSkill, setNewSkill] = useState({ name: '', level: 'intermediate' as SkillLevel });
  const [newTool, setNewTool] = useState('');
  const [newExperience, setNewExperience] = useState<Partial<Experience>>({
    jobTitle: '',
    company: '',
    startDate: '',
    endDate: '',
    description: '',
    keyAchievements: [],
  });
  const [newAchievement, setNewAchievement] = useState('');
  const [newEducation, setNewEducation] = useState<Partial<Education>>({
    institution: '',
    degree: '',
    yearCompleted: '',
  });

  const updateProfile = (updates: Partial<Profile>) => {
    setProfile(p => ({ ...p, ...updates }));
  };

  const addSkill = () => {
    if (newSkill.name.trim()) {
      updateProfile({ skills: [...(profile.skills || []), { ...newSkill }] });
      setNewSkill({ name: '', level: 'intermediate' });
    }
  };

  const removeSkill = (index: number) => {
    updateProfile({ skills: (profile.skills || []).filter((_, i) => i !== index) });
  };

  const addTool = () => {
    if (newTool.trim() && !(profile.tools || []).includes(newTool)) {
      updateProfile({ tools: [...(profile.tools || []), newTool] });
      setNewTool('');
    }
  };

  const removeTool = (index: number) => {
    updateProfile({ tools: (profile.tools || []).filter((_, i) => i !== index) });
  };

  const addExperience = () => {
    if (newExperience.jobTitle && newExperience.company) {
      updateProfile({ 
        experience: [...(profile.experience || []), { ...newExperience, id: Date.now().toString() } as Experience] 
      });
      setNewExperience({
        jobTitle: '',
        company: '',
        startDate: '',
        endDate: '',
        description: '',
        keyAchievements: [],
      });
    }
  };

  const removeExperience = (index: number) => {
    updateProfile({ experience: (profile.experience || []).filter((_, i) => i !== index) });
  };

  const addAchievement = () => {
    if (newAchievement.trim()) {
      setNewExperience(e => ({
        ...e,
        keyAchievements: [...(e.keyAchievements || []), newAchievement],
      }));
      setNewAchievement('');
    }
  };

  const addEducation = () => {
    if (newEducation.degree && newEducation.institution) {
      updateProfile({ 
        education: [...(profile.education || []), { ...newEducation, id: Date.now().toString() } as Education] 
      });
      setNewEducation({ institution: '', degree: '', yearCompleted: '' });
    }
  };

  const removeEducation = (index: number) => {
    updateProfile({ education: (profile.education || []).filter((_, i) => i !== index) });
  };

  const handleSubmit = () => {
    const slug = `${profile.firstName?.toLowerCase()}-${profile.lastName?.toLowerCase()}`;
    onSave({ ...profile, slug, createdAt: new Date().toISOString() });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return profile.firstName && profile.lastName && profile.email;
      case 1: return profile.primaryField && profile.professionalSummary;
      default: return true;
    }
  };

  const goToStep = (newStep: number) => {
    setDirection(newStep > currentStep ? 1 : -1);
    setCurrentStep(newStep);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h2 className="font-display text-2xl font-semibold mb-2">Personal Information</h2>
              <p className="text-muted-foreground">Let's start with the basics.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">First Name *</label>
                <input
                  type="text"
                  value={profile.firstName}
                  onChange={(e) => updateProfile({ firstName: e.target.value })}
                  className="input-premium"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Last Name *</label>
                <input
                  type="text"
                  value={profile.lastName}
                  onChange={(e) => updateProfile({ lastName: e.target.value })}
                  className="input-premium"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => updateProfile({ email: e.target.value })}
                className="input-premium"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Date of Birth</label>
              <input
                type="date"
                value={profile.dateOfBirth}
                onChange={(e) => updateProfile({ dateOfBirth: e.target.value })}
                className="input-premium"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <select
                value={profile.location}
                onChange={(e) => updateProfile({ location: e.target.value })}
                className="input-premium"
              >
                <option value="">Select location</option>
                {locations.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Profile Photo URL</label>
              <input
                type="url"
                value={profile.profilePhoto}
                onChange={(e) => updateProfile({ profilePhoto: e.target.value })}
                className="input-premium"
                placeholder="https://example.com/photo.jpg"
              />
              {profile.profilePhoto && (
                <img 
                  src={profile.profilePhoto} 
                  alt="Preview" 
                  className="mt-3 w-20 h-20 rounded-xl object-cover shadow-md"
                />
              )}
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h2 className="font-display text-2xl font-semibold mb-2">Professional Summary</h2>
              <p className="text-muted-foreground">Tell employers what you do and why you're great at it.</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Primary Field *</label>
              <select
                value={profile.primaryField}
                onChange={(e) => updateProfile({ primaryField: e.target.value })}
                className="input-premium"
              >
                <option value="">Select your field</option>
                {primaryFields.map(field => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Professional Summary *</label>
              <textarea
                value={profile.professionalSummary}
                onChange={(e) => updateProfile({ professionalSummary: e.target.value })}
                rows={4}
                className="input-premium resize-none"
                placeholder="A brief overview of your professional background..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Short Bio</label>
              <textarea
                value={profile.shortBio}
                onChange={(e) => updateProfile({ shortBio: e.target.value })}
                rows={3}
                maxLength={200}
                className="input-premium resize-none"
                placeholder="A concise bio (max 200 words)..."
              />
              <p className="text-xs text-muted-foreground mt-1">{profile.shortBio?.length || 0}/200</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Career Objective</label>
              <textarea
                value={profile.careerObjective}
                onChange={(e) => updateProfile({ careerObjective: e.target.value })}
                rows={3}
                className="input-premium resize-none"
                placeholder="What role are you looking for?"
              />
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium mb-2">Skills & Expertise</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill(s => ({ ...s, name: e.target.value }))}
                  className="input-premium flex-1"
                  placeholder="Add a skill..."
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                />
                <select
                  value={newSkill.level}
                  onChange={(e) => setNewSkill(s => ({ ...s, level: e.target.value as SkillLevel }))}
                  className="input-premium w-36"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
                <button
                  type="button"
                  onClick={addSkill}
                  className="btn-primary !px-4"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(profile.skills || []).map((skill, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-secondary/50 rounded-lg border border-border/30"
                  >
                    {skill.name}
                    <span className="text-xs text-muted-foreground capitalize">({skill.level})</span>
                    <button onClick={() => removeSkill(i)} className="hover:text-destructive transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <label className="block text-sm font-medium mb-2">Tools & Software</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={newTool}
                  onChange={(e) => setNewTool(e.target.value)}
                  className="input-premium flex-1"
                  placeholder="Add a tool..."
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTool())}
                />
                <button
                  type="button"
                  onClick={addTool}
                  className="btn-primary !px-4"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {(profile.tools || []).map((tool, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-secondary/50 rounded-lg border border-border/30"
                  >
                    {tool}
                    <button onClick={() => removeTool(i)} className="hover:text-destructive transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h2 className="font-display text-2xl font-semibold mb-2">Work Experience</h2>
              <p className="text-muted-foreground">Add your professional experience.</p>
            </div>

            {/* Existing Experience */}
            {(profile.experience || []).map((exp, i) => (
              <div key={i} className="p-5 bg-secondary/30 rounded-xl border border-border/30">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{exp.jobTitle}</h3>
                    <p className="text-primary font-medium">{exp.company}</p>
                    <p className="text-sm text-muted-foreground">
                      {exp.startDate} — {exp.endDate}
                    </p>
                  </div>
                  <button onClick={() => removeExperience(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Add New Experience */}
            <div className="p-6 bg-card border border-border/50 rounded-2xl space-y-4">
              <h3 className="font-semibold text-lg">Add Experience</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  value={newExperience.jobTitle}
                  onChange={(e) => setNewExperience(ex => ({ ...ex, jobTitle: e.target.value }))}
                  className="input-premium"
                  placeholder="Job Title"
                />
                <input
                  type="text"
                  value={newExperience.company}
                  onChange={(e) => setNewExperience(ex => ({ ...ex, company: e.target.value }))}
                  className="input-premium"
                  placeholder="Company"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="date"
                  value={newExperience.startDate}
                  onChange={(e) => setNewExperience(ex => ({ ...ex, startDate: e.target.value }))}
                  className="input-premium"
                />
                <input
                  type="text"
                  value={newExperience.endDate}
                  onChange={(e) => setNewExperience(ex => ({ ...ex, endDate: e.target.value }))}
                  className="input-premium"
                  placeholder="End Date (or 'Present')"
                />
              </div>
              <textarea
                value={newExperience.description}
                onChange={(e) => setNewExperience(ex => ({ ...ex, description: e.target.value }))}
                rows={2}
                className="input-premium resize-none"
                placeholder="Job description..."
              />

              {/* Achievements */}
              <div>
                <label className="block text-sm font-medium mb-2">Key Achievements</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newAchievement}
                    onChange={(e) => setNewAchievement(e.target.value)}
                    className="input-premium flex-1"
                    placeholder="Add an achievement..."
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
                  />
                  <button
                    type="button"
                    onClick={addAchievement}
                    className="btn-secondary !px-4"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(newExperience.keyAchievements || []).map((a, i) => (
                    <span key={i} className="inline-flex items-center gap-1 px-2.5 py-1 text-sm bg-secondary/50 rounded-lg">
                      {a}
                      <button onClick={() => setNewExperience(ex => ({ ...ex, keyAchievements: (ex.keyAchievements || []).filter((_, j) => j !== i) }))}>
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={addExperience}
                className="w-full btn-primary"
              >
                Add Experience
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h2 className="font-display text-2xl font-semibold mb-2">Education</h2>
              <p className="text-muted-foreground">Add your educational background.</p>
            </div>

            {/* Existing Education */}
            {(profile.education || []).map((edu, i) => (
              <div key={i} className="p-5 bg-secondary/30 rounded-xl border border-border/30">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p className="text-primary font-medium">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">Completed {edu.yearCompleted}</p>
                  </div>
                  <button onClick={() => removeEducation(i)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}

            {/* Add New Education */}
            <div className="p-6 bg-card border border-border/50 rounded-2xl space-y-4">
              <h3 className="font-semibold text-lg">Add Education</h3>
              <input
                type="text"
                value={newEducation.degree}
                onChange={(e) => setNewEducation(ed => ({ ...ed, degree: e.target.value }))}
                className="input-premium"
                placeholder="Degree / Certificate"
              />
              <input
                type="text"
                value={newEducation.institution}
                onChange={(e) => setNewEducation(ed => ({ ...ed, institution: e.target.value }))}
                className="input-premium"
                placeholder="Institution"
              />
              <input
                type="text"
                value={newEducation.yearCompleted}
                onChange={(e) => setNewEducation(ed => ({ ...ed, yearCompleted: e.target.value }))}
                className="input-premium"
                placeholder="Year Completed"
              />
              <button
                type="button"
                onClick={addEducation}
                className="w-full btn-primary"
              >
                Add Education
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h2 className="font-display text-2xl font-semibold mb-2">Portfolio</h2>
              <p className="text-muted-foreground">Showcase your best work. (Coming soon - currently UI only)</p>
            </div>

            <div className="p-12 border-2 border-dashed border-border/50 rounded-2xl text-center">
              <Upload className="w-14 h-14 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">Drag and drop files here, or click to browse</p>
              <p className="text-sm text-muted-foreground mt-2">PNG, JPG, PDF up to 10MB</p>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h2 className="font-display text-2xl font-semibold mb-2">Availability</h2>
              <p className="text-muted-foreground">Let employers know when you're ready to start.</p>
            </div>

            <div className="space-y-5">
              <label className="flex items-start gap-4 p-5 bg-secondary/30 rounded-xl cursor-pointer border border-border/30 hover:border-primary/20 transition-all">
                <input
                  type="checkbox"
                  checked={profile.availability?.openToWork}
                  onChange={(e) => updateProfile({ availability: { ...profile.availability!, openToWork: e.target.checked } })}
                  className="w-5 h-5 mt-0.5 rounded border-border text-primary focus:ring-primary/50"
                />
                <div>
                  <span className="font-medium block">Open to Work</span>
                  <p className="text-sm text-muted-foreground mt-1">Let employers know you're actively looking</p>
                </div>
              </label>

              <div>
                <label className="block text-sm font-medium mb-3">Employment Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {['full-time', 'part-time', 'contract'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => updateProfile({ availability: { ...profile.availability!, type: type as any } })}
                      className={`py-3.5 rounded-xl font-medium capitalize transition-all ${
                        profile.availability?.type === type
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                          : 'bg-secondary/50 hover:bg-secondary border border-border/30'
                      }`}
                    >
                      {type.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Work Location</label>
                <div className="grid grid-cols-3 gap-3">
                  {['remote', 'on-site', 'hybrid'].map((loc) => (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => updateProfile({ availability: { ...profile.availability!, location: loc as any } })}
                      className={`py-3.5 rounded-xl font-medium capitalize transition-all ${
                        profile.availability?.location === loc
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                          : 'bg-secondary/50 hover:bg-secondary border border-border/30'
                      }`}
                    >
                      {loc.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-3xl sm:text-4xl font-semibold">Create Your Profile</h1>
          <p className="mt-3 text-muted-foreground">Step {currentStep + 1} of {steps.length}</p>
          
          {/* Progress bar */}
          <div className="mt-4 h-1.5 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-10 px-2">
          {steps.map((step, i) => (
            <button
              key={step.id}
              onClick={() => i < currentStep && goToStep(i)}
              className={`flex flex-col items-center gap-2 transition-all duration-300 ${
                i <= currentStep ? 'opacity-100' : 'opacity-40'
              } ${i < currentStep ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                i < currentStep 
                  ? 'bg-gradient-to-br from-primary to-amber-500 text-white shadow-lg shadow-primary/25' 
                  : i === currentStep 
                    ? 'bg-primary/20 text-primary border-2 border-primary'
                    : 'bg-secondary'
              }`}>
                {i < currentStep ? <Check className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
              </div>
              <span className="text-xs font-medium hidden sm:block">{step.label}</span>
            </button>
          ))}
        </div>

        {/* Form */}
        <div className="bg-card border border-border/50 rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/5">
          {renderStep()}

          {/* Navigation */}
          <div className="flex justify-between mt-10 pt-6 border-t border-border/50">
            <button
              onClick={() => currentStep > 0 ? goToStep(currentStep - 1) : onCancel()}
              className="btn-secondary"
            >
              <ChevronLeft className="w-4 h-4" />
              {currentStep > 0 ? 'Back' : 'Cancel'}
            </button>

            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => goToStep(currentStep + 1)}
                disabled={!canProceed()}
                className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:transform-none"
              >
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="btn-primary"
              >
                <Check className="w-4 h-4" />
                Create Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
