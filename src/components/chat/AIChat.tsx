import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface AIChatProps {
  userRole: 'worker' | 'recruiter';
}

export function AIChat({ userRole }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: userRole === 'worker' 
        ? "Hello! I'm your AI Career Assistant. I can help you with job search, resume building, interview preparation, and career advice. What would you like to know?"
        : "Hello! I'm your AI Recruiter Assistant. I can help you write better job descriptions, screen candidates, and provide hiring insights. How can I assist you today?",
      role: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputMessage, userRole),
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  const getAIResponse = (message: string, role: 'worker' | 'recruiter'): string => {
    const lowerMessage = message.toLowerCase();

    if (role === 'worker') {
      if (lowerMessage.includes('resume')) {
        return "I'd be happy to help you with your resume! Here are some key tips:\n\n1. Keep it concise (1-2 pages)\n2. Use action verbs and quantify achievements\n3. Tailor it to each job application\n4. Include relevant skills and keywords\n\nWould you like me to help you with a specific section of your resume?";
      }
      if (lowerMessage.includes('interview')) {
        return "Great question! Here are some interview preparation tips:\n\n1. Research the company thoroughly\n2. Practice common questions (Tell me about yourself, Why this role?)\n3. Prepare STAR method examples\n4. Have questions ready for the interviewer\n5. Practice your elevator pitch\n\nWould you like me to help you practice answers to specific questions?";
      }
      if (lowerMessage.includes('job') || lowerMessage.includes('career')) {
        return "I can help you with your job search! Consider these strategies:\n\n1. Identify your target roles and companies\n2. Optimize your LinkedIn profile\n3. Network within your industry\n4. Apply to quality positions that match your skills\n5. Follow up on applications\n\nWhat specific aspect of job searching would you like to focus on?";
      }
    } else {
      if (lowerMessage.includes('job description')) {
        return "I can help you create compelling job descriptions! Here's what makes them effective:\n\n1. Clear, specific job title\n2. Engaging company overview\n3. Detailed responsibilities and requirements\n4. Information about benefits and culture\n5. Inclusive language\n\nWould you like me to help you write or review a specific job description?";
      }
      if (lowerMessage.includes('candidate') || lowerMessage.includes('hiring')) {
        return "Here are some best practices for candidate evaluation:\n\n1. Define clear evaluation criteria\n2. Use structured interviews\n3. Check references thoroughly\n4. Consider cultural fit alongside skills\n5. Provide timely feedback\n\nWhat specific aspect of the hiring process would you like to discuss?";
      }
      if (lowerMessage.includes('screen') || lowerMessage.includes('interview')) {
        return "Effective candidate screening involves:\n\n1. Phone/video screening for basic qualifications\n2. Skills assessment relevant to the role\n3. Behavioral interview questions\n4. Technical evaluation when applicable\n5. Reference checks\n\nWould you like help creating screening questions for a specific role?";
      }
    }

    return "I understand you're asking about " + message + ". Could you provide more specific details so I can give you more targeted advice? I'm here to help with all your " + (role === 'worker' ? 'career development' : 'recruitment') + " needs!";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        AI {userRole === 'worker' ? 'Career' : 'Recruiter'} Assistant
      </h2>
      
      <Card className="h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bot className="mr-2 h-5 w-5 text-primary" />
            Chat Assistant
          </CardTitle>
          <CardDescription>
            Get personalized {userRole === 'worker' ? 'career advice and job search help' : 'recruitment guidance and hiring insights'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 pr-4 mb-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.role === 'assistant' && (
                        <Bot className="h-4 w-4 mt-0.5 text-primary" />
                      )}
                      {message.role === 'user' && (
                        <User className="h-4 w-4 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Bot className="h-4 w-4 text-primary" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isLoading || !inputMessage.trim()}
              className="bg-gradient-primary"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}