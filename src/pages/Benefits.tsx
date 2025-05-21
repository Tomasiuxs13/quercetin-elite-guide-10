
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const benefitsList = [
  {
    title: "Powerful Antioxidant",
    description: "Quercetin is a flavonoid with potent antioxidant properties that help neutralize free radicals in the body. Free radicals can damage cells, contributing to aging and various diseases, including cancer. By neutralizing these harmful molecules, quercetin helps protect your cells from oxidative stress and damage.",
    details: "Research suggests that quercetin's antioxidant capacity may be stronger than other flavonoids, making it particularly effective at combating oxidative stress associated with chronic diseases."
  },
  {
    title: "Anti-inflammatory Properties",
    description: "Quercetin helps reduce inflammation in the body by inhibiting enzymes that promote inflammation and by blocking the release of histamine. This may help alleviate symptoms of inflammatory conditions like arthritis, asthma, and allergies.",
    details: "Studies indicate that quercetin can downregulate the production of inflammatory cytokines and inhibit inflammatory pathways, potentially offering relief for various inflammatory conditions."
  },
  {
    title: "Immune System Support",
    description: "By modulating the immune response, quercetin helps strengthen your body's natural defenses against infections. It can enhance the function of immune cells and help the body respond more effectively to pathogens.",
    details: "During viral infections, quercetin may work as a zinc ionophore, helping transport zinc into cells where it can inhibit viral replication, enhancing the body's ability to fight infections."
  },
  {
    title: "Allergy Relief",
    description: "Quercetin acts as a natural antihistamine by stabilizing mast cells, which are responsible for releasing histamine during allergic reactions. By reducing histamine release, it may help alleviate allergy symptoms like sneezing, itching, and watery eyes.",
    details: "Clinical studies have shown that quercetin can be comparable to conventional antihistamines for some people, but without the drowsiness and other side effects associated with many allergy medications."
  },
  {
    title: "Cardiovascular Health",
    description: "Quercetin may promote heart health by reducing blood pressure, improving endothelial function, and preventing LDL cholesterol oxidation. These effects collectively contribute to a reduced risk of heart disease.",
    details: "Several studies have demonstrated quercetin's ability to lower systolic and diastolic blood pressure in hypertensive individuals, potentially reducing the risk of heart attacks and strokes."
  },
  {
    title: "Blood Sugar Regulation",
    description: "Research suggests that quercetin may help improve insulin sensitivity and reduce blood sugar levels, potentially benefiting those with diabetes or at risk for developing it.",
    details: "Quercetin has been shown to inhibit enzymes involved in carbohydrate digestion and absorption, which may help prevent spikes in blood sugar levels after meals."
  },
  {
    title: "Brain Health Support",
    description: "Quercetin's antioxidant and anti-inflammatory properties may help protect brain cells from damage and reduce the risk of neurodegenerative diseases like Alzheimer's and Parkinson's.",
    details: "Recent research indicates that quercetin can cross the blood-brain barrier and may help prevent the formation of amyloid plaques associated with Alzheimer's disease."
  },
  {
    title: "Exercise Performance Enhancement",
    description: "Some studies suggest that quercetin supplementation may improve endurance exercise capacity and reduce fatigue by enhancing mitochondrial function and increasing energy production.",
    details: "Athletic performance studies have shown that quercetin may increase VO2 max and time to fatigue in both trained and untrained individuals, although results vary between studies."
  }
];

const Benefits = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Health Benefits of Quercetin</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Quercetin is a powerful flavonoid with numerous evidence-backed health benefits.
            Discover how this natural compound can support your health and wellbeing.
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
          <h2 className="text-2xl font-bold mb-4 text-center">Find Your Ideal Quercetin Supplement</h2>
          <p className="text-center mb-6">
            Now that you understand the benefits of quercetin, find the right supplement
            that meets your specific health needs and quality standards.
          </p>
          <div className="flex justify-center">
            <Button size="lg" asChild>
              <Link to="/products/top-picks">
                View Top-Rated Quercetin Supplements
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
