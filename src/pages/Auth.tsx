import { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

interface LoginPageProps {
  onLogin: () => void;
  onSwitchToRegister: () => void;
  onNavigate: (page: string) => void;
}

export function LoginPage({ onLogin, onSwitchToRegister, onNavigate }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button 
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display text-xl font-bold">P</span>
            </div>
          </button>
          <h1 className="font-display text-3xl font-semibold mt-6">Welcome back</h1>
          <p className="mt-2 text-muted-foreground">Sign in to manage your profile</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-secondary border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-secondary border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-border text-primary focus:ring-primary/50" />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a href="#" className="text-primary hover:underline">Forgot password?</a>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Sign In
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="mt-6 text-center">
            <span className="text-muted-foreground">Don't have an account? </span>
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </button>
          </div>
        </form>

        {/* Demo Login */}
        <div className="mt-6 p-4 bg-secondary/50 rounded-xl">
          <p className="text-sm text-muted-foreground text-center">
            Demo mode: Click "Sign In" to continue as a guest
          </p>
        </div>
      </div>
    </div>
  );
}

interface RegisterPageProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
  onNavigate: (page: string) => void;
}

export function RegisterPage({ onRegister, onSwitchToLogin, onNavigate }: RegisterPageProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'seeker' | 'employer'>('seeker');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister();
  };

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button 
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-display text-xl font-bold">P</span>
            </div>
          </button>
          <h1 className="font-display text-3xl font-semibold mt-6">Create account</h1>
          <p className="mt-2 text-muted-foreground">Join the professional network</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 sm:p-8">
          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">I am a...</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole('seeker')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  role === 'seeker' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <User className={`w-6 h-6 mx-auto mb-2 ${role === 'seeker' ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-sm font-medium ${role === 'seeker' ? 'text-primary' : ''}`}>Job Seeker</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('employer')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  role === 'employer' 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <svg className={`w-6 h-6 mx-auto mb-2 ${role === 'employer' ? 'text-primary' : 'text-muted-foreground'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <span className={`text-sm font-medium ${role === 'employer' ? 'text-primary' : ''}`}>Employer</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-secondary border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-secondary border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-secondary border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
                  required
                  minLength={8}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 transition-colors"
          >
            Create Account
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="mt-6 text-center">
            <span className="text-muted-foreground">Already have an account? </span>
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
