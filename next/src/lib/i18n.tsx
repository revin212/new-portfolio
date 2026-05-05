"use client";

import { usePathname, useSearchParams } from "next/navigation";
import {
  createContext,
  Suspense,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  defaultLocale,
  isLocale,
  LOCALE_QUERY_PARAM,
  messages,
  type Locale,
  type MessageBundle,
} from "@/lib/messages";

const STORAGE_KEY = "portfolio-locale";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

function LocaleProviderFallback({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);
  const value = useMemo(
    () => ({ locale, setLocale }),
    [locale, setLocale]
  );
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

function LocaleProviderInner({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const langParam = searchParams.get(LOCALE_QUERY_PARAM);

  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (langParam && isLocale(langParam)) {
      setLocaleState(langParam);
      setMounted(true);
      return;
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isLocale(stored)) {
      setLocaleState(stored);
    } else {
      setLocaleState(defaultLocale);
    }
    setMounted(true);
  }, [pathname, langParam]);

  useEffect(() => {
    if (!mounted) return;
    localStorage.setItem(STORAGE_KEY, locale);
    document.documentElement.lang = locale === "id" ? "id" : "en";
  }, [locale, mounted]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  const value = useMemo(
    () => ({ locale, setLocale }),
    [locale, setLocale]
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={<LocaleProviderFallback>{children}</LocaleProviderFallback>}
    >
      <LocaleProviderInner>{children}</LocaleProviderInner>
    </Suspense>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return ctx;
}

export function useMessages(): MessageBundle {
  const { locale } = useLocale();
  return messages[locale];
}
