import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Search, 
  Phone, 
  Mail, 
  ExternalLink, 
  Filter,
  Star,
  User,
  Briefcase
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// COMMENT: Fetch applicants from API
// fetch('YOUR_BACKEND_URL/api/recruiter/applicants')

// MOCK RESPONSE
const applicants = [
  {
    id: 'app1',
    name: 'John Doe',
    phone: '9876543210',
    email: 'john@example.com',
    resumeUrl: 'https://resume-link.com/johndoe.pdf',
    position: 'Frontend Developer',
    experience: '3 years',
    skills: ['React', 'JavaScript', 'CSS'],
    location: 'Bangalore',
    status: 'Under Review',
    matchScore: 92,
    appliedDate: '2024-01-15',
    expectedSalary: '8-12 LPA'
  },
  {
    id: 'app2',
    name: 'Sarah Johnson',
    phone: '8765432109',
    email: 'sarah.j@example.com',
    resumeUrl: 'https://resume-link.com/sarahj.pdf',
    position: 'Backend Developer',
    experience: '5 years',
    skills: ['Node.js', 'Python', 'MongoDB'],
    location: 'Mumbai',
    status: 'Interviewed',
    matchScore: 88,
    appliedDate: '2024-01-12',
    expectedSalary: '12-15 LPA'
  },
  {
    id: 'app3',
    name: 'Mike Chen',
    phone: '7654321098',
    email: 'mike.chen@example.com',
    resumeUrl: 'https://resume-link.com/mikec.pdf',
    position: 'UX Designer',
    experience: '2 years',
    skills: ['Figma', 'Design Systems', 'User Research'],
    location: 'Remote',
    status: 'Applied',
    matchScore: 85,
    appliedDate: '2024-01-18',
    expectedSalary: '6-9 LPA'
  },
  {
    id: 'app4',
    name: 'Emily Rodriguez',
    phone: '6543210987',
    email: 'emily.r@example.com',
    resumeUrl: 'https://resume-link.com/emilyr.pdf',
    position: 'Product Manager',
    experience: '4 years',
    skills: ['Product Strategy', 'Agile', 'Analytics'],
    location: 'Delhi',
    status: 'Shortlisted',
    matchScore: 94,
    appliedDate: '2024-01-10',
    expectedSalary: '15-18 LPA'
  }
];

export function ApplicantManagement() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [positionFilter, setPositionFilter] = useState('all');

  const filteredApplicants = applicants.filter(applicant => {
    const matchesSearch = 
      applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
      applicant.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || applicant.status === statusFilter;
    const matchesPosition = positionFilter === 'all' || applicant.position === positionFilter;
    
    return matchesSearch && matchesStatus && matchesPosition;
  });

  const handleContact = (applicant: typeof applicants[0]) => {
    toast({
      title: "Contact Initiated",
      description: `Initiating contact with ${applicant.name} at ${applicant.phone}`,
    });
  };

  const handleEmail = (applicant: typeof applicants[0]) => {
    window.open(`mailto:${applicant.email}?subject=Regarding your application for ${applicant.position}`);
  };

  const handleViewResume = (applicant: typeof applicants[0]) => {
    // In a real app, this would open the resume URL
    toast({
      title: "Resume Viewer",
      description: `Opening resume for ${applicant.name}`,
    });
  };

  const updateStatus = (applicantId: string, newStatus: string) => {
    toast({
      title: "Status Updated",
      description: `Applicant status updated to: ${newStatus}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-800';
      case 'Under Review': return 'bg-yellow-100 text-yellow-800';
      case 'Interviewed': return 'bg-purple-100 text-purple-800';
      case 'Shortlisted': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const uniquePositions = [...new Set(applicants.map(app => app.position))];
  const uniqueStatuses = [...new Set(applicants.map(app => app.status))];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Applicant Management</h2>
        <div className="text-sm text-muted-foreground">
          {filteredApplicants.length} of {applicants.length} applicants
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, position, or skills..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {uniqueStatuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={positionFilter} onValueChange={setPositionFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Positions</SelectItem>
                {uniquePositions.map(position => (
                  <SelectItem key={position} value={position}>{position}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applicants List */}
      <div className="grid gap-4">
        {filteredApplicants.map((applicant) => (
          <Card key={applicant.id} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                    {applicant.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{applicant.name}</h3>
                    <p className="text-muted-foreground flex items-center">
                      <Briefcase className="mr-1 h-4 w-4" />
                      Applied for: {applicant.position}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {applicant.experience} experience • {applicant.location}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center mb-2">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-2xl font-bold text-primary">{applicant.matchScore}%</span>
                  </div>
                  <div className="text-xs text-muted-foreground">AI Match Score</div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Contact Information</p>
                  <div className="space-y-1">
                    <div className="flex items-center text-sm">
                      <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                      {applicant.email}
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                      {applicant.phone}
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Skills</p>
                  <div className="flex flex-wrap gap-1">
                    {applicant.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Badge className={getStatusColor(applicant.status)}>
                    {applicant.status}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    Applied: {new Date(applicant.appliedDate).toLocaleDateString()}
                  </span>
                  <span className="text-sm font-medium text-accent">
                    Expected: {applicant.expectedSalary}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewResume(applicant)}
                  >
                    <ExternalLink className="mr-1 h-4 w-4" />
                    Resume
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleEmail(applicant)}
                  >
                    <Mail className="mr-1 h-4 w-4" />
                    Email
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-accent text-accent-foreground"
                    onClick={() => handleContact(applicant)}
                  >
                    <Phone className="mr-1 h-4 w-4" />
                    Contact
                  </Button>
                  <Select 
                    value={applicant.status} 
                    onValueChange={(value) => updateStatus(applicant.id, value)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Applied">Applied</SelectItem>
                      <SelectItem value="Under Review">Under Review</SelectItem>
                      <SelectItem value="Interviewed">Interviewed</SelectItem>
                      <SelectItem value="Shortlisted">Shortlisted</SelectItem>
                      <SelectItem value="Rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredApplicants.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No applicants found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}