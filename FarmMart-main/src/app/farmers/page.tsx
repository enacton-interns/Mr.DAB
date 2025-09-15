import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Farmers - FarmMarket',
  description: 'Meet the dedicated farmers who grow the fresh produce available on FarmMarket.',
};

export default function FarmersPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Farmers</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the passionate farmers who grow the fresh, high-quality produce that makes FarmMarket special.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Farmer Card 1 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👨‍🌾</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">John Anderson</h3>
            <p className="text-gray-600 text-center mb-4">Organic Vegetable Farm</p>
            <p className="text-sm text-gray-600">
              John has been growing organic vegetables for over 20 years. His farm specializes in heirloom tomatoes,
              seasonal greens, and sustainable farming practices.
            </p>
          </div>

          {/* Farmer Card 2 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👩‍🌾</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">Maria Rodriguez</h3>
            <p className="text-gray-600 text-center mb-4">Fruit Orchard</p>
            <p className="text-sm text-gray-600">
              Maria&apos;s family orchard produces the sweetest apples, pears, and berries. They use traditional
              methods combined with modern sustainable practices.
            </p>
          </div>

          {/* Farmer Card 3 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👨‍🌾</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">David Chen</h3>
            <p className="text-gray-600 text-center mb-4">Herb & Spice Garden</p>
            <p className="text-sm text-gray-600">
              David grows over 50 varieties of herbs and spices using hydroponic systems.
              His farm supplies fresh herbs year-round to local restaurants and markets.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 text-center">Why Choose Our Farmers?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quality & Freshness</h3>
              <p className="text-gray-600 mb-4">
                Our farmers harvest their produce at peak ripeness and deliver it fresh to your door.
                No long supply chains mean better taste and nutrition.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Sustainable Practices</h3>
              <p className="text-gray-600 mb-4">
                All our farmers follow sustainable farming practices that protect the environment
                and ensure the long-term health of our soil and water.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Community Support</h3>
              <p className="text-gray-600 mb-4">
                By shopping with our farmers, you&apos;re supporting local families and helping
                build stronger, more resilient communities.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparency</h3>
              <p className="text-gray-600 mb-4">
                You can trace your food from farm to table. Meet the people who grow your food
                and learn about their farming methods.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
