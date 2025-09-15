import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - FarmMarket',
  description: 'Read our terms of service and user agreement for using FarmMarket platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Please read these terms of service carefully before using FarmMarket.
            By using our platform, you agree to be bound by these terms.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="space-y-8">
          {/* Acceptance of Terms */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">1. Acceptance of Terms</h2>
            <p className="text-gray-600 leading-relaxed">
              By accessing and using FarmMarket, you accept and agree to be bound by the terms and provision
              of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          {/* Use License */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">2. Use License</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                Permission is granted to temporarily use FarmMarket for personal, non-commercial transitory
                viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 ml-4">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on FarmMarket</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
              </ul>
            </div>
          </div>

          {/* User Accounts */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">3. User Accounts</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                When you create an account with us, you must provide information that is accurate, complete,
                and current at all times. You are responsible for safeguarding the password and for all activities
                that occur under your account.
              </p>
              <p className="text-gray-600">
                You agree not to disclose your password to any third party. You must notify us immediately
                upon becoming aware of any breach of security or unauthorized use of your account.
              </p>
            </div>
          </div>

          {/* Products and Services */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">4. Products and Services</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                All products and services are subject to availability. We reserve the right to discontinue
                any product or service at any time. Prices for our products are subject to change without notice.
              </p>
              <p className="text-gray-600">
                We have made every effort to display as accurately as possible the colors and images of our
                products. We cannot guarantee that your computer monitor&apos;s display of any color will be accurate.
              </p>
              <p className="text-gray-600">
                FarmMarket reserves the right, but is not obligated, to limit the sales of our products or
                services to any person, geographic region, or jurisdiction.
              </p>
            </div>
          </div>

          {/* Billing and Account Information */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">5. Billing and Account Information</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                You agree to provide current, complete, and accurate purchase and account information for all
                purchases made at our store. You agree to promptly update your account and other information,
                including your email address and credit card numbers and expiration dates.
              </p>
              <p className="text-gray-600">
                For more detail, please review our Returns Policy.
              </p>
            </div>
          </div>

          {/* Prohibited Uses */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">6. Prohibited Uses</h2>
            <p className="text-gray-600 mb-4">
              You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the service,
              violate any laws in your jurisdiction (including but not limited to copyright laws).
            </p>
            <p className="text-gray-600">
              You must not transmit any worms or viruses or any code of a destructive nature.
            </p>
          </div>

          {/* Accuracy of Information */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">7. Accuracy of Information</h2>
            <p className="text-gray-600">
              We are not responsible if information made available on this site is not accurate, complete, or current.
              The material on this site is provided for general information only and should not be relied upon or used
              as the sole basis for making decisions without consulting primary, more accurate, more complete, or more
              timely sources of information.
            </p>
          </div>

          {/* Modifications to Terms */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">8. Modifications to Terms</h2>
            <p className="text-gray-600">
              FarmMarket reserves the right, at our sole discretion, to modify or replace these Terms at any time.
              If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
              What constitutes a material change will be determined at our sole discretion.
            </p>
          </div>

          {/* Governing Law */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">9. Governing Law</h2>
            <p className="text-gray-600">
              These terms and conditions are governed by and construed in accordance with the laws of Illinois,
              and you irrevocably submit to the exclusive jurisdiction of the courts in that state or location.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Questions About Our Terms?</h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about these Terms of Service, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-md hover:bg-primary-700 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="mailto:legal@farmmarket.com"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-50 transition-colors"
              >
                Email Legal Team
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
