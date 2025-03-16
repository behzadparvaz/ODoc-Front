'use client';

import { useEffect } from 'react';
import pkg from '../package.json';

const clearCache = async () => {
  if (typeof window === 'undefined') return;

  // Get all cache keys
  const cacheKeys = await caches.keys();

  // Delete old caches
  await Promise.all(cacheKeys.map((key) => caches.delete(key)));
};

const unregisterServiceWorker = async () => {
  if (typeof window === 'undefined' || !navigator.serviceWorker) return;

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(
      registrations.map((registration) => registration.unregister()),
    );
  } catch {
    // Silently handle service worker unregistration errors
  }
};

const registerServiceWorker = async () => {
  if (typeof window === 'undefined' || !navigator.serviceWorker) return;

  try {
    await navigator.serviceWorker.register('/sw.js');
  } catch {
    // Silently handle service worker registration errors
  }
};

const checkVersionChange = () => {
  if (typeof window === 'undefined') return false;

  const storedVersion = localStorage.getItem('app-version');
  const currentVersion = pkg.version;

  if (storedVersion !== currentVersion) {
    localStorage.setItem('app-version', currentVersion);
    return true;
  }

  return false;
};

export const ServiceWorkerManager = () => {
  useEffect(() => {
    const handleServiceWorker = async () => {
      const hasVersionChanged = checkVersionChange();

      if (hasVersionChanged) {
        await clearCache();
        await unregisterServiceWorker();
        await registerServiceWorker();
      }
    };

    handleServiceWorker();

    // Add event listener for when the app comes back online
    window.addEventListener('online', handleServiceWorker);

    return () => {
      window.removeEventListener('online', handleServiceWorker);
    };
  }, []);

  return null;
};
