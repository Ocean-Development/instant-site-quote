
import type { QuoteFormData, QuoteResult } from '@/types/quote';

export const calculateQuote = (data: QuoteFormData): QuoteResult => {
  // Base prices based on website type
  const basePrices = {
    informational: 1000,
    blog: 1500,
    portfolio: 1800,
    ecommerce: 3000,
    custom: 5000,
  };

  // Design complexity multipliers
  const designComplexityMultipliers = {
    basic: 0.8,
    standard: 1.0,
    premium: 1.5,
    custom: 2.0,
  };

  // Feature prices
  const featurePrices = {
    contactForm: 150,
    userAccounts: 800,
    paymentProcessing: 1200,
    contentManagement: 900,
    seo: 500,
    analytics: 300,
    socialMediaIntegration: 400,
    responsiveDesign: 700,
    customEmailAddresses: 250,
    blog: 600,
  };

  // Timeline multipliers
  const timelineMultipliers = {
    standard: 1.0,
    expedited: 1.25,
    rush: 1.5,
  };

  // Estimated time per website type (in weeks)
  const baseTimeEstimates = {
    informational: 2,
    blog: 3,
    portfolio: 3,
    ecommerce: 5,
    custom: 8,
  };

  // Calculate base price
  const basePrice = basePrices[data.websiteType];
  
  // Calculate design price based on complexity and page count
  let designPrice = basePrice * designComplexityMultipliers[data.designComplexity];
  
  // Add additional cost for extra pages
  const standardPages = 5;
  if (data.pageCount > standardPages) {
    designPrice += (data.pageCount - standardPages) * 100;
  }
  
  // Calculate features price
  let featuresPrice = 0;
  let featuresBreakdown: Record<string, number> = {};
  
  Object.entries(data.features).forEach(([feature, isSelected]) => {
    if (isSelected) {
      const featureKey = feature as keyof typeof featurePrices;
      const price = featurePrices[featureKey];
      featuresPrice += price;
      featuresBreakdown[feature] = price;
    }
  });
  
  // Apply timeline multiplier
  const timelineMultiplier = timelineMultipliers[data.timeline];
  
  // Calculate total price
  const subtotal = basePrice + designPrice + featuresPrice;
  const totalPrice = Math.round(subtotal * timelineMultiplier);
  
  // Calculate estimated time
  let estimatedTimeInWeeks = baseTimeEstimates[data.websiteType];
  
  // Adjust time based on page count
  if (data.pageCount > standardPages) {
    estimatedTimeInWeeks += Math.ceil((data.pageCount - standardPages) / 5);
  }
  
  // Adjust time based on features
  const complexFeatures = ['userAccounts', 'paymentProcessing', 'contentManagement'];
  complexFeatures.forEach(feature => {
    if (data.features[feature as keyof typeof data.features]) {
      estimatedTimeInWeeks += 1;
    }
  });
  
  // Adjust time based on timeline
  if (data.timeline === 'expedited') {
    estimatedTimeInWeeks = Math.ceil(estimatedTimeInWeeks * 0.75);
  } else if (data.timeline === 'rush') {
    estimatedTimeInWeeks = Math.ceil(estimatedTimeInWeeks * 0.5);
  }
  
  return {
    basePrice,
    designPrice,
    featuresPrice,
    timelineMultiplier,
    totalPrice,
    breakdown: {
      base: basePrice,
      design: designPrice,
      features: featuresPrice,
      ...featuresBreakdown
    },
    estimatedTimeInWeeks
  };
};
