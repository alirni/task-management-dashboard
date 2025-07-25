'use client';

import { useEffect, useState } from 'react';

interface HydrationSafeProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * A component that prevents hydration mismatches by only rendering children
 * after the component has hydrated on the client side.
 */
export const HydrationSafe: React.FC<HydrationSafeProps> = ({
  children,
  fallback = null,
}) => {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
