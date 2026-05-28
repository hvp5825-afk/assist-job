import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Search, FileText, MessageCircle, TrendingUp, Star, MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AIChat } from '@/components/chat/AIChat';
import { BrowseJobs } from '@/components/jobs/BrowseJobs';
import { ResumeBuilder } from '@/components/resume/ResumeBuilder';

const mockJobs = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    salary: '$80,000 - $120,000',
    type: 'Full-time',
    posted: '2 days ago',
    description: 'We are looking for a skilled Frontend Developer to join our team...',
  },
  {
    id: '2',
    title: 'UX Designer',
    company: 'Design Studio',
    location: 'New York, NY',
    salary: '$70,000 - $100,000',
    type: 'Full-time',
    posted: '1 week ago',
    description: 'Join our creative team as a UX Designer and help shape user experiences...',
  },
  {
    id: '3',
    title: 'Data Analyst',
    company: 'Analytics Pro',
    location: 'Remote',
    salary: '$60,000 - $90,000',
    type: 'Remote',
    posted: '3 days ago',
    description: 'Analyze data and provide insights to drive business decisions...',
  },
];

export function WorkerDashboard() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'jobs':
        return <BrowseJobs />;
      case 'resume':
        return <ResumeBuilder />;
      case 'chat':
        return <AIChat userRole="worker" />;
      default:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Welcome back, {user?.name}!</h2>
              <Button variant="outline" onClick={logout}>Logout</Button>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-card hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Search className="mr-2 h-5 w-5 text-primary" />
                    Job Search
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Find your next opportunity from thousands of job listings.
                  </p>
                  <Button 
                    className="w-full bg-gradient-primary" 
                    onClick={() => setActiveSection('jobs')}
                  >
                    Browse Jobs
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-accent" />
                    Resume Builder
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a professional resume with AI assistance.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setActiveSection('resume')}
                  >
                    Build Resume
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                    AI Career Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get personalized career advice and interview tips.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setActiveSection('chat')}
                  >
                    Start Chat
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-card">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5 text-success" />
                  Career Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">150+</div>
                    <div className="text-sm text-muted-foreground">Jobs Available</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">95%</div>
                    <div className="text-sm text-muted-foreground">Match Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">24h</div>
                    <div className="text-sm text-muted-foreground">Avg. Response Time</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          <div className="w-64 space-y-2">
            <Button
              variant={activeSection === 'overview' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('overview')}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button
              variant={activeSection === 'jobs' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('jobs')}
            >
              <Search className="mr-2 h-4 w-4" />
              Job Search
            </Button>
            <Button
              variant={activeSection === 'resume' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('resume')}
            >
              <FileText className="mr-2 h-4 w-4" />
              Resume Builder
            </Button>
            <Button
              variant={activeSection === 'chat' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('chat')}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              AI Assistant
            </Button>
          </div>
          <div className="flex-1">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}