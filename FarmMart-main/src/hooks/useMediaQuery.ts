// src/hooks/useMediaQuery.ts

"use client";

import { useState, useEffect } from 'react';

/**
 * A custom React hook that tracks the state of a CSS media query.
 * @param query The media query string to watch (e.g., '(max-width: 768px)').
 * @returns `true` if the media query matches, otherwise `false`.
 */
export const useMediaQuery = (query: string): boolean => {
  // The initial state is `false` to ensure the server-rendered HTML and the initial
  // client-rendered HTML are identical, preventing hydration errors.
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // This effect runs only on the client, where `window` is available.
    const media = window.matchMedia(query);

    // Update the state immediately if the initial match state is different.
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Create a listener function to update the state whenever the screen size changes.
    const listener = () => {
      setMatches(media.matches);
    };

    // Add the listener.
    media.addEventListener('change', listener);

    // Cleanup function: remove the listener when the component unmounts to prevent memory leaks.
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [matches, query]); // Re-run the effect if the query string itself changes.

  return matches;
};