import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - FarmMarket',
  description: 'Frequently asked questions about FarmMarket, our fresh produce, delivery, and services.',
};

export default function FAQPage() {
  const faqs = [
    {
      question: 'How fresh is your produce?',
      answer: 'Our produce is harvested at peak ripeness and delivered within 24-48 hours of harvest, ensuring maximum freshness and nutritional value. We work directly with local farmers to minimize the time from farm to table.'
    },
    {
      question: 'Do you offer delivery?',
      answer: 'Yes! We offer local delivery within our service area. Orders over $35 qualify for free delivery. For orders under $35, there is a small delivery fee. We also offer pickup options at designated farm locations.'
    },
    {
      question: 'What areas do you serve?',
      answer: 'We currently serve the greater Springfield area and surrounding communities within a 50-mile radius. We are continuously expanding our delivery area based on farmer partnerships and customer demand.'
    },
    {
      question: 'How do I place an order?',
      answer: 'You can place an order through our website by browsing products, adding items to your cart, and checking out. We also accept phone orders during business hours. New customers will need to create an account for their first order.'
    },
    {
      question: 'Can I meet the farmers?',
      answer: "Absolutely! We host farm visits and farmers' markets throughout the season. Many of our farmers welcome visitors to their farms. Check our events page or contact us for upcoming opportunities to meet the people who grow your food."
    },
    {
      question: "What if I'm not satisfied with my order?",
      answer: "Your satisfaction is our priority. If you're not happy with your order, please contact us within 24 hours of delivery. We'll work with you to make it right, whether that means a replacement, refund, or credit toward your next order."
    },
    {
      question: 'Do you accept returns?',
      answer: "Due to the perishable nature of our products, we generally do not accept returns. However, if there's an issue with product quality or if you receive the wrong items, please contact us immediately and we'll resolve the issue."
    },
    {
      question: 'How do you ensure product quality?',
      answer: 'We work directly with certified farmers who follow sustainable farming practices. All products are inspected before shipping, and we maintain strict quality standards. We also encourage customer feedback to continuously improve our service.'
    },
    {
      question: 'Can I modify or cancel my order?',
      answer: 'Orders can be modified or cancelled up to 24 hours before the scheduled delivery time. Please contact our customer service team as soon as possible if you need to make changes to your order.'
    },
    {
      question: 'Do you offer subscription services?',
      answer: 'Yes! We offer weekly and bi-weekly subscription boxes with seasonal produce. Subscriptions can be customized based on your preferences and dietary needs. Contact us to learn more about our subscription options.'
    },
    {
      question: 'Are your products organic?',
      answer: 'Many of our products are organically grown, and we clearly label all organic items. We also offer conventionally grown produce from farmers who follow sustainable practices. You can filter products by organic certification on our website.'
    },
    {
      question: 'How do you support local farmers?',
      answer: 'We pay farmers fair prices for their products and provide them with a direct connection to consumers. We also offer educational resources and support for sustainable farming practices. A portion of every sale goes back to supporting our farming community.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about FarmMarket, our products, and services.
            Can&apos;t find what you&apos;re looking for? Contact us and we&apos;ll be happy to help.
          </p>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {faq.question}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-sm p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Can&apos;t find the answer you&apos;re looking for? Our customer service team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="tel:+1555123FARM"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition-colors"
            >
              Call (555) 123-FARM
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
