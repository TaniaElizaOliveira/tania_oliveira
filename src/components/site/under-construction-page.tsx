import Link from "next/link";
import type { SiteContent } from "@/content/dictionaries";
import type { Locale } from "@/i18n/routing";
import styles from "./under-construction-page.module.css";

type UnderConstructionPageProps = {
  content: SiteContent["underConstruction"];
  locale: Locale;
};

export function UnderConstructionPage({
  content,
  locale,
}: UnderConstructionPageProps) {
  return (
    <main className={styles.page}>
      <section
        aria-labelledby="under-construction-title"
        className={styles.card}
      >
        <div className={styles.statusBadge}>
          <span aria-hidden="true" />
          {content.badge}
        </div>

        <p className={styles.prompt}>{content.prompt}</p>
        <h1 className={styles.title} id="under-construction-title">
          {content.title}
        </h1>
        <p className={styles.subtitle}>{content.subtitle}</p>
        <p className={styles.text}>{content.text}</p>

        <div className={styles.nextPageCard}>
          <span>{content.nextLabel}</span>
          <strong>{content.nextPage}</strong>
        </div>

        <Link className={styles.homeLink} href={`/${locale}/home`}>
          {content.button}
        </Link>
      </section>
    </main>
  );
}
