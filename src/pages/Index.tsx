import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { WorkerDashboard } from '@/components/dashboard/WorkerDashboard';
import { RecruiterDashboard } from '@/components/dashboard/RecruiterDashboard';
import { Brain, Users, Search, FileText, MessageCircle, Sparkles } from 'lucide-react';

const Index = () => {
  const { user, isLoading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<'worker' | 'recruiter' | null>(null);
  const [isLogin, setIsLogin] = useState(true);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-muted-foreground">Loading AI Career Assistant...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return user.role === 'worker' ? <WorkerDashboard /> : <RecruiterDashboard />;
  }

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Button 
              variant="ghost" 
              onClick={() => setSelectedRole(null)}
              className="mb-4"
            >
              ← Back to role selection
            </Button>
            <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              AI Career Assistant
            </h1>
            <p className="text-muted-foreground">
              {selectedRole === 'worker' ? 'Find your dream job' : 'Find the perfect candidates'}
            </p>
          </div>
          
          {isLogin ? (
            <LoginForm 
              role={selectedRole} 
              onToggleMode={() => setIsLogin(false)} 
            />
          ) : (
            <RegisterForm 
              role={selectedRole} 
              onToggleMode={() => setIsLogin(true)} 
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <Brain className="h-16 w-16 text-primary mr-4" />
            <h1 className="text-5xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              AI Career Assistant
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Transform your career journey with AI-powered guidance. Whether you're seeking opportunities 
            or finding talent, we're here to help you succeed.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Sparkles className="h-4 w-4 mr-1 text-primary" />
              AI-Powered
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-1 text-accent" />
              For Everyone
            </div>
            <div className="flex items-center">
              <MessageCircle className="h-4 w-4 mr-1 text-success" />
              24/7 Support
            </div>
          </div>
        </div>

        {/* Role Selection */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Path</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card 
              className="bg-gradient-card border-0 shadow-elegant hover:shadow-glow transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedRole('worker')}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                  <Search className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl">Job Seeker</CardTitle>
                <CardDescription className="text-base">
                  Find your dream job with AI-powered career guidance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Search className="h-4 w-4 mr-2 text-primary" />
                    Smart job matching and recommendations
                  </div>
                  <div className="flex items-center text-sm">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    AI-powered resume builder and optimization
                  </div>
                  <div className="flex items-center text-sm">
                    <MessageCircle className="h-4 w-4 mr-2 text-primary" />
                    Personalized interview preparation
                  </div>
                  <div className="flex items-center text-sm">
                    <Brain className="h-4 w-4 mr-2 text-primary" />
                    Career advice and skill development
                  </div>
                </div>
                <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  Start Your Journey
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="bg-gradient-card border-0 shadow-elegant hover:shadow-glow transition-all duration-300 cursor-pointer transform hover:scale-105"
              onClick={() => setSelectedRole('recruiter')}
            >
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-4 bg-accent/10 rounded-full w-fit">
                  <Users className="h-12 w-12 text-accent" />
                </div>
                <CardTitle className="text-2xl">Recruiter</CardTitle>
                <CardDescription className="text-base">
                  Find the perfect candidates with intelligent hiring tools
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Users className="h-4 w-4 mr-2 text-accent" />
                    AI-powered candidate matching and screening
                  </div>
                  <div className="flex items-center text-sm">
                    <FileText className="h-4 w-4 mr-2 text-accent" />
                    Smart job description optimization
                  </div>
                  <div className="flex items-center text-sm">
                    <MessageCircle className="h-4 w-4 mr-2 text-accent" />
                    Automated candidate communication
                  </div>
                  <div className="flex items-center text-sm">
                    <Brain className="h-4 w-4 mr-2 text-accent" />
                    Hiring insights and analytics
                  </div>
                </div>
                <Button className="w-full bg-accent text-accent-foreground hover:shadow-glow transition-all duration-300">
                  Find Top Talent
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose AI Career Assistant?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mx-auto mb-4 p-4 bg-primary/10 rounded-full w-fit">
                <Brain className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Intelligence</h3>
              <p className="text-muted-foreground">
                Advanced algorithms provide personalized recommendations and insights
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 p-4 bg-accent/10 rounded-full w-fit">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Perfect Matching</h3>
              <p className="text-muted-foreground">
                Connect the right people with the right opportunities seamlessly
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-4 p-4 bg-success/10 rounded-full w-fit">
                <Sparkles className="h-8 w-8 text-success" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Continuous Support</h3>
              <p className="text-muted-foreground">
                24/7 AI assistance for all your career and hiring needs
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
