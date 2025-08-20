"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface FormData {
  name: string;
  email: string;
  company: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  newsletter: boolean;
}

const projectTypes = [
  { value: "mobile-app", label: "Mobile App Development" },
  { value: "ai-chatbot", label: "AI Agent/Chatbot" },
  { value: "web-app", label: "Web Application" },
  { value: "automation", label: "Automation Solution" },
  { value: "consultation", label: "Technical Consultation" },
  { value: "other", label: "Other" },
];

const budgetRanges = [
  { value: "under-5k", label: "Under $5,000" },
  { value: "5k-15k", label: "$5,000 - $15,000" },
  { value: "15k-50k", label: "$15,000 - $50,000" },
  { value: "50k-plus", label: "$50,000+" },
  { value: "discuss", label: "Let's discuss" },
];

const timelineOptions = [
  { value: "asap", label: "ASAP" },
  { value: "1-month", label: "Within 1 month" },
  { value: "1-3-months", label: "1-3 months" },
  { value: "3-6-months", label: "3-6 months" },
  { value: "6-plus-months", label: "6+ months" },
  { value: "flexible", label: "Flexible" },
];

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
    newsletter: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.projectType) {
      newErrors.projectType = "Please select a project type";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message should be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Form submitted:', formData);
      
      setSubmitStatus('success');
      
      // Reset form on success
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        projectType: "",
        budget: "",
        timeline: "",
        message: "",
        newsletter: false,
      });
      setErrors({});
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Project Inquiry Form</CardTitle>
      </CardHeader>
      <CardContent>
        {submitStatus === 'success' && (
          <Alert className="mb-6 border-green-200 bg-green-50 text-green-800">
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Thank you for your message! I'll get back to you within 24 hours.
            </AlertDescription>
          </Alert>
        )}

        {submitStatus === 'error' && (
          <Alert className="mb-6 border-red-200 bg-red-50 text-red-800">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Sorry, there was an error sending your message. Please try again or contact me directly.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="John Doe"
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="john@example.com"
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Company/Organization</Label>
              <Input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                placeholder="Your Company Name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          {/* Project Information */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="projectType">Project Type *</Label>
              <Select
                value={formData.projectType}
                onValueChange={(value) => handleInputChange('projectType', value)}
              >
                <SelectTrigger className={errors.projectType ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select project type" />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.projectType && (
                <p className="text-sm text-red-500">{errors.projectType}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range</Label>
              <Select
                value={formData.budget}
                onValueChange={(value) => handleInputChange('budget', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select budget range" />
                </SelectTrigger>
                <SelectContent>
                  {budgetRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeline">Timeline</Label>
              <Select
                value={formData.timeline}
                onValueChange={(value) => handleInputChange('timeline', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select timeline" />
                </SelectTrigger>
                <SelectContent>
                  {timelineOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Project Description *</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="Tell me about your project requirements, goals, and any specific features you need..."
              rows={6}
              className={errors.message ? "border-red-500" : ""}
            />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message}</p>
            )}
            <p className="text-sm text-muted-foreground">
              {formData.message.length}/500 characters (minimum 10)
            </p>
          </div>

          {/* Newsletter Checkbox */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="newsletter"
              checked={formData.newsletter}
              onCheckedChange={(checked) => handleInputChange('newsletter', checked as boolean)}
            />
            <Label htmlFor="newsletter" className="text-sm">
              Subscribe to my newsletter for development tips and industry insights
            </Label>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Message...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </>
            )}
          </Button>

          <p className="text-sm text-muted-foreground text-center">
            I'll get back to you within 24 hours. For urgent matters, please{" "}
            <a href="https://wa.me/your-number" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              WhatsApp me directly
            </a>.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}