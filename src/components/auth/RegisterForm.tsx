import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Mail, Lock, User, Eye, EyeOff, CheckCircle, XCircle } from 'lucide-react';

interface RegisterFormProps {
  role: 'worker' | 'recruiter';
  onToggleMode: () => void;
}

const passwordRules = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'Contains uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'Contains lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: 'Contains a number', test: (p: string) => /[0-9]/.test(p) },
];

export function RegisterForm({ role, onToggleMode }: RegisterFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const { toast } = useToast();

  const allRulesPassed = passwordRules.every(r => r.test(password));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!allRulesPassed) {
      toast({ title: 'Weak password', description: 'Please meet all password requirements.', variant: 'destructive' });
      return;
    }
    setIsLoading(true);
    try {
      await register(email, password, name, role);
      toast({ title: 'Registration successful', description: `Welcome, ${name}!` });
    } catch (error: any) {
      const msg = error?.error
        ? Array.isArray(error.error) ? error.error.join(' ') : error.error
        : 'Please try again with different credentials.';
      toast({ title: 'Registration failed', description: msg, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-gradient-card border-0 shadow-elegant">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          {role === 'worker' ? 'Join as Job Seeker' : 'Join as Recruiter'}
        </CardTitle>
        <CardDescription>Create your account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="name" type="text" placeholder="Enter your full name" value={name} onChange={(e) => setName(e.target.value)} className="pl-9" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-9" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 pr-9"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-muted-foreground">
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {password.length > 0 && (
              <div className="space-y-1 mt-2">
                {passwordRules.map((rule) => (
                  <div key={rule.label} className="flex items-center gap-2 text-xs">
                    {rule.test(password)
                      ? <CheckCircle className="h-3 w-3 text-green-500" />
                      : <XCircle className="h-3 w-3 text-red-500" />}
                    <span className={rule.test(password) ? 'text-green-600' : 'text-red-500'}>{rule.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Button type="submit" className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300" disabled={isLoading || !allRulesPassed}>
            {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating Account...</> : 'Create Account'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Button variant="ghost" onClick={onToggleMode} className="text-sm text-muted-foreground hover:text-foreground">
            Already have an account? Sign in
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
