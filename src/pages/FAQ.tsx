
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
    question: "What is Quercetin?",
    answer: "Quercetin is a plant pigment (flavonoid) found in many plants, fruits, and vegetables such as red wine, onions, green tea, apples, and berries. It's one of the most abundant antioxidants in the human diet and is known for its potential to help fight inflammation, allergies, and support the immune system."
  },
  {
    question: "How much Quercetin should I take daily?",
    answer: "Most studies have used quercetin doses ranging from 500 to 1,000 mg per day. However, the optimal dose depends on your specific health conditions and goals. It's always best to consult with a healthcare provider before starting any new supplement regimen, especially if you have existing health conditions or are taking medications."
  },
  {
    question: "When is the best time to take Quercetin?",
    answer: "Quercetin is often best absorbed when taken with food that contains some fat. Many people take it with meals, and if you're taking a higher dose, it may be beneficial to split it into two doses throughout the day (typically with breakfast and dinner). However, timing may vary based on your specific health goals and daily routine."
  },
  {
    question: "Are there any side effects of taking Quercetin supplements?",
    answer: "Quercetin is generally considered safe for most people when taken at recommended doses. Some individuals might experience mild side effects like headaches, tingling sensations, or digestive discomfort. Higher doses might cause more pronounced side effects. If you're pregnant, nursing, on medication, or have health conditions, consult with a healthcare provider before supplementation."
  },
  {
    question: "Can Quercetin help with allergies?",
    answer: "Yes, quercetin has natural antihistamine properties that may help reduce allergy symptoms. It works by stabilizing mast cells that release histamine, the compound responsible for allergy symptoms. Some studies suggest it may be particularly helpful for seasonal allergies, reducing symptoms like sneezing, itching, and watery eyes."
  },
  {
    question: "Does Quercetin help with immune support?",
    answer: "Research suggests that quercetin has immune-boosting properties. It may help strengthen the body's natural defenses by acting as an antioxidant, reducing inflammation, and potentially inhibiting the replication of certain viruses. Some studies have investigated its role in supporting immune function during times of stress or illness."
  },
  {
    question: "Can I take Quercetin with other supplements or medications?",
    answer: "Quercetin may interact with certain medications, including blood thinners, antibiotics, and drugs metabolized by the liver. It's also often paired with other supplements like vitamin C or bromelain to enhance absorption. Always consult with a healthcare provider before combining quercetin with medications or other supplements to avoid potential interactions."
  },
  {
    question: "What form of Quercetin is best absorbed?",
    answer: "Standard quercetin has relatively low bioavailability (how well it's absorbed by the body). Forms like quercetin phytosome or quercetin with enzymes like bromelain may be better absorbed. Some supplements also use delivery systems designed to enhance absorption, such as liposomal quercetin or quercetin bound to phospholipids."
  },
  {
    question: "Is natural or synthetic Quercetin better?",
    answer: "Both natural and synthetic forms of quercetin have similar molecular structures and effects. However, some people prefer natural sources from food or supplements derived from plant extracts. The quality and purity of the supplement are generally more important factors than whether it's natural or synthetic."
  },
  {
    question: "Can Quercetin help with exercise performance?",
    answer: "Some research suggests that quercetin may support exercise performance by enhancing mitochondrial function, reducing oxidative stress, and potentially decreasing inflammation after intense exercise. Studies have shown mixed results, with some indicating modest improvements in endurance capacity and others showing no significant effect."
  },
  {
    question: "How long does it take for Quercetin to start working?",
    answer: "The timeframe for experiencing benefits from quercetin supplementation varies depending on the individual and the specific health concern being addressed. For acute issues like allergies, some people report improvements within a few days. For chronic conditions or general health support, it might take several weeks of consistent use to notice benefits."
  },
  {
    question: "Should I take Quercetin with or without food?",
    answer: "Quercetin is best taken with food, particularly foods containing some fat, as this can enhance absorption. Taking it with a meal that includes healthy fats like avocado, nuts, or olive oil may help maximize its bioavailability."
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
            Get clear, evidence-based answers to your questions about Quercetin supplements
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-16">
          <div className="p-6 md:p-8 border-b border-gray-100 bg-gray-50">
            <h2 className="text-2xl font-semibold">Common Questions About Quercetin</h2>
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
            Learn more about quercetin or find the right supplement for your specific needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-brand-600 hover:bg-brand-700">
              <Link to="/products/top-picks">
                View Top Supplements
              </Link>
            </Button>
            
            <Button variant="outline" asChild size="lg">
              <Link to="/what-is-quercetin">
                Learn About Quercetin <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
