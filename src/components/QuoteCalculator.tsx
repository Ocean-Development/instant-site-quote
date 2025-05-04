
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { QuoteFormData, QuoteResult } from '@/types/quote';
import { calculateQuote } from '@/utils/quoteCalculator';
import { useToast } from '@/components/ui/use-toast';
import QuoteResults from './QuoteResults';

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  websiteType: z.enum(['informational', 'ecommerce', 'blog', 'portfolio', 'custom']),
  designComplexity: z.enum(['basic', 'standard', 'premium', 'custom']),
  pageCount: z.number().min(1, 'Minimum 1 page required').max(100, 'Please contact us directly for websites with more than 100 pages'),
  features: z.object({
    contactForm: z.boolean().default(false),
    userAccounts: z.boolean().default(false),
    paymentProcessing: z.boolean().default(false),
    contentManagement: z.boolean().default(false),
    seo: z.boolean().default(false),
    analytics: z.boolean().default(false),
    socialMediaIntegration: z.boolean().default(false),
    responsiveDesign: z.boolean().default(true),
    customEmailAddresses: z.boolean().default(false),
    blog: z.boolean().default(false),
  }),
  timeline: z.enum(['standard', 'expedited', 'rush']),
  additionalInfo: z.string().optional(),
});

const featureLabels = {
  contactForm: 'Contact Form',
  userAccounts: 'User Accounts',
  paymentProcessing: 'Payment Processing',
  contentManagement: 'Content Management System',
  seo: 'Search Engine Optimization',
  analytics: 'Analytics Integration',
  socialMediaIntegration: 'Social Media Integration',
  responsiveDesign: 'Responsive Design',
  customEmailAddresses: 'Custom Email Addresses',
  blog: 'Blog Functionality',
};

const QuoteCalculator = () => {
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      websiteType: 'informational',
      designComplexity: 'standard',
      pageCount: 5,
      features: {
        contactForm: true,
        userAccounts: false,
        paymentProcessing: false,
        contentManagement: false,
        seo: true,
        analytics: true,
        socialMediaIntegration: false,
        responsiveDesign: true,
        customEmailAddresses: false,
        blog: false,
      },
      timeline: 'standard',
      additionalInfo: '',
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formattedData: QuoteFormData = {
      ...data,
    };
    
    const result = calculateQuote(formattedData);
    setQuoteResult(result);
    
    toast({
      title: "Quote Generated!",
      description: "Your website quote has been calculated.",
    });
  };

  const resetForm = () => {
    form.reset();
    setQuoteResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {!quoteResult ? (
        <Card className="w-full shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold">Website Quote Calculator</CardTitle>
            <CardDescription className="text-lg">
              Fill in the details below to get an instant quote for your website project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold gradient-text">Contact Information</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="sm:col-span-2">
                            <FormLabel>Phone (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="Your phone number" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold gradient-text">Website Requirements</h3>
                    <FormField
                      control={form.control}
                      name="websiteType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website Type</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-2 gap-4 sm:grid-cols-5"
                            >
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="informational" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">Informational</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="ecommerce" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">E-commerce</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="blog" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">Blog</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="portfolio" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">Portfolio</FormLabel>
                              </FormItem>
                              <FormItem className="flex items-center space-x-2 space-y-0">
                                <FormControl>
                                  <RadioGroupItem value="custom" />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">Custom</FormLabel>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="designComplexity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Design Complexity</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select design complexity" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="basic">Basic - Simple layout with minimal customization</SelectItem>
                              <SelectItem value="standard">Standard - Custom design with moderate interactivity</SelectItem>
                              <SelectItem value="premium">Premium - Unique design with animations and advanced effects</SelectItem>
                              <SelectItem value="custom">Custom - Completely bespoke design and functionality</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="pageCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Pages: {field.value}</FormLabel>
                          <FormControl>
                            <Slider
                              min={1}
                              max={30}
                              step={1}
                              defaultValue={[field.value]}
                              onValueChange={(values) => field.onChange(values[0])}
                            />
                          </FormControl>
                          <FormDescription>
                            Drag the slider to select the number of pages
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold gradient-text">Features</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {Object.entries(featureLabels).map(([key, label]) => (
                        <FormField
                          key={key}
                          control={form.control}
                          name={`features.${key as keyof typeof featureLabels}`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel className="cursor-pointer">{label}</FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold gradient-text">Timeline</h3>
                    <FormField
                      control={form.control}
                      name="timeline"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
                            >
                              <FormItem className="flex flex-col items-center space-y-3 rounded-md border p-4">
                                <FormControl>
                                  <RadioGroupItem value="standard" className="sr-only" />
                                </FormControl>
                                <div className={`rounded-full p-2 ${field.value === 'standard' ? 'bg-brand-blue text-white' : 'bg-muted'}`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                </div>
                                <FormLabel className={`font-medium text-base ${field.value === 'standard' ? 'text-brand-blue' : ''}`}>Standard</FormLabel>
                                <FormDescription className="text-center">Regular timeline with standard milestone delivery</FormDescription>
                              </FormItem>
                              <FormItem className="flex flex-col items-center space-y-3 rounded-md border p-4">
                                <FormControl>
                                  <RadioGroupItem value="expedited" className="sr-only" />
                                </FormControl>
                                <div className={`rounded-full p-2 ${field.value === 'expedited' ? 'bg-brand-purple text-white' : 'bg-muted'}`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                                </div>
                                <FormLabel className={`font-medium text-base ${field.value === 'expedited' ? 'text-brand-purple' : ''}`}>Expedited</FormLabel>
                                <FormDescription className="text-center">Faster timeline with prioritized development (+25%)</FormDescription>
                              </FormItem>
                              <FormItem className="flex flex-col items-center space-y-3 rounded-md border p-4">
                                <FormControl>
                                  <RadioGroupItem value="rush" className="sr-only" />
                                </FormControl>
                                <div className={`rounded-full p-2 ${field.value === 'rush' ? 'bg-brand-indigo text-white' : 'bg-muted'}`}>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                                </div>
                                <FormLabel className={`font-medium text-base ${field.value === 'rush' ? 'text-brand-indigo' : ''}`}>Rush</FormLabel>
                                <FormDescription className="text-center">Urgent timeline with dedicated team and fastest delivery (+50%)</FormDescription>
                              </FormItem>
                            </RadioGroup>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold gradient-text">Additional Information</h3>
                    <FormField
                      control={form.control}
                      name="additionalInfo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Any other details you'd like to share?</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us more about your project requirements..."
                              {...field}
                              className="min-h-[100px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-gradient-to-r from-brand-blue to-brand-purple hover:opacity-90">
                  Generate Quote
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        <QuoteResults quote={quoteResult} formData={form.getValues()} onReset={resetForm} />
      )}
    </div>
  );
};

export default QuoteCalculator;
