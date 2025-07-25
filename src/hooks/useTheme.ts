'use client';

import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((newTheme: 'light' | 'dark') => {
    if (typeof window === 'undefined') return;

    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(newTheme);
    setResolvedTheme(newTheme);
  }, []);

  const updateTheme = useCallback(
    (newTheme: Theme) => {
      if (typeof window === 'undefined') return;

      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);

      if (newTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
          .matches
          ? 'dark'
          : 'light';
        applyTheme(systemTheme);
      } else {
        applyTheme(newTheme);
      }
    },
    [applyTheme]
  );

  const toggleTheme = useCallback(() => {
    if (theme === 'system') {
      updateTheme('light');
    } else if (theme === 'light') {
      updateTheme('dark');
    } else {
      updateTheme('light');
    }
  }, [theme, updateTheme]);

  useEffect(() => {
    setMounted(true);

    // Get stored theme or default to system
    const storedTheme = (localStorage.getItem('theme') as Theme) || 'system';

    // Apply initial theme
    if (storedTheme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';
      applyTheme(systemTheme);
    } else {
      applyTheme(storedTheme);
    }

    setTheme(storedTheme);

    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        const systemTheme = mediaQuery.matches ? 'dark' : 'light';
        applyTheme(systemTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyTheme]);

  return {
    theme,
    resolvedTheme,
    setTheme: updateTheme,
    toggleTheme,
    mounted,
  };
}
