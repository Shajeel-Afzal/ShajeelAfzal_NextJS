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
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Video, Phone, MessageCircle, CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface BookingFormData {
  name: string;
  email: string;
  company: string;
  consultationType: string;
  preferredDate: string;
  preferredTime: string;
  meetingType: string;
  projectDescription: string;
  timeline: string;
}

const consultationTypes = [
  { value: "ai-chatbot", label: "AI & Chatbot Development", duration: "45 min", price: "Free" },
  { value: "mobile-app", label: "Mobile App Development", duration: "45 min", price: "Free" },
  { value: "technical-audit", label: "Technical Audit & Review", duration: "60 min", price: "$150" },
  { value: "architecture-planning", label: "Architecture Planning", duration: "90 min", price: "$250" },
  { value: "general", label: "General Consultation", duration: "30 min", price: "Free" },
];

const meetingTypes = [
  { value: "video", label: "Video Call (Google Meet)", icon: Video },
  { value: "phone", label: "Phone Call", icon: Phone },
  { value: "whatsapp", label: "WhatsApp Call", icon: MessageCircle },
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
  "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM"
];

export function ConsultationBooking() {
  const [formData, setFormData] = useState<BookingFormData>({
    name: "",
    email: "",
    company: "",
    consultationType: "",
    preferredDate: "",
    preferredTime: "",
    meetingType: "",
    projectDescription: "",
    timeline: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const selectedConsultation = consultationTypes.find(
    (type) => type.value === formData.consultationType
  );

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call - replace with actual booking endpoint
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Consultation booking:', formData);
      setSubmitStatus('success');
      
      // Reset form on success
      setFormData({
        name: "",
        email: "",
        company: "",
        consultationType: "",
        preferredDate: "",
        preferredTime: "",
        meetingType: "",
        projectDescription: "",
        timeline: "",
      });
      
    } catch (error) {
      console.error('Booking error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Book Your Free Consultation
        </h2>
        <p className="text-lg text-muted-foreground">
          Let&apos;s discuss your project and explore how I can help bring your vision to life
        </p>
      </div>

      {/* Status Alerts */}
      {submitStatus === 'success' && (
        <Alert className="border-green-200 bg-green-50 text-green-800">
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Consultation booked successfully! You&apos;ll receive a confirmation email with meeting details shortly.
          </AlertDescription>
        </Alert>
      )}

      {submitStatus === 'error' && (
        <Alert className="border-red-200 bg-red-50 text-red-800">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Sorry, there was an error booking your consultation. Please try again or contact me directly.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Booking Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Consultation Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                  />
                </div>

                {/* Consultation Type */}
                <div className="space-y-2">
                  <Label htmlFor="consultationType">Consultation Type *</Label>
                  <Select
                    value={formData.consultationType}
                    onValueChange={(value) => handleInputChange('consultationType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select consultation type" />
                    </SelectTrigger>
                    <SelectContent>
                      {consultationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex justify-between items-center w-full">
                            <span>{type.label}</span>
                            <div className="flex gap-2 ml-4">
                              <Badge variant="outline" className="text-xs">
                                {type.duration}
                              </Badge>
                              <Badge variant={type.price === "Free" ? "default" : "secondary"} className="text-xs">
                                {type.price}
                              </Badge>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Date and Time Selection */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="preferredDate">Preferred Date *</Label>
                    <Input
                      id="preferredDate"
                      type="date"
                      min={today}
                      value={formData.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredTime">Preferred Time (PST) *</Label>
                    <Select
                      value={formData.preferredTime}
                      onValueChange={(value) => handleInputChange('preferredTime', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Meeting Type */}
                <div className="space-y-2">
                  <Label htmlFor="meetingType">Meeting Preference *</Label>
                  <Select
                    value={formData.meetingType}
                    onValueChange={(value) => handleInputChange('meetingType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select meeting type" />
                    </SelectTrigger>
                    <SelectContent>
                      {meetingTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center">
                            <type.icon className="w-4 h-4 mr-2" />
                            {type.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Project Description */}
                <div className="space-y-2">
                  <Label htmlFor="projectDescription">Project Description *</Label>
                  <Textarea
                    id="projectDescription"
                    value={formData.projectDescription}
                    onChange={(e) => handleInputChange('projectDescription', e.target.value)}
                    placeholder="Tell me about your project, goals, and any specific challenges you're facing..."
                    rows={4}
                    required
                  />
                </div>

                {/* Timeline */}
                <div className="space-y-2">
                  <Label htmlFor="timeline">Project Timeline</Label>
                  <Select
                    value={formData.timeline}
                    onValueChange={(value) => handleInputChange('timeline', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP</SelectItem>
                      <SelectItem value="1-month">Within 1 month</SelectItem>
                      <SelectItem value="1-3-months">1-3 months</SelectItem>
                      <SelectItem value="3-6-months">3-6 months</SelectItem>
                      <SelectItem value="6-plus-months">6+ months</SelectItem>
                      <SelectItem value="exploring">Just exploring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Booking..." : "Book Consultation"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Selected Consultation Info */}
          {selectedConsultation && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Consultation Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium">{selectedConsultation.label}</h4>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {selectedConsultation.duration}
                    </span>
                    <Badge variant={selectedConsultation.price === "Free" ? "default" : "secondary"}>
                      {selectedConsultation.price}
                    </Badge>
                  </div>
                </div>
                {formData.preferredDate && formData.preferredTime && (
                  <div className="pt-4 border-t">
                    <p className="text-sm font-medium">Scheduled for:</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(formData.preferredDate).toLocaleDateString()} at {formData.preferredTime} PST
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* What to Expect */}
          <Card>
            <CardHeader>
              <CardTitle>What to Expect</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-sm">Project Assessment</h4>
                  <p className="text-xs text-muted-foreground">
                    We&apos;ll review your requirements and technical needs
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-sm">Technical Recommendations</h4>
                  <p className="text-xs text-muted-foreground">
                    Get expert advice on technology stack and architecture
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-sm">Timeline & Budget</h4>
                  <p className="text-xs text-muted-foreground">
                    Realistic project timeline and cost estimates
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-sm">Next Steps</h4>
                  <p className="text-xs text-muted-foreground">
                    Clear roadmap for moving forward with your project
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}