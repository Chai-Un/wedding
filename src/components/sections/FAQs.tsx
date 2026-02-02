import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What should I wear?",
    answer: "Garden party chic! Think flowy, breathable fabrics in pastel colors. Comfortable shoes are recommended since we'll be on grass."
  },
  {
    question: "Is parking available?",
    answer: "Yes! Free parking is available on-site with designated areas for PWDs and senior guests."
  },
  {
    question: "Can I bring a plus one?",
    answer: "Please check your invitation for details about plus ones. If you have questions, feel free to contact us."
  },
  {
    question: "Will the wedding be indoors or outdoors?",
    answer: "The celebration will be outdoors in an open-air garden space. We'll have contingency plans in case of weather changes."
  },
  {
    question: "What time should I arrive?",
    answer: "We recommend arriving by 5:00 PM for welcome photos and cocktails before the ceremony begins at 6:00 PM."
  },
  {
    question: "Are children welcome?",
    answer: "Please refer to your invitation for specific details about children at our celebration."
  }
];

export default function FAQs() {
  return (
    <section id="faqs" className="bg-[#e8dcc8] px-4 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif text-[#5a6e4a] italic">
            FAQs
          </h2>
          <p className="text-gray-600 text-lg mt-4">
            Questions you might have
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <Card key={index} className="bg-white/50 border-[#5a6e4a]/20 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-[#5a6e4a]">
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
