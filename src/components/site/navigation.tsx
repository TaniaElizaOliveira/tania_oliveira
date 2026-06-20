"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import NextLink from "next/link";
import { useState } from "react";
import toIcon from "@/assets/tania_oliveira_logo_final_pack/to-icon-transparent-cropped.png";
import type { SiteContent } from "@/content/dictionaries";
import { Link, usePathname } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { LanguageSwitcher } from "./language-switcher";
import styles from "./navigation.module.css";

type NavigationProps = {
  content: SiteContent["navigation"];
  locale: Locale;
};

export function Navigation({ content, locale }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const currentPath = pathname.replace(/\/$/, "") || "/";

  const renderTab = (
    item: SiteContent["navigation"]["items"][number],
    isMobile = false,
  ) => {
    const itemPath = item.href.replace(/\/$/, "") || "/";
    const isActive =
      itemPath === "/"
        ? currentPath === "/"
        : currentPath === itemPath || currentPath.startsWith(`${itemPath}/`);

    const linkClassName = [
      isMobile ? styles.mobileTab : styles.folderTab,
      isActive ? styles.activeTab : "",
    ]
      .filter(Boolean)
      .join(" ");

    if (item.href === "/under-construction") {
      return (
        <NextLink
          aria-current={isActive ? "page" : undefined}
          className={linkClassName}
          href="/under-construction"
          key={item.label}
          onClick={() => setIsOpen(false)}
        >
          {item.label}
        </NextLink>
      );
    }

    return (
      <Link
        aria-current={isActive ? "page" : undefined}
        className={linkClassName}
        href={item.href}
        key={item.label}
        locale={locale}
        onClick={() => setIsOpen(false)}
      >
        {item.label}
      </Link>
    );
  };

  return (
    <header className={styles.header}>
      <a className={styles.skipLink} href="#content">
        {content.skip}
      </a>
      <nav aria-label={content.aria} className={styles.nav}>
        <Link
          aria-label={content.homeAria}
          className={styles.brand}
          href="/home"
          locale={locale}
        >
          <Image
            alt=""
            className={styles.brandIcon}
            draggable={false}
            priority
            src={toIcon}
          />
          <span className={styles.brandText}>{content.brand}</span>
        </Link>

        <div className={styles.desktopTabs}>
          {content.items.map((item) => renderTab(item))}
        </div>

        <div className={styles.desktopActions}>
          <LanguageSwitcher
            compact
            label={content.languageLabel}
            languages={content.languages}
          />
        </div>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isOpen}
          aria-label={isOpen ? content.closeMenu : content.openMenu}
          className={styles.menuButton}
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          {isOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </nav>

      {isOpen ? (
        <div className={styles.mobilePanel} id="mobile-navigation">
          <div className={styles.mobileTabs}>
            {content.items.map((item) => renderTab(item, true))}
          </div>
          <LanguageSwitcher
            label={content.languageLabel}
            languages={content.languages}
          />
        </div>
      ) : null}
    </header>
  );
}
