import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Return Policy - FarmMarket',
  description: 'Learn about our return and refund policies for fresh produce orders.',
};

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Return Policy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We want you to be completely satisfied with your fresh produce.
            Learn about our return and refund policies.
          </p>
        </div>

        <div className="space-y-8">
          {/* Return Eligibility */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Return Eligibility</h2>
            <div className="space-y-4">
              <div className="border-l-4 border-green-500 pl-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Items We Accept Returns For</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Wrong items received</li>
                  <li>• Damaged or spoiled products</li>
                  <li>• Products that don&apos;t match the description</li>
                  <li>• Packaging issues affecting product quality</li>
                </ul>
              </div>

              <div className="border-l-4 border-red-500 pl-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Items We Cannot Accept Returns For</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Fresh produce that has been consumed or prepared</li>
                  <li>• Items returned after 24 hours of delivery</li>
                  <li>• Products damaged due to customer mishandling</li>
                  <li>• Perishable items that have exceeded their freshness window</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Return Process */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Return Process</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">1</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Contact Us</h3>
                  <p className="text-gray-600">
                    Call our customer service team at (555) 123-FARM or email support@farmmarket.com
                    within 24 hours of delivery to initiate your return request.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">2</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Provide Details</h3>
                  <p className="text-gray-600">
                    Share photos of the issue and provide your order number. Our team will review
                    your request and determine the appropriate resolution.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">3</span>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Resolution</h3>
                  <p className="text-gray-600">
                    We&apos;ll arrange for pickup of the returned items (if applicable) and process
                    your refund or replacement within 3-5 business days.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Options */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Refund Options</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Full Refund</h3>
                <p className="text-gray-600 mb-3">
                  Complete refund to your original payment method for wrong or damaged items.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Processing time: 3-5 business days</li>
                  <li>• Includes original shipping costs</li>
                  <li>• Available for most return scenarios</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Store Credit</h3>
                <p className="text-gray-600 mb-3">
                  Credit toward your next purchase for future use on our platform.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Immediate credit to your account</li>
                  <li>• No expiration on credit</li>
                  <li>• Can be used for any products</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Replacement</h3>
                <p className="text-gray-600 mb-3">
                  Free replacement of the damaged or incorrect items.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Same-day replacement when possible</li>
                  <li>• No additional shipping costs</li>
                  <li>• Priority processing</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Partial Refund</h3>
                <p className="text-gray-600 mb-3">
                  Pro-rated refund for partially damaged orders.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Based on item value and damage extent</li>
                  <li>• Quick processing</li>
                  <li>• Flexible resolution options</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Timeframes */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Important Timeframes</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-900 font-medium">Report Issues</span>
                <span className="text-gray-600">Within 24 hours of delivery</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-900 font-medium">Return Shipping</span>
                <span className="text-gray-600">Within 48 hours of approval</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-900 font-medium">Refund Processing</span>
                <span className="text-gray-600">3-5 business days</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <span className="text-gray-900 font-medium">Bank Transfer Time</span>
                <span className="text-gray-600">5-10 business days</span>
              </div>
            </div>
          </div>

          {/* Quality Guarantee */}
          <div className="bg-green-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Our Quality Guarantee</h2>
            <div className="space-y-4">
              <p className="text-gray-700">
                At FarmMarket, we stand behind the quality of our fresh produce. If you&apos;re not
                completely satisfied with the freshness or quality of your order, we&apos;ll make it right.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 text-xl">🌱</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Fresh Guarantee</h3>
                  <p className="text-sm text-gray-600">Peak freshness or your money back</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 text-xl">⚡</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Quick Resolution</h3>
                  <p className="text-sm text-gray-600">Fast response to all concerns</p>
                </div>

                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-orange-600 text-xl">💚</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Customer First</h3>
                  <p className="text-sm text-gray-600">Your satisfaction is our priority</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Need to Return an Item?</h2>
            <p className="text-gray-600 mb-6">
              Our customer service team is here to help you with any returns or concerns.
              Don&apos;t hesitate to reach out to us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors"
              >
                Start Return Process
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
    </div>
  );
}
