
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, Users, Award, Shield, ChevronRight } from 'lucide-react';

const About = () => {
  return (
    <div className="py-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-brand-50 to-blue-50 py-16 mb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-white rounded-full shadow-sm mb-4">
              <Users className="h-6 w-6 text-brand-600" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-center">About SBestSupplements</h1>
            <p className="text-xl text-gray-700 text-center mb-0 max-w-2xl mx-auto">
              Your trusted resource for evidence-based spermidine supplement information
            </p>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4">
        <div className="mb-12 max-w-4xl mx-auto">
          {/* Mission Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-brand-700 flex items-center">
              <Award className="h-5 w-5 mr-2 text-brand-600" /> Our Mission
            </h2>
            <p className="text-gray-700">
              At SBestSupplements, our mission is to cut through the noise and provide you with clear, 
              trustworthy, and research-backed information about spermidine supplements. We believe that 
              everyone deserves access to high-quality longevity products without the confusion of marketing 
              hype or misleading claims.
            </p>
          </div>

          {/* Who We Are Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-brand-700 flex items-center">
              <Users className="h-5 w-5 mr-2 text-brand-600" /> Who We Are
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700">
              <p>
                Founded in 2023 by a team of longevity enthusiasts, nutritionists, and research analysts, 
                SBestSupplements grew from our own fascination with the emerging science of spermidine and 
                healthy aging. We found it challenging to identify truly effective spermidine products among 
                the growing market of options, each making bold longevity claims without substantial evidence.
              </p>
              <p>
                Our team brings together expertise in longevity research, biochemistry, and consumer advocacy. 
                We're not just reviewers – we're individuals passionate about healthy aging who understand 
                the importance of making informed decisions about longevity supplements.
              </p>
            </div>
          </div>

          {/* Review Process Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-brand-700 flex items-center">
              <CheckCircle className="h-5 w-5 mr-2 text-brand-600" /> Our Review Process
            </h2>
            <p className="mb-6 text-gray-700">
              Our supplement reviews and recommendations are based on a rigorous evaluation process:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-brand-700 font-medium">1</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Research-First Approach</strong>
                      <p className="text-gray-700 mt-1">We analyze scientific studies on spermidine and its various formulations.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-brand-700 font-medium">2</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Independent Testing</strong>
                      <p className="text-gray-700 mt-1">We work with independent labs to verify purity, potency, and source quality claims.</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-brand-700 font-medium">3</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Real User Experiences</strong>
                      <p className="text-gray-700 mt-1">We gather feedback from verified consumers who have used these products over time.</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="h-6 w-6 rounded-full bg-brand-100 flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-brand-700 font-medium">4</span>
                    </div>
                    <div>
                      <strong className="text-gray-900">Value Analysis</strong>
                      <p className="text-gray-700 mt-1">We consider the cost relative to the quality and effectiveness of each product.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Our Commitment Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4 text-brand-700 flex items-center">
              <Shield className="h-5 w-5 mr-2 text-brand-600" /> Our Commitment to You
            </h2>
            <p className="mb-6 text-gray-700">
              We're committed to maintaining the highest standards of integrity in our reviews and recommendations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">Editorial Independence</strong>
                  <p className="text-gray-700 mt-1 text-sm">While we may earn commissions through affiliate links, our reviews and rankings are never influenced by commercial relationships.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">Continuous Updates</strong>
                  <p className="text-gray-700 mt-1 text-sm">We regularly revisit our recommendations as new products emerge and formulations change.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">Scientific Rigor</strong>
                  <p className="text-gray-700 mt-1 text-sm">We base our assessments on evidence, not trends or marketing claims.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-gray-900">Transparency</strong>
                  <p className="text-gray-700 mt-1 text-sm">We clearly disclose our testing methods, criteria, and potential conflicts of interest.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Connect With Us Section */}
          <div className="bg-gradient-to-br from-brand-50 to-teal-50 rounded-xl shadow-sm border border-brand-100 p-8">
            <h3 className="text-xl font-semibold mb-4 text-center">Connect With Us</h3>
            <p className="mb-6 text-gray-700 text-center max-w-md mx-auto">
              Have questions, feedback, or suggestions? We'd love to hear from you. Your insights help us 
              improve our content and better serve our longevity community.
            </p>
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700">
                <Link to="/contact" className="flex items-center">
                  Contact Our Team <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
