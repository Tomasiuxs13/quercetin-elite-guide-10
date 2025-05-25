
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const benefitsList = [
  {
    title: "Autophagy Enhancement",
    description: "Spermidine is one of the most potent natural autophagy inducers. Autophagy is the cellular process of cleaning up damaged proteins and organelles, which naturally declines with age. By promoting autophagy, spermidine helps maintain cellular health and function.",
    details: "Research shows that spermidine can extend lifespan in various organisms by enhancing autophagy, suggesting it may have similar benefits for human longevity and healthspan."
  },
  {
    title: "Cardiovascular Health Support",
    description: "Studies indicate that spermidine may support heart health by improving cardiac function and reducing age-related cardiovascular decline. It may help maintain healthy blood pressure and support overall cardiovascular wellness.",
    details: "Clinical research has shown that higher dietary spermidine intake is associated with reduced cardiovascular disease risk and improved cardiac function in aging populations."
  },
  {
    title: "Cognitive Function Protection",
    description: "Spermidine may help protect brain health and cognitive function as we age. Research suggests it can support memory, learning, and overall brain performance by promoting cellular health in neural tissues.",
    details: "Animal studies have demonstrated that spermidine supplementation can improve memory formation and protect against age-related cognitive decline through autophagy enhancement in brain cells."
  },
  {
    title: "Cellular Longevity Support",
    description: "As a natural polyamine, spermidine plays crucial roles in cellular growth, development, and maintenance. It helps stabilize DNA, supports protein synthesis, and maintains cellular membrane integrity.",
    details: "Spermidine levels naturally decline with age, and supplementation may help restore cellular function and support healthy aging processes at the molecular level."
  },
  {
    title: "Metabolic Health Benefits",
    description: "Research suggests that spermidine may support healthy metabolism and energy production. It may help maintain healthy blood sugar levels and support mitochondrial function for optimal cellular energy.",
    details: "Studies have shown that spermidine can improve glucose tolerance and support healthy metabolic function, which are important factors in healthy aging."
  },
  {
    title: "Immune System Support",
    description: "Spermidine may help support immune function by maintaining the health of immune cells and supporting their proper function throughout the aging process.",
    details: "Research indicates that spermidine can help maintain immune cell function and may support the body's natural defense mechanisms against age-related immune decline."
  },
  {
    title: "Hair and Skin Health",
    description: "Spermidine may support healthy hair growth and skin appearance. Some studies suggest it can help maintain hair follicle health and support the natural renewal processes in skin cells.",
    details: "Clinical studies have shown that spermidine supplementation may help reduce hair loss and support hair growth by promoting healthy cellular function in hair follicles."
  },
  {
    title: "Sleep Quality Enhancement",
    description: "Some research suggests that spermidine may help improve sleep quality and duration, which are crucial factors for overall health and longevity.",
    details: "Studies have indicated that spermidine supplementation may help regulate sleep patterns and improve sleep quality, which is essential for cellular repair and overall well-being."
  }
];

const Benefits = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Health Benefits of Spermidine</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Spermidine is a natural polyamine with powerful longevity and cellular health benefits.
            Discover how this remarkable compound can support your health and wellbeing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {benefitsList.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
              <div className="flex items-start mb-4">
                <CheckCircle className="h-6 w-6 text-brand-600 mr-3 mt-1 flex-shrink-0" />
                <h3 className="text-xl font-semibold">{benefit.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{benefit.description}</p>
              <p className="text-sm text-gray-500 italic">{benefit.details}</p>
            </div>
          ))}
        </div>

        <div className="bg-brand-50 p-8 rounded-xl max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">Find Your Ideal Spermidine Supplement</h2>
          <p className="text-center mb-6">
            Now that you understand the benefits of spermidine, find the right supplement
            that meets your specific longevity and health needs.
          </p>
          <div className="flex justify-center">
            <Button size="lg" asChild>
              <Link to="/products/top-picks">
                View Top-Rated Spermidine Supplements
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
