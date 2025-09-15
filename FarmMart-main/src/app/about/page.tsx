import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - FarmMarket',
  description: 'Learn about FarmMarket and our mission to connect you with fresh, local produce from farmers.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About FarmMarket</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting you with the freshest produce from local farmers, supporting sustainable agriculture and healthy communities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-4">
              At FarmMarket, we believe in the power of fresh, locally-sourced food to nourish both body and community.
              Our platform connects consumers directly with local farmers, ensuring you get the freshest produce while supporting sustainable farming practices.
            </p>
            <p className="text-gray-600">
              We&apos;re committed to transparency, quality, and building lasting relationships between farmers and food lovers.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-900 mb-6">What We Offer</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Fresh, seasonal produce from local farms
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Direct farmer-to-consumer marketplace
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Sustainable and organic farming practices
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Community support and farmer education
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                Transparent pricing and quality assurance
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sustainability</h3>
              <p className="text-gray-600">Supporting eco-friendly farming practices that protect our environment.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Community</h3>
              <p className="text-gray-600">Building strong connections between farmers and consumers.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
              <p className="text-gray-600">Ensuring the highest standards for fresh, nutritious produce.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
