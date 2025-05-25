
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { HelpCircle, ChevronRight } from 'lucide-react';

const faqItems = [
  {
    question: "What is Spermidine?",
    answer: "Spermidine is a naturally occurring polyamine found in all living cells. It plays essential roles in cellular growth, DNA stabilization, and protein synthesis. Spermidine is found in foods like wheat germ, soybeans, aged cheese, and mushrooms. It's particularly known for its ability to promote autophagy, the cellular cleanup process that naturally declines with age."
  },
  {
    question: "How much Spermidine should I take daily?",
    answer: "Most studies have used spermidine doses ranging from 5 to 15 mg per day, with some studies using up to 20 mg daily. The optimal dose depends on your age, health status, and goals. Many supplements provide 8-12 mg per serving. It's always best to consult with a healthcare provider before starting any new supplement regimen."
  },
  {
    question: "When is the best time to take Spermidine?",
    answer: "Spermidine can be taken with or without food, though some people prefer taking it with a meal to reduce any potential stomach discomfort. Many people take it in the morning as part of their daily routine. The most important factor is consistency - taking it at the same time each day."
  },
  {
    question: "Are there any side effects of taking Spermidine supplements?",
    answer: "Spermidine is generally well-tolerated when taken at recommended doses. Some individuals might experience mild digestive discomfort initially, but this typically subsides as the body adjusts. Higher doses might cause more pronounced effects. If you're pregnant, nursing, on medication, or have health conditions, consult with a healthcare provider before supplementation."
  },
  {
    question: "Can Spermidine help with longevity?",
    answer: "Research suggests that spermidine may support healthy aging and longevity through its ability to promote autophagy - the cellular cleanup process. Studies in various organisms have shown lifespan extension with spermidine supplementation. While human longevity studies are ongoing, the cellular mechanisms suggest potential benefits for healthspan and aging."
  },
  {
    question: "How does Spermidine support autophagy?",
    answer: "Spermidine is one of the most potent natural autophagy inducers. It helps activate cellular cleanup processes that remove damaged proteins and organelles. This is crucial because autophagy naturally declines with age, leading to cellular dysfunction. By promoting autophagy, spermidine helps maintain cellular health and function."
  },
  {
    question: "Can I take Spermidine with other supplements or medications?",
    answer: "Spermidine may interact with certain medications, particularly those affecting cellular processes. It's often safely combined with other longevity supplements, but always consult with a healthcare provider before combining spermidine with medications or other supplements to avoid potential interactions."
  },
  {
    question: "What's the difference between natural and synthetic Spermidine?",
    answer: "Most high-quality spermidine supplements use natural sources, primarily wheat germ extract, which provides spermidine in its natural form along with other beneficial compounds. Synthetic spermidine has the same molecular structure but lacks the additional compounds found in natural sources. Natural sources are generally preferred for better bioavailability and safety."
  },
  {
    question: "Can Spermidine help with hair health?",
    answer: "Some research suggests that spermidine may support hair health and growth. Studies have shown that spermidine can help maintain hair follicle health and may reduce hair loss by promoting cellular health in hair follicles. However, individual results may vary, and more research is needed."
  },
  {
    question: "How long does it take for Spermidine to start working?",
    answer: "The timeframe for experiencing benefits from spermidine supplementation varies depending on the individual and the specific health aspect being addressed. Some cellular benefits may begin within days to weeks, while others like cardiovascular or cognitive benefits may take several weeks to months of consistent use to become noticeable."
  },
  {
    question: "Should I take Spermidine with food?",
    answer: "Spermidine can be taken with or without food. Some people prefer taking it with a meal to minimize any potential stomach discomfort, while others take it on an empty stomach for potentially better absorption. The most important factor is taking it consistently at the same time each day."
  },
  {
    question: "Is Spermidine safe for long-term use?",
    answer: "Spermidine is a natural compound that our bodies produce and use throughout life. Research suggests it's generally safe for long-term use at recommended doses. However, as with any supplement, it's wise to take periodic breaks and consult with a healthcare provider for personalized guidance, especially for long-term supplementation."
  }
];

const FAQ = () => {
  return (
    <div className="py-12">
      {/* Hero section */}
      <div className="bg-gradient-to-br from-brand-50 to-blue-50 py-12 mb-12">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-white rounded-full shadow-sm mb-4">
            <HelpCircle className="h-6 w-6 text-brand-600" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Get clear, evidence-based answers to your questions about Spermidine supplements
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-16">
          <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50">
            <h2 className="text-2xl font-semibold">Common Questions About Spermidine</h2>
            <p className="text-gray-600 mt-2">Click on any question to reveal the answer</p>
          </div>
          
          <div className="p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full divide-y">
              {faqItems.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="py-2 first:pt-0 last:pb-0 border-0">
                  <AccordionTrigger className="text-left font-medium hover:text-brand-600 hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-700 pb-4 pt-1">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        <div className="bg-brand-50 p-8 rounded-xl max-w-4xl mx-auto shadow-sm border border-brand-100 text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-6 text-gray-700">
            Learn more about spermidine or find the right supplement for your specific longevity needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700">
              <Link to="/products/top-picks">
                View Top Supplements
              </Link>
            </Button>
            
            <Button variant="outline" asChild size="lg">
              <Link to="/what-is-spermidine">
                Learn About Spermidine <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
