import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Clock, Building, DollarSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// COMMENT: Fetch jobs from backend API
// fetch('YOUR_BACKEND_URL/api/jobs')

// MOCK JOB RESPONSE
const jobs = [
  {
    id: 'job123',
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'Bangalore',
    summary: 'React developer with 1-2 years of experience.',
    salary: '5-8 LPA',
    type: 'Full-time',
    posted: '2 days ago',
    description: 'We are looking for a passionate Frontend Developer to join our dynamic team. You will be responsible for building user-facing features using React, collaborating with designers and backend developers.',
    requirements: ['React.js proficiency', 'JavaScript ES6+', 'CSS/SCSS', 'REST API integration']
  },
  {
    id: 'job456',
    title: 'Backend Developer',
    company: 'DataFlow Inc',
    location: 'Mumbai',
    summary: 'Node.js backend developer for scalable applications.',
    salary: '6-10 LPA',
    type: 'Full-time',
    posted: '1 day ago',
    description: 'Join our backend team to build robust, scalable APIs and microservices. Work with modern technologies and best practices.',
    requirements: ['Node.js', 'MongoDB/PostgreSQL', 'API Design', 'Docker']
  },
  {
    id: 'job789',
    title: 'UI/UX Designer',
    company: 'Creative Studios',
    location: 'Remote',
    summary: 'Creative designer for web and mobile applications.',
    salary: '4-7 LPA',
    type: 'Remote',
    posted: '3 days ago',
    description: 'We are seeking a talented UI/UX Designer to create intuitive and engaging user experiences for our digital products.',
    requirements: ['Figma/Sketch', 'User Research', 'Prototyping', 'Design Systems']
  }
];

export function BrowseJobs() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = (jobId: string) => {
    // On Apply: create DTO and log
    const applicationDto = {
      jobId: jobId,
      userId: 'user456', // Mock user ID
      appliedAt: new Date().toISOString(),
      status: 'PENDING',
    };
    
    console.log('Application DTO:', applicationDto);
    
    // COMMENT: Send application to backend
    // fetch('YOUR_BACKEND_URL/api/apply', { 
    //   method: 'POST', 
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(applicationDto) 
    // })
    
    toast({
      title: "Application Submitted!",
      description: "Your application has been sent to the recruiter.",
    });
  };

  const selectedJobData = jobs.find(job => job.id === selectedJob);

  if (selectedJob && selectedJobData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setSelectedJob(null)}>
            ← Back to Jobs
          </Button>
        </div>
        
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl">{selectedJobData.title}</CardTitle>
                <CardDescription className="text-lg flex items-center mt-2">
                  <Building className="mr-2 h-5 w-5" />
                  {selectedJobData.company}
                </CardDescription>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {selectedJobData.type}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>{selectedJobData.location}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-muted-foreground" />
                <span className="font-semibold text-accent">{selectedJobData.salary}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
                <span>Posted {selectedJobData.posted}</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Job Description</h3>
              <p className="text-muted-foreground leading-relaxed">{selectedJobData.description}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Requirements</h3>
              <ul className="space-y-2">
                {selectedJobData.requirements.map((req, index) => (
                  <li key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    {req}
                  </li>
                ))}
              </ul>
            </div>
            
            <Button 
              className="w-full bg-gradient-primary text-lg py-6"
              onClick={() => handleApply(selectedJobData.id)}
            >
              Apply Now
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Browse Jobs</h2>
        <div className="flex gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs, companies, locations..."
              className="pl-10 w-80"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="grid gap-6">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-all duration-300 cursor-pointer">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <CardDescription className="text-base font-medium text-foreground flex items-center mt-1">
                    <Building className="mr-2 h-4 w-4" />
                    {job.company}
                  </CardDescription>
                </div>
                <Badge variant="secondary">{job.type}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    {job.location}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold text-accent">{job.salary}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="mr-2 h-4 w-4" />
                    Posted {job.posted}
                  </div>
                </div>
                
                <p className="text-muted-foreground">{job.summary}</p>
                
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    onClick={() => setSelectedJob(job.id)}
                  >
                    View Details
                  </Button>
                  <Button 
                    className="bg-gradient-primary"
                    onClick={() => handleApply(job.id)}
                  >
                    Quick Apply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No jobs found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}