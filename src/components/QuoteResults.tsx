
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { QuoteFormData, QuoteResult } from '@/types/quote';
import { formatCurrency } from '@/utils/formatters';

interface QuoteResultsProps {
  quote: QuoteResult;
  formData: QuoteFormData;
  onReset: () => void;
}

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

const websiteTypeLabels = {
  informational: 'Informational Website',
  ecommerce: 'E-commerce Website',
  blog: 'Blog Website',
  portfolio: 'Portfolio Website',
  custom: 'Custom Website',
};

const designComplexityLabels = {
  basic: 'Basic Design',
  standard: 'Standard Design',
  premium: 'Premium Design',
  custom: 'Custom Design',
};

const timelineLabels = {
  standard: 'Standard Timeline',
  expedited: 'Expedited Timeline (+25%)',
  rush: 'Rush Timeline (+50%)',
};

const QuoteResults = ({ quote, formData, onReset }: QuoteResultsProps) => {
  const selectedFeatures = Object.entries(formData.features)
    .filter(([_, value]) => value)
    .map(([key, _]) => featureLabels[key as keyof typeof featureLabels]);

  return (
    <div className="space-y-8 animate-fade-in">
      <Card className="w-full shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Your Website Quote</CardTitle>
          <CardDescription className="text-lg">
            Here's a detailed breakdown of your website project cost
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold gradient-text mb-2">{formatCurrency(quote.totalPrice)}</h2>
            <p className="text-muted-foreground">Estimated completion time: {quote.estimatedTimeInWeeks} weeks</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold gradient-text">Project Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Website Type:</span>
                  <span>{websiteTypeLabels[formData.websiteType]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Design:</span>
                  <span>{designComplexityLabels[formData.designComplexity]}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Pages:</span>
                  <span>{formData.pageCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Timeline:</span>
                  <span>{timelineLabels[formData.timeline]}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold gradient-text">Cost Breakdown</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">Base Cost:</span>
                  <span>{formatCurrency(quote.basePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Design:</span>
                  <span>{formatCurrency(quote.designPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Features:</span>
                  <span>{formatCurrency(quote.featuresPrice)}</span>
                </div>
                {formData.timeline !== 'standard' && (
                  <div className="flex justify-between text-brand-purple">
                    <span className="font-medium">Timeline Factor:</span>
                    <span>{(quote.timelineMultiplier * 100 - 100).toFixed(0)}%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-xl font-semibold gradient-text">Selected Features</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {selectedFeatures.map((feature, index) => (
                <div key={index} className="bg-muted rounded-md px-3 py-1.5 text-sm">
                  {feature}
                </div>
              ))}
              {selectedFeatures.length === 0 && (
                <div className="col-span-full text-muted-foreground">No additional features selected</div>
              )}
            </div>
          </div>
          
          <div className="rounded-lg bg-muted p-4">
            <h3 className="text-lg font-medium mb-2">Next Steps</h3>
            <p className="text-muted-foreground">
              This is an estimate based on the information provided. For a detailed proposal and 
              to discuss your project further, please contact our team. We'd love to help bring your 
              website vision to life!
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-4">
          <Button onClick={onReset} variant="outline" className="w-full sm:w-auto">
            Create New Quote
          </Button>
          <Button className="w-full sm:w-auto bg-gradient-to-r from-brand-blue to-brand-purple hover:opacity-90">
            Contact Us
          </Button>
        </CardFooter>
      </Card>
      
      <Card className="border-dashed">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium leading-none mb-1">Name</p>
              <p className="text-sm text-muted-foreground">{formData.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium leading-none mb-1">Email</p>
              <p className="text-sm text-muted-foreground">{formData.email}</p>
            </div>
            {formData.phone && (
              <div>
                <p className="text-sm font-medium leading-none mb-1">Phone</p>
                <p className="text-sm text-muted-foreground">{formData.phone}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuoteResults;
