import type { SiteContent } from "@/content/dictionaries";
import { Link } from "@/i18n/navigation";
import NextLink from "next/link";
import styles from "./footer.module.css";

type FooterProps = {
  content: SiteContent["footer"];
  social: SiteContent["social"];
};

export function Footer({ content, social }: FooterProps) {
  const statusRows = [
    ["name", content.brand],
    ["role", content.role],
    ["focus", content.focus],
    ["mindset", content.mindset],
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.glow} aria-hidden="true" />

      <div className={styles.inner}>
        <section className={styles.terminalCard} aria-label={content.brand}>
          <div className={styles.windowBar} aria-hidden="true">
            <span />
            <span />
            <span />
          </div>

          <div className={styles.promptLine}>
            <span className={styles.promptSymbol}>$</span>
            <span>{content.prompt}</span>
            <span className={styles.cursor} aria-hidden="true" />
          </div>

          <div className={styles.statusBlock}>
            <span className={styles.brace}>{"{"}</span>
            <dl className={styles.statusList}>
              {statusRows.map(([key, value]) => (
                <div className={styles.statusRow} key={key}>
                  <dt>{key}</dt>
                  <dd>{`"${value}"`}</dd>
                </div>
              ))}
            </dl>
            <span className={styles.brace}>{"}"}</span>
          </div>
        </section>

        <div className={styles.linkPanel}>
          <nav className={styles.linkGroup} aria-label={content.linksLabel}>
            <p className={styles.linkTitle}>{content.linksLabel}</p>
            <div className={styles.linkGrid}>
              {content.links.map((link) => (
                link.href === "/under-construction" ? (
                  <NextLink
                    className={styles.footerLink}
                    href="/under-construction"
                    key={`${link.label}-${link.href}`}
                  >
                    {link.label}
                  </NextLink>
                ) : (
                  <Link
                    className={styles.footerLink}
                    href={link.href}
                    key={`${link.label}-${link.href}`}
                  >
                    {link.label}
                  </Link>
                )
              ))}
            </div>
          </nav>

          <nav className={styles.linkGroup} aria-label={content.socialLabel}>
            <p className={styles.linkTitle}>{content.socialLabel}</p>
            <div className={styles.linkGrid}>
              {social.links.map((link) => (
                <a
                  aria-label={link.label}
                  className={styles.footerLink}
                  href={link.href}
                  key={link.label}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      </div>

      <div className={styles.bottomLine}>
        <p>{content.builtLine}</p>
        <p>{content.copyright}</p>
      </div>
    </footer>
  );
}
