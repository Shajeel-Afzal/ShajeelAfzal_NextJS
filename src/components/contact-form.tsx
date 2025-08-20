'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Send,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  contactPreference: 'email' | 'phone' | 'whatsapp';
  phone?: string;
}

interface FormState {
  isSubmitting: boolean;
  submitted: boolean;
  error: string | null;
}

export function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    contactPreference: 'email',
    phone: ''
  });

  const [formState, setFormState] = useState<FormState>({
    isSubmitting: false,
    submitted: false,
    error: null
  });

  const [errors, setErrors] = useState<Partial<ContactFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactFormData> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    // Phone validation (if phone is preferred contact method)
    if (formData.contactPreference === 'phone' || formData.contactPreference === 'whatsapp') {
      if (!formData.phone?.trim()) {
        newErrors.phone = 'Phone number is required for this contact preference';
      } else if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setFormState({ isSubmitting: true, submitted: false, error: null });

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically make an API call to your backend
      // For now, we'll simulate a successful submission
      console.log('Form submitted:', formData);
      
      setFormState({ isSubmitting: false, submitted: true, error: null });
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        contactPreference: 'email',
        phone: ''
      });
      setErrors({});
      
    } catch (error) {
      setFormState({ 
        isSubmitting: false, 
        submitted: false, 
        error: 'Failed to send message. Please try again or contact me directly.' 
      });
    }
  };

  const handleInputChange = (
    field: keyof ContactFormData,
    value: string
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (formState.submitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-xl font-semibold">Message Sent Successfully!</h3>
            <p className="text-muted-foreground">
              Thank you for your message. I'll get back to you within 24 hours.
            </p>
            <Button 
              onClick={() => setFormState({ isSubmitting: false, submitted: false, error: null })}
              variant="outline"
            >
              Send Another Message
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
      {/* Contact Form */}
      <Card>
        <CardHeader>
          <CardTitle>Send Me a Message</CardTitle>
          <CardDescription>
            I'd love to hear about your project. Fill out the form below and I'll get back to you soon.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formState.error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{formState.error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={errors.name ? 'border-red-500' : ''}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                placeholder="What's this about?"
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                className={errors.subject ? 'border-red-500' : ''}
              />
              {errors.subject && <p className="text-sm text-red-500">{errors.subject}</p>}
            </div>

            <div className="space-y-2">
              <Label>Preferred Contact Method</Label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="email"
                    checked={formData.contactPreference === 'email'}
                    onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                    className="text-primary"
                  />
                  <span>Email</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="phone"
                    checked={formData.contactPreference === 'phone'}
                    onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                    className="text-primary"
                  />
                  <span>Phone</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="whatsapp"
                    checked={formData.contactPreference === 'whatsapp'}
                    onChange={(e) => handleInputChange('contactPreference', e.target.value)}
                    className="text-primary"
                  />
                  <span>WhatsApp</span>
                </label>
              </div>
            </div>

            {(formData.contactPreference === 'phone' || formData.contactPreference === 'whatsapp') && (
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 123-4567"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={errors.phone ? 'border-red-500' : ''}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                placeholder="Tell me about your project, timeline, and how I can help..."
                rows={5}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                className={errors.message ? 'border-red-500' : ''}
              />
              {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={formState.isSubmitting}
            >
              {formState.isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Get In Touch</CardTitle>
            <CardDescription>
              Multiple ways to reach me for your project discussions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Email</p>
                <a 
                  href="mailto:hello@shajeelafzal.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  hello@shajeelafzal.com
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MessageCircle className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">WhatsApp</p>
                <a 
                  href="https://wa.me/your-number"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-muted-foreground">Pakistan (Remote Available)</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Response Time</p>
                <p className="text-muted-foreground">Within 24 hours</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why Work With Me?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Free initial consultation</li>
              <li>• Clear project timelines</li>
              <li>• Regular progress updates</li>
              <li>• Post-launch support</li>
              <li>• Competitive pricing</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}