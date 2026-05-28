import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { Plus, Users, Briefcase, MessageCircle, BarChart3, Eye, MapPin, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { AIChat } from '@/components/chat/AIChat';
import { JobPostingForm } from '@/components/jobs/JobPostingForm';
import { ApplicantManagement } from '@/components/applicants/ApplicantManagement';

const mockJobPostings = [
  {
    id: '1',
    title: 'Senior React Developer',
    location: 'San Francisco, CA',
    type: 'Full-time',
    applicants: 24,
    posted: '3 days ago',
    status: 'Active',
  },
  {
    id: '2',
    title: 'Product Manager',
    location: 'New York, NY',
    type: 'Full-time',
    applicants: 18,
    posted: '1 week ago',
    status: 'Active',
  },
  {
    id: '3',
    title: 'UX Designer',
    location: 'Remote',
    type: 'Contract',
    applicants: 12,
    posted: '5 days ago',
    status: 'Active',
  },
];

const mockApplicants = [
  {
    id: '1',
    name: 'John Smith',
    position: 'Senior React Developer',
    experience: '5 years',
    status: 'Under Review',
    matchScore: 92,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    position: 'Product Manager',
    experience: '7 years',
    status: 'Interviewed',
    matchScore: 88,
  },
  {
    id: '3',
    name: 'Mike Chen',
    position: 'UX Designer',
    experience: '4 years',
    status: 'Applied',
    matchScore: 85,
  },
];

export function RecruiterDashboard() {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState('overview');
  const [showJobForm, setShowJobForm] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'jobs':
        return showJobForm ? (
          <JobPostingForm 
            onSubmit={() => {
              setShowJobForm(false);
              setActiveSection('jobs');
            }}
            onCancel={() => setShowJobForm(false)}
          />
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Job Postings</h2>
              <Button 
                className="bg-gradient-primary"
                onClick={() => setShowJobForm(true)}
              >
                <Plus className="mr-2 h-4 w-4" />
                Post New Job
              </Button>
            </div>
            <div className="grid gap-4">
              {mockJobPostings.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription className="flex items-center mt-1">
                          <MapPin className="mr-1 h-4 w-4" />
                          {job.location}
                        </CardDescription>
                      </div>
                      <Badge className="bg-success text-success-foreground">{job.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="mr-1 h-4 w-4" />
                          Posted {job.posted}
                        </div>
                        <div className="flex items-center text-sm">
                          <Users className="mr-1 h-4 w-4 text-primary" />
                          <span className="font-medium">{job.applicants} applicants</span>
                        </div>
                      </div>
                      <div className="space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="mr-1 h-4 w-4" />
                          View
                        </Button>
                        <Button size="sm" className="bg-gradient-primary">
                          Manage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      case 'applicants':
        return <ApplicantManagement />;
      case 'chat':
        return <AIChat userRole="recruiter" />;
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
                    <Briefcase className="mr-2 h-5 w-5 text-primary" />
                    Job Postings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-2">3</div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Active job listings with 54 total applicants
                  </p>
                  <Button 
                    className="w-full bg-gradient-primary" 
                    onClick={() => setActiveSection('jobs')}
                  >
                    Manage Jobs
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-accent" />
                    Applicants
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-accent mb-2">54</div>
                  <p className="text-sm text-muted-foreground mb-4">
                    New applications to review this week
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setActiveSection('applicants')}
                  >
                    Review Applicants
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <MessageCircle className="mr-2 h-5 w-5 text-primary" />
                    AI Recruiter Assistant
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get help with job descriptions and candidate matching.
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
                  <BarChart3 className="mr-2 h-5 w-5 text-success" />
                  Recruitment Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">85%</div>
                    <div className="text-sm text-muted-foreground">Application Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">92%</div>
                    <div className="text-sm text-muted-foreground">AI Match Accuracy</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-success">12</div>
                    <div className="text-sm text-muted-foreground">Days Avg. Hire Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-warning">76%</div>
                    <div className="text-sm text-muted-foreground">Candidate Satisfaction</div>
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
              <BarChart3 className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button
              variant={activeSection === 'jobs' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('jobs')}
            >
              <Briefcase className="mr-2 h-4 w-4" />
              Job Postings
            </Button>
            <Button
              variant={activeSection === 'applicants' ? 'default' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveSection('applicants')}
            >
              <Users className="mr-2 h-4 w-4" />
              Applicants
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