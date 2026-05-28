import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface JobPostingFormProps {
  onSubmit?: (jobData: any) => void;
  onCancel?: () => void;
}

export function JobPostingForm({ onSubmit, onCancel }: JobPostingFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    experience: '',
    summary: '',
    location: '',
    salary: '',
    jobType: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create DTO and log as requested
    const jobPostDto = {
      recruiterId: 'recruiter123', // Mock recruiter ID
      title: formData.title,
      experience: formData.experience,
      summary: formData.summary,
      location: formData.location,
      salary: formData.salary,
      type: formData.jobType,
      postedAt: new Date().toISOString(),
    };
    
    console.log('Job Posting DTO:', jobPostDto);
    
    // COMMENT: Send job post data to backend
    // fetch('YOUR_BACKEND_URL/api/recruiter/job', { 
    //   method: 'POST', 
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(jobPostDto) 
    // })
    
    toast({
      title: "Job Posted Successfully!",
      description: "Your job posting has been created and is now live.",
    });
    
    onSubmit?.(jobPostDto);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add New Job Posting</CardTitle>
        <CardDescription>
          Create a new job listing to attract qualified candidates
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title*</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              placeholder="e.g. Frontend Developer"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="experience">Experience Required*</Label>
            <Input
              id="experience"
              value={formData.experience}
              onChange={(e) => handleInputChange('experience', e.target.value)}
              placeholder="e.g. 2+ years, Fresher, 3-5 years"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Job Summary*</Label>
            <Textarea
              id="summary"
              value={formData.summary}
              onChange={(e) => handleInputChange('summary', e.target.value)}
              placeholder="Describe the role, responsibilities, and requirements..."
              className="min-h-[120px]"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location*</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g. Remote, Bangalore, Mumbai"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salary">Salary*</Label>
              <Input
                id="salary"
                value={formData.salary}
                onChange={(e) => handleInputChange('salary', e.target.value)}
                placeholder="e.g. 5-8 LPA, 50-80K"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobType">Job Type*</Label>
            <Select value={formData.jobType} onValueChange={(value) => handleInputChange('jobType', value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select job type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Internship">Internship</SelectItem>
                <SelectItem value="Freelance">Freelance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1 bg-gradient-primary">
              Post Job
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}