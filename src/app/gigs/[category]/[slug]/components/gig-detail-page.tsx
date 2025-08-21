"use client";

import { useState } from "react";
import { 
  Star, Clock, Users, CheckCircle, MessageCircle, 
  ShoppingCart, Info, ChevronDown, ChevronUp, Play, FileText, Image as ImageIcon,
  Brain, Bot, Smartphone, Globe, Server, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const iconMap = {
  Brain: Brain,
  Bot: Bot, 
  Smartphone: Smartphone,
  Globe: Globe,
  Server: Server,
  Zap: Zap,
};

interface SerializableGig {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  status: 'draft' | 'published' | 'paused' | 'archived';
  createdAt: Date;
  updatedAt: Date;
  pricingModel: 'fixed' | 'hourly' | 'monthly';
  basicTier: any;
  standardTier: any; 
  premiumTier: any;
  addOns: any[];
  mediaGallery: any[];
  faqs: any[];
  requirements: string[];
  seoTitle: string;
  seoDescription: string;
  deliveryTime: number;
  revisionCount: number;
  orderCount: number;
  averageRating: number;
  reviewCount: number;
  reviews: any[];
  icon: string; // Icon name instead of component
  featured: boolean;
  startingPrice: number;
}

interface SerializableCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string; // Icon name instead of component
  gigCount: number;
  featured: boolean;
}

interface GigDetailPageProps {
  gig: SerializableGig;
  category: SerializableCategory;
}

export function GigDetailPage({ gig, category }: GigDetailPageProps) {
  const [selectedTier, setSelectedTier] = useState<'basic' | 'standard' | 'premium'>('standard');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [expandedFAQs, setExpandedFAQs] = useState<Set<string>>(new Set());

  // Get icon components from mapping
  const GigIcon = iconMap[gig.icon as keyof typeof iconMap] || Brain;
  const CategoryIcon = iconMap[category.icon as keyof typeof iconMap] || Brain;

  const currentTier = gig[`${selectedTier}Tier`];
  const totalPrice = currentTier.price + selectedAddOns.reduce((sum, addOnId) => {
    const addOn = gig.addOns.find(a => a.id === addOnId);
    return sum + (addOn?.price || 0);
  }, 0);

  const toggleFAQ = (faqId: string) => {
    const newExpanded = new Set(expandedFAQs);
    if (newExpanded.has(faqId)) {
      newExpanded.delete(faqId);
    } else {
      newExpanded.add(faqId);
    }
    setExpandedFAQs(newExpanded);
  };

  const toggleAddOn = (addOnId: string) => {
    if (selectedAddOns.includes(addOnId)) {
      setSelectedAddOns(prev => prev.filter(id => id !== addOnId));
    } else {
      setSelectedAddOns(prev => [...prev, addOnId]);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30 py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/gigs" className="hover:text-primary">All Services</Link>
            <span>/</span>
            <Link href={`/gigs/${category.slug}`} className="hover:text-primary">{category.name}</Link>
            <span>/</span>
            <span className="text-foreground">{gig.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <GigIcon className="h-8 w-8 text-primary" />
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{category.name}</Badge>
                  {gig.featured && (
                    <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>
                  )}
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{gig.title}</h1>
              
              <div className="flex items-center gap-6 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-foreground">{gig.averageRating}</span>
                  <span>({gig.reviewCount} reviews)</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{gig.orderCount} orders</span>
                </div>
                
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{gig.deliveryTime} days delivery</span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground">{gig.description}</p>
            </div>

            {/* Media Gallery */}
            {gig.mediaGallery.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio & Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {gig.mediaGallery.map((media) => (
                      <div key={media.id} className="group relative bg-muted rounded-lg p-8 flex items-center justify-center">
                        {media.type === 'image' && <ImageIcon className="h-12 w-12 text-muted-foreground" />}
                        {media.type === 'video' && <Play className="h-12 w-12 text-muted-foreground" />}
                        {media.type === 'pdf' && <FileText className="h-12 w-12 text-muted-foreground" />}
                        <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <span className="text-white text-sm font-medium">{media.title}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    * Portfolio examples and project screenshots would be displayed here
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Service Details Tabs */}
            <Card>
              <CardContent className="p-0">
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">Description</TabsTrigger>
                    <TabsTrigger value="requirements">Requirements</TabsTrigger>
                    <TabsTrigger value="faqs">FAQs</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="p-6">
                    <h3 className="font-semibold mb-3">What you&apos;ll get:</h3>
                    <ul className="space-y-2">
                      {currentTier.deliverables.map((deliverable: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{deliverable}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6">
                      <h4 className="font-medium mb-2">Tags:</h4>
                      <div className="flex flex-wrap gap-2">
                        {gig.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="requirements" className="p-6">
                    <h3 className="font-semibold mb-3">To get started, I need:</h3>
                    <ul className="space-y-2">
                      {gig.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Info className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  
                  <TabsContent value="faqs" className="p-6">
                    <div className="space-y-4">
                      {gig.faqs.map((faq) => (
                        <div key={faq.id} className="border rounded-lg">
                          <button
                            onClick={() => toggleFAQ(faq.id)}
                            className="w-full p-4 text-left flex items-center justify-between hover:bg-muted/50"
                          >
                            <span className="font-medium">{faq.question}</span>
                            {expandedFAQs.has(faq.id) ? (
                              <ChevronUp className="h-5 w-5" />
                            ) : (
                              <ChevronDown className="h-5 w-5" />
                            )}
                          </button>
                          {expandedFAQs.has(faq.id) && (
                            <div className="px-4 pb-4 text-muted-foreground">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Reviews Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  Reviews ({gig.reviewCount})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {gig.reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-sm font-medium">{review.clientName.charAt(0)}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">{review.clientName}</span>
                            {review.verified && (
                              <Badge variant="outline" className="text-xs">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                          <span className="text-xs text-muted-foreground">
                            {review.createdAt.toLocaleDateString()} • {review.projectType}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {gig.reviewCount > 3 && (
                    <Button variant="outline" className="w-full">
                      View all {gig.reviewCount} reviews
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pricing Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <Card>
                <CardHeader>
                  <CardTitle>Choose your package</CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Tier Selector */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {(['basic', 'standard', 'premium'] as const).map((tier) => (
                      <button
                        key={tier}
                        onClick={() => setSelectedTier(tier)}
                        className={`p-3 rounded-lg border text-center transition-colors ${
                          selectedTier === tier
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="font-medium capitalize">{tier}</div>
                        <div className="text-sm text-muted-foreground">
                          ${gig[`${tier}Tier`].price.toLocaleString()}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Selected Tier Details */}
                  <div className="mb-6">
                    <h3 className="font-semibold text-lg mb-2">{currentTier.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{currentTier.description}</p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{currentTier.deliveryTimeInDays} days delivery</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4" />
                        <span>{currentTier.revisions} revisions</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      {currentTier.deliverables.slice(0, 3).map((deliverable: string, index: number) => (
                        <div key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{deliverable}</span>
                        </div>
                      ))}
                      {currentTier.deliverables.length > 3 && (
                        <div className="text-sm text-muted-foreground">
                          +{currentTier.deliverables.length - 3} more features...
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Add-ons */}
                  {gig.addOns.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-medium mb-3">Add-ons</h4>
                      <div className="space-y-3">
                        {gig.addOns.map((addOn) => (
                          <div key={addOn.id} className="flex items-start gap-3">
                            <input
                              type="checkbox"
                              id={addOn.id}
                              checked={selectedAddOns.includes(addOn.id)}
                              onChange={() => toggleAddOn(addOn.id)}
                              className="mt-1"
                            />
                            <div className="flex-1">
                              <label htmlFor={addOn.id} className="text-sm font-medium cursor-pointer">
                                {addOn.name}
                              </label>
                              <p className="text-xs text-muted-foreground">{addOn.description}</p>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                <span>+${addOn.price}</span>
                                <span>•</span>
                                <span>+{addOn.deliveryTimeInDays} days</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Separator className="my-6" />

                  {/* Total and CTA */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Total:</span>
                      <span className="text-2xl font-bold">${totalPrice.toLocaleString()}</span>
                    </div>
                    
                    <Button className="w-full" size="lg">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      Continue (${totalPrice.toLocaleString()})
                    </Button>
                    
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="h-5 w-5 mr-2" />
                      Contact Seller
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Seller Info */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>About the Seller</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="font-medium">SA</span>
                    </div>
                    <div>
                      <div className="font-medium">Shajeel Afzal</div>
                      <div className="text-sm text-muted-foreground">Level 2 Seller</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">From</div>
                      <div className="font-medium">Pakistan</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Response time</div>
                      <div className="font-medium">1 hour</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Languages</div>
                      <div className="font-medium">English, Urdu</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Last delivery</div>
                      <div className="font-medium">1 day</div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full mt-4">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}