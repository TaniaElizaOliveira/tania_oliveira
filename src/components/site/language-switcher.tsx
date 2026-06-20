"use client";

import { Languages } from "lucide-react";
import { useLocale } from "next-intl";
import {
  type CSSProperties,
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import styles from "./language-switcher.module.css";

type LanguageItem = {
  code: string;
  label: string;
};

type LanguageSwitcherProps = {
  label: string;
  languages: LanguageItem[];
  compact?: boolean;
};

type BubbleStyle = CSSProperties & {
  "--bubble-x": string;
  "--bubble-y": string;
  "--bubble-delay": string;
};

type GooStyle = CSSProperties & {
  "--goo-filter": string;
};

const languageNames: Record<string, string> = {
  pt: "Português",
  en: "English",
  es: "Español",
};

const bubblePositions = [
  { x: "-6.2rem", y: "2.35rem" },
  { x: "-3.25rem", y: "4.08rem" },
  { x: "-0.25rem", y: "3.2rem" },
];

export function LanguageSwitcher({
  label,
  languages,
  compact = false,
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement>(null);
  const safeId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const filterId = `language-switcher-goo-${safeId}`;
  const optionsId = `language-switcher-options-${safeId}`;
  const targetPathname = pathname === "/" ? "/home" : pathname;
  const activeLanguage =
    languages.find((language) => language.code === currentLocale) ??
    languages[0];

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  const selectLanguage = (locale: Locale) => {
    setIsOpen(false);
    router.push(targetPathname, { locale });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div
      className={[
        styles.languageSelector,
        compact ? styles.compact : "",
        isOpen ? styles.open : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onKeyDown={handleKeyDown}
      ref={rootRef}
    >
      <svg
        aria-hidden="true"
        className={styles.gooSvg}
        focusable="false"
        height="0"
        width="0"
      >
        <defs>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="6" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              result="goo"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div
        className={styles.bubbleGroup}
        id={optionsId}
        style={{ "--goo-filter": `url(#${filterId})` } as GooStyle}
      >
        {languages.map((language, index) => {
          const isActive = currentLocale === language.code;
          const position = bubblePositions[index] ?? bubblePositions[0];

          return (
            <button
              aria-label={`${label}: ${languageNames[language.code] ?? language.label}`}
              aria-pressed={isActive}
              className={[
                styles.languageBubble,
                isActive ? styles.activeBubble : "",
              ]
                .filter(Boolean)
                .join(" ")}
              key={language.code}
              onClick={() => selectLanguage(language.code as Locale)}
              style={
                {
                  "--bubble-x": position.x,
                  "--bubble-y": position.y,
                  "--bubble-delay": `${index * 34}ms`,
                } as BubbleStyle
              }
              tabIndex={isOpen ? 0 : -1}
              type="button"
            >
              {language.label}
            </button>
          );
        })}

        <button
          aria-controls={optionsId}
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label={label}
          className={styles.languageTrigger}
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          <Languages aria-hidden="true" className={styles.triggerIcon} />
          <span className={styles.triggerCode}>{activeLanguage?.label}</span>
        </button>
      </div>
    </div>
  );
}
