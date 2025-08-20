"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Send, Check, AlertCircle } from "lucide-react";
import { analytics } from "@/components/analytics";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: "",
    budget: "",
    timeline: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  useEffect(() => {
    analytics.contactForm.started();
  }, []);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const handleInputFocus = (field: string) => {
    analytics.contactForm.fieldFocused(field);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    analytics.contactForm.submitted(formData.projectType, formData.budget);
    
    if (!validateForm()) {
      analytics.contactForm.validationError("form", "Multiple validation errors");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // TODO: Replace with actual API integration
      console.log("Form submitted:", formData);
      
      analytics.contactForm.success();
      setSubmitStatus("success");
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        projectType: "",
        budget: "",
        timeline: "",
        message: "",
      });
    } catch (error) {
      console.error("Form submission error:", error);
      analytics.contactForm.error(error instanceof Error ? error.message : "Unknown error");
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name and Email */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Full Name *
          </label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            onFocus={() => handleInputFocus("name")}
            placeholder="John Doe"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email Address *
          </label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            onFocus={() => handleInputFocus("email")}
            placeholder="john@example.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="w-4 h-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Phone and Company */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-2">
            Phone Number
          </label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company/Organization
          </label>
          <Input
            id="company"
            type="text"
            value={formData.company}
            onChange={(e) => handleInputChange("company", e.target.value)}
            placeholder="Acme Inc."
          />
        </div>
      </div>

      {/* Project Type and Budget */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="projectType" className="block text-sm font-medium mb-2">
            Project Type
          </label>
          <Select value={formData.projectType} onValueChange={(value) => handleInputChange("projectType", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select project type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mobile-app">Mobile App Development</SelectItem>
              <SelectItem value="web-app">Web Application</SelectItem>
              <SelectItem value="ai-chatbot">AI Chatbot Development</SelectItem>
              <SelectItem value="ai-agent">AI Agent Development</SelectItem>
              <SelectItem value="automation">Automation Solutions</SelectItem>
              <SelectItem value="consultation">Consultation</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="budget" className="block text-sm font-medium mb-2">
            Budget Range
          </label>
          <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select budget range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="under-5k">Under $5,000</SelectItem>
              <SelectItem value="5k-15k">$5,000 - $15,000</SelectItem>
              <SelectItem value="15k-30k">$15,000 - $30,000</SelectItem>
              <SelectItem value="30k-50k">$30,000 - $50,000</SelectItem>
              <SelectItem value="50k-plus">$50,000+</SelectItem>
              <SelectItem value="discuss">Let&apos;s Discuss</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Timeline */}
      <div>
        <label htmlFor="timeline" className="block text-sm font-medium mb-2">
          Project Timeline
        </label>
        <Select value={formData.timeline} onValueChange={(value) => handleInputChange("timeline", value)}>
          <SelectTrigger>
            <SelectValue placeholder="When do you need this completed?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asap">ASAP</SelectItem>
            <SelectItem value="1-month">Within 1 month</SelectItem>
            <SelectItem value="2-3-months">2-3 months</SelectItem>
            <SelectItem value="3-6-months">3-6 months</SelectItem>
            <SelectItem value="6-plus-months">6+ months</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-2">
          Project Details *
        </label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) => handleInputChange("message", e.target.value)}
          placeholder="Tell me about your project, requirements, and any specific features you have in mind..."
          rows={6}
          className={errors.message ? "border-red-500" : ""}
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {errors.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full md:w-auto"
        size="lg"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent mr-2" />
            Sending Message...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </>
        )}
      </Button>

      {/* Status Messages */}
      {submitStatus === "success" && (
        <div className="flex items-center text-green-600 bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <Check className="w-5 h-5 mr-2" />
          <div>
            <p className="font-medium">Message sent successfully!</p>
            <p className="text-sm">I&apos;ll get back to you within 24 hours.</p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="flex items-center text-red-600 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <AlertCircle className="w-5 h-5 mr-2" />
          <div>
            <p className="font-medium">Something went wrong</p>
            <p className="text-sm">Please try again or contact me directly via email.</p>
          </div>
        </div>
      )}
    </form>
  );
}