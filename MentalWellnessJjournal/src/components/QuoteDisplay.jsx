import React, { useEffect, useState, Component } from 'react';
import { RefreshCwIcon } from 'lucide-react';
export const QuoteDisplay = ({
  fullPage = false
}) => {
  const [quote, setQuote] = useState({
    text: '',
    author: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchQuote = async () => {
    setLoading(true);
    try {
      // Using a CORS proxy to access the ZenQuotes API
      const response = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent('https://zenquotes.io/api/random'));
      const data = await response.json();
      if (data.contents) {
        const quoteData = JSON.parse(data.contents)[0];
        setQuote({
          text: quoteData.q,
          author: quoteData.a
        });
      }
      setError(null);
    } catch (err) {
      console.error('Error fetching quote:', err);
      setError('Failed to load quote. Please try again.');
      // Fallback quote
      setQuote({
        text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
        author: 'Nelson Mandela'
      });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Check if we already have a quote stored for today
    const storedQuote = localStorage.getItem('dailyQuote');
    const storedDate = localStorage.getItem('quoteDate');
    const today = new Date().toDateString();
    if (storedQuote && storedDate === today) {
      setQuote(JSON.parse(storedQuote));
      setLoading(false);
    } else {
      fetchQuote();
    }
  }, []);
  useEffect(() => {
    if (!loading && !error && quote.text) {
      localStorage.setItem('dailyQuote', JSON.stringify(quote));
      localStorage.setItem('quoteDate', new Date().toDateString());
    }
  }, [quote, loading, error]);
  return <div className={`${fullPage ? 'h-[70vh] flex items-center justify-center' : ''}`}>
      <div className={`relative bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 overflow-hidden ${fullPage ? 'max-w-2xl mx-auto' : ''}`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500"></div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200 flex justify-between items-center">
          <span>Daily Inspiration</span>
          <button onClick={fetchQuote} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300" aria-label="Get new quote">
            <RefreshCwIcon size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </h3>
        {loading ? <div className="flex justify-center items-center py-8">
            <div className="animate-pulse text-gray-400">Loading quote...</div>
          </div> : error ? <div className="text-red-500 dark:text-red-400 py-4">{error}</div> : <blockquote className="italic text-gray-700 dark:text-gray-300 text-lg">
            "{quote.text}"
            <footer className="text-right mt-3 text-gray-600 dark:text-gray-400 text-sm">
              — {quote.author}
            </footer>
          </blockquote>}
      </div>
    </div>;
};