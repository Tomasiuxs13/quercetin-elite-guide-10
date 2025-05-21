
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const About = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">About QBestSupplements</h1>
          <p className="text-xl text-gray-600 text-center mb-8">
            Your trusted resource for evidence-based quercetin supplement information
          </p>
          
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-semibold mt-8">Our Mission</h2>
            <p>
              At QBestSupplements, our mission is to cut through the noise and provide you with clear, 
              trustworthy, and research-backed information about quercetin supplements. We believe that 
              everyone deserves access to high-quality health products without the confusion of marketing 
              hype or misleading claims.
            </p>

            <h2 className="text-2xl font-semibold mt-8">Who We Are</h2>
            <p>
              Founded in 2023 by a team of health enthusiasts, nutritionists, and research analysts, 
              QBestSupplements grew from our own frustration with the supplement industry. We found it 
              challenging to identify truly effective quercetin products among the sea of options, each 
              making bold claims without substantial evidence.
            </p>
            <p>
              Our team brings together expertise in nutrition science, biochemistry, and consumer advocacy. 
              We're not just reviewers – we're consumers who understand the importance of making informed 
              health decisions.
            </p>

            <h2 className="text-2xl font-semibold mt-8">Our Review Process</h2>
            <p>
              Our supplement reviews and recommendations are based on a rigorous evaluation process:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                <strong>Research-First Approach:</strong> We analyze scientific studies on quercetin and 
                its various formulations.
              </li>
              <li>
                <strong>Independent Testing:</strong> We work with independent labs to verify purity, potency, 
                and bioavailability claims.
              </li>
              <li>
                <strong>Real User Experiences:</strong> We gather feedback from verified consumers who have 
                used these products over time.
              </li>
              <li>
                <strong>Transparency Assessment:</strong> We evaluate how transparent companies are about their 
                sourcing, manufacturing, and testing processes.
              </li>
              <li>
                <strong>Value Analysis:</strong> We consider the cost relative to the quality and effectiveness 
                of each product.
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8">Our Commitment to You</h2>
            <p>
              We're committed to maintaining the highest standards of integrity in our reviews and recommendations:
            </p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>
                <strong>Editorial Independence:</strong> While we may earn commissions through affiliate links, 
                our reviews and rankings are never influenced by commercial relationships.
              </li>
              <li>
                <strong>Continuous Updates:</strong> We regularly revisit our recommendations as new products 
                emerge and formulations change.
              </li>
              <li>
                <strong>Scientific Rigor:</strong> We base our assessments on evidence, not trends or marketing claims.
              </li>
              <li>
                <strong>Transparency:</strong> We clearly disclose our testing methods, criteria, and potential 
                conflicts of interest.
              </li>
            </ul>

            <div className="my-12">
              <Separator className="my-8" />
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
                <p className="mb-6">
                  Have questions, feedback, or suggestions? We'd love to hear from you. Your insights help us 
                  improve our content and better serve our community.
                </p>
                <Button asChild>
                  <Link to="/contact">Contact Our Team</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
