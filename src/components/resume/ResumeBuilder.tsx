import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Download, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Education {
  college: string;
  degree: string;
  year: string;
  cgpa: string;
}

interface Project {
  name: string;
  description: string;
  technologies: string;
  link?: string;
}

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
  };
  education: Education[];
  skills: string[];
  technologies: string[];
  projects: Project[];
  awards: string[];
  hobbies: string[];
  experience: string;
  summary: string;
}

export function ResumeBuilder() {
  const { toast } = useToast();
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: { name: '', email: '', phone: '', location: '' },
    education: [{ college: '', degree: '', year: '', cgpa: '' }],
    skills: [],
    technologies: [],
    projects: [{ name: '', description: '', technologies: '' }],
    awards: [],
    hobbies: [],
    experience: '',
    summary: ''
  });

  const [newSkill, setNewSkill] = useState('');
  const [newTechnology, setNewTechnology] = useState('');
  const [newAward, setNewAward] = useState('');
  const [newHobby, setNewHobby] = useState('');

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { college: '', degree: '', year: '', cgpa: '' }]
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', description: '', technologies: '' }]
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setResumeData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const addTechnology = () => {
    if (newTechnology.trim()) {
      setResumeData(prev => ({
        ...prev,
        technologies: [...prev.technologies, newTechnology.trim()]
      }));
      setNewTechnology('');
    }
  };

  const addAward = () => {
    if (newAward.trim()) {
      setResumeData(prev => ({
        ...prev,
        awards: [...prev.awards, newAward.trim()]
      }));
      setNewAward('');
    }
  };

  const addHobby = () => {
    if (newHobby.trim()) {
      setResumeData(prev => ({
        ...prev,
        hobbies: [...prev.hobbies, newHobby.trim()]
      }));
      setNewHobby('');
    }
  };

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const removeProject = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  const removeArrayItem = (field: keyof Pick<ResumeData, 'skills' | 'technologies' | 'awards' | 'hobbies'>, index: number) => {
    setResumeData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const generatePDF = () => {
    // Log DTO as requested
    console.log('Resume Data DTO:', resumeData);
    
    // COMMENT: Generate PDF HTML to PDF
    // This would integrate with a PDF generation service
    // Example: html2pdf, jsPDF, or backend PDF generation API
    
    toast({
      title: "Resume Generated!",
      description: "Your resume has been generated successfully.",
    });
  };

  const previewResume = () => {
    toast({
      title: "Preview Mode",
      description: "Resume preview functionality would open here.",
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Resume Builder</h2>
        <div className="flex gap-3">
          <Button variant="outline" onClick={previewResume}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button onClick={generatePDF} className="bg-gradient-primary">
            <Download className="mr-2 h-4 w-4" />
            Generate PDF
          </Button>
        </div>
      </div>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={resumeData.personalInfo.name}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, name: e.target.value }
                }))}
                placeholder="Your full name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, email: e.target.value }
                }))}
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={resumeData.personalInfo.phone}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, phone: e.target.value }
                }))}
                placeholder="+91 9876543210"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={resumeData.personalInfo.location}
                onChange={(e) => setResumeData(prev => ({
                  ...prev,
                  personalInfo: { ...prev.personalInfo, location: e.target.value }
                }))}
                placeholder="City, State"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="summary">Professional Summary</Label>
            <Textarea
              id="summary"
              value={resumeData.summary}
              onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
              placeholder="Brief summary about yourself..."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Education Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Education</CardTitle>
            <Button onClick={addEducation} size="sm" variant="outline">
              <Plus className="mr-1 h-4 w-4" />
              Add More
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {resumeData.education.map((edu, index) => (
            <div key={index} className="grid md:grid-cols-4 gap-4 p-4 border rounded-lg relative">
              {resumeData.education.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => removeEducation(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <div>
                <Label>College/University</Label>
                <Input
                  value={edu.college}
                  onChange={(e) => {
                    const newEducation = [...resumeData.education];
                    newEducation[index].college = e.target.value;
                    setResumeData(prev => ({ ...prev, education: newEducation }));
                  }}
                  placeholder="Institution name"
                />
              </div>
              <div>
                <Label>Degree</Label>
                <Input
                  value={edu.degree}
                  onChange={(e) => {
                    const newEducation = [...resumeData.education];
                    newEducation[index].degree = e.target.value;
                    setResumeData(prev => ({ ...prev, education: newEducation }));
                  }}
                  placeholder="B.Tech, M.Tech, etc."
                />
              </div>
              <div>
                <Label>Year</Label>
                <Input
                  value={edu.year}
                  onChange={(e) => {
                    const newEducation = [...resumeData.education];
                    newEducation[index].year = e.target.value;
                    setResumeData(prev => ({ ...prev, education: newEducation }));
                  }}
                  placeholder="2024"
                />
              </div>
              <div>
                <Label>CGPA/Percentage</Label>
                <Input
                  value={edu.cgpa}
                  onChange={(e) => {
                    const newEducation = [...resumeData.education];
                    newEducation[index].cgpa = e.target.value;
                    setResumeData(prev => ({ ...prev, education: newEducation }));
                  }}
                  placeholder="8.5 CGPA"
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Skills and Technologies */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill"
                onKeyPress={(e) => e.key === 'Enter' && addSkill()}
              />
              <Button onClick={addSkill} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {resumeData.skills.map((skill, index) => (
                <div key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full flex items-center gap-2">
                  {skill}
                  <button onClick={() => removeArrayItem('skills', index)}>
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technologies</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                value={newTechnology}
                onChange={(e) => setNewTechnology(e.target.value)}
                placeholder="Add a technology"
                onKeyPress={(e) => e.key === 'Enter' && addTechnology()}
              />
              <Button onClick={addTechnology} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {resumeData.technologies.map((tech, index) => (
                <div key={index} className="bg-accent/10 text-accent px-3 py-1 rounded-full flex items-center gap-2">
                  {tech}
                  <button onClick={() => removeArrayItem('technologies', index)}>
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Projects Section */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Projects</CardTitle>
            <Button onClick={addProject} size="sm" variant="outline">
              <Plus className="mr-1 h-4 w-4" />
              Add Project
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {resumeData.projects.map((project, index) => (
            <div key={index} className="p-4 border rounded-lg relative">
              {resumeData.projects.length > 1 && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => removeProject(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
              <div className="grid gap-4">
                <div>
                  <Label>Project Name</Label>
                  <Input
                    value={project.name}
                    onChange={(e) => {
                      const newProjects = [...resumeData.projects];
                      newProjects[index].name = e.target.value;
                      setResumeData(prev => ({ ...prev, projects: newProjects }));
                    }}
                    placeholder="Project title"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={project.description}
                    onChange={(e) => {
                      const newProjects = [...resumeData.projects];
                      newProjects[index].description = e.target.value;
                      setResumeData(prev => ({ ...prev, projects: newProjects }));
                    }}
                    placeholder="Describe your project..."
                  />
                </div>
                <div>
                  <Label>Technologies Used</Label>
                  <Input
                    value={project.technologies}
                    onChange={(e) => {
                      const newProjects = [...resumeData.projects];
                      newProjects[index].technologies = e.target.value;
                      setResumeData(prev => ({ ...prev, projects: newProjects }));
                    }}
                    placeholder="React, Node.js, MongoDB..."
                  />
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Awards and Hobbies */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Awards & Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                value={newAward}
                onChange={(e) => setNewAward(e.target.value)}
                placeholder="Add an award"
                onKeyPress={(e) => e.key === 'Enter' && addAward()}
              />
              <Button onClick={addAward} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              {resumeData.awards.map((award, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-success/10 rounded">
                  <span className="text-success-foreground">{award}</span>
                  <button onClick={() => removeArrayItem('awards', index)}>
                    <Trash2 className="h-4 w-4 text-muted-foreground" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hobbies & Interests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Input
                value={newHobby}
                onChange={(e) => setNewHobby(e.target.value)}
                placeholder="Add a hobby"
                onKeyPress={(e) => e.key === 'Enter' && addHobby()}
              />
              <Button onClick={addHobby} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {resumeData.hobbies.map((hobby, index) => (
                <div key={index} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full flex items-center gap-2">
                  {hobby}
                  <button onClick={() => removeArrayItem('hobbies', index)}>
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}