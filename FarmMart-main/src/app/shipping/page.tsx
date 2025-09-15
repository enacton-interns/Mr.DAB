import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Policy - FarmMarket',
  description: 'Learn about our shipping policies, delivery areas, fees, and delivery schedules for fresh produce.',
};

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shipping Policy</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;re committed to delivering your fresh produce quickly and safely.
            Learn about our shipping options, delivery areas, and policies.
          </p>
        </div>

        <div className="space-y-8">
          {/* Delivery Areas */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Delivery Areas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Primary Delivery Zone</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Springfield, IL and surrounding areas</li>
                  <li>• Within 25 miles of our distribution center</li>
                  <li>• Same-day delivery available for orders placed before 2 PM</li>
                  <li>• Next-day delivery for orders placed after 2 PM</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Extended Delivery Zone</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Up to 50 miles from our distribution center</li>
                  <li>• 2-day delivery service</li>
                  <li>• Additional delivery fee may apply</li>
                  <li>• Subject to product availability</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Shipping Fees */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shipping Fees</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Order Total</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Primary Zone</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-900">Extended Zone</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">Under $35</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">$4.99</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">$7.99</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">$35 - $75</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">$2.99</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">$5.99</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">$75 - $150</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">$1.99</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">$4.99</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">Over $150</td>
                    <td className="border border-gray-300 px-4 py-3 text-green-600 font-semibold">FREE</td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">$2.99</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              * Free shipping on orders over $150 applies to primary delivery zone only.
              Extended zone orders qualify for free shipping on orders over $200.
            </p>
          </div>

          {/* Delivery Schedule */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Delivery Schedule</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Same-Day Delivery</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Orders placed before 2:00 PM</li>
                  <li>• Available Monday - Friday</li>
                  <li>• Delivery between 4:00 PM - 8:00 PM</li>
                  <li>• Additional $2.99 fee applies</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">Next-Day Delivery</h3>
                <ul className="text-gray-600 space-y-2">
                  <li>• Orders placed after 2:00 PM</li>
                  <li>• Available Monday - Saturday</li>
                  <li>• Delivery between 8:00 AM - 6:00 PM</li>
                  <li>• Standard delivery fee applies</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Special Handling */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Special Handling</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Temperature-Controlled Shipping</h3>
                <p className="text-gray-600">
                  All produce is shipped in temperature-controlled packaging to maintain freshness.
                  We use insulated containers and ice packs to keep your products at optimal temperatures during transit.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Fragile Item Protection</h3>
                <p className="text-gray-600">
                  Delicate items like berries, tomatoes, and herbs are carefully packaged with protective materials
                  to prevent bruising and damage during shipping.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Signature Required</h3>
                <p className="text-gray-600">
                  For orders over $50, we require a signature upon delivery to ensure your package arrives safely.
                  This helps prevent theft and ensures you receive your order.
                </p>
              </div>
            </div>
          </div>

          {/* Holiday & Special Dates */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Holiday & Special Dates</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Holiday Delivery Schedule</h3>
                <p className="text-gray-600 mb-3">
                  Our delivery schedule may be affected during holidays. Please check our website for any schedule changes.
                </p>
                <ul className="text-gray-600 space-y-1 ml-4">
                  <li>• Christmas Eve & New Year&apos;s Eve: Orders must be placed by 12:00 PM for same-day delivery</li>
                  <li>• Major holidays: Extended delivery windows may apply</li>
                  <li>• Weather-related delays: We monitor conditions and may adjust delivery schedules</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Questions About Shipping?</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about our shipping policies or need to make changes to your delivery,
              please don&apos;t hesitate to contact us.
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
    </div>
  );
}
