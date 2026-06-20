"use client";

import { type KeyboardEvent, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import type { SiteContent } from "@/content/dictionaries";
import styles from "./education-runner-section.module.css";

type EducationRunnerSectionProps = {
  content: SiteContent["educationRunner"];
};

const jumpDuration = 820;

const milestoneLabels = [
  "Fullstack",
  "Digital",
  "Java",
  "Frontend",
  "React",
  "Product",
  "Python",
  "PHP",
  "CET L5",
  "Software",
];

export function EducationRunnerSection({
  content,
}: EducationRunnerSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isJumping, setIsJumping] = useState(false);
  const timeoutRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const total = content.items.length;
  const currentCourse = content.items[currentIndex];
  const unlockedCourses = content.items.slice(0, currentIndex);
  const latestUnlockedCourse = unlockedCourses[unlockedCourses.length - 1];
  const visibleUnlockedCourses = unlockedCourses.slice(-4);
  const isComplete = currentIndex >= total;
  const obstacleNumber = String(Math.min(currentIndex + 1, total)).padStart(
    2,
    "0",
  );
  const levelNumber = String(Math.min(currentIndex + 1, total)).padStart(
    2,
    "0",
  );
  const xpValue = currentIndex * 125;
  const activeMilestoneLabel = milestoneLabels[currentIndex] ?? obstacleNumber;

  const revealCurrentCourse = () => {
    const course = content.items[currentIndex];

    if (!course) {
      setIsJumping(false);
      return;
    }

    setCurrentIndex((value) => Math.min(value + 1, total));
    setIsJumping(false);
  };

  const triggerJump = () => {
    if (isJumping || isComplete || !currentCourse) {
      return;
    }

    if (shouldReduceMotion) {
      revealCurrentCourse();
      return;
    }

    setIsJumping(true);
    timeoutRef.current = window.setTimeout(revealCurrentCourse, jumpDuration);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key !== " " && event.key !== "Enter") {
      return;
    }

    event.preventDefault();
    triggerJump();
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <section
      aria-labelledby="education-runner-title"
      className={styles.section}
    >
      <div className={styles.backdropGlow} aria-hidden="true" />
      <div className={styles.gridLayer} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.header}>
          <p className={styles.eyebrow}>{content.eyebrow}</p>
          <h2 className={styles.title} id="education-runner-title">
            {content.title}
          </h2>
          <p className={styles.description}>{content.description}</p>
        </div>

        <button
          aria-label={content.actionLabel}
          className={styles.gameFrame}
          onClick={triggerJump}
          onKeyDown={onKeyDown}
          type="button"
        >
          <span className="sr-only">
            {currentCourse
              ? `${content.instructionLabel}. ${currentCourse.status}.`
              : content.completeLabel}
          </span>

          <span className={styles.hud} aria-hidden="true">
            <span className={styles.hudItem}>
              <span>EDUCATION XP</span>
              <strong>{xpValue}</strong>
            </span>
            <span className={styles.hudItem}>
              <span>LEVEL</span>
              <strong>{levelNumber}</strong>
            </span>
            <span className={styles.hudItem}>
              <span>UNLOCKED</span>
              <strong>
                {currentIndex} / {total}
              </strong>
            </span>
          </span>

          <span className={styles.instruction}>{content.instructionLabel}</span>
          <span className={styles.scanlines} aria-hidden="true" />
          <span className={styles.runnerParticles} aria-hidden="true" />
          <span className={styles.speedLines} aria-hidden="true" />

          <span className={styles.completedPath} aria-live="polite">
            {visibleUnlockedCourses.map((course, index) => {
              const isLatest = index === visibleUnlockedCourses.length - 1;
              const isOlderOnMobile = index < visibleUnlockedCourses.length - 2;

              return (
                <span
                  className={[
                    styles.unlockedBox,
                    isLatest ? styles.latestUnlockedBox : "",
                    isOlderOnMobile ? styles.hideOnMobile : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  key={course.title}
                >
                  <span>{course.title}</span>
                </span>
              );
            })}
          </span>

          <span
            aria-hidden="true"
            className={[
              styles.runner,
              isJumping ? styles.runnerJump : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <span
              className={[
                styles.runnerSprite,
                isJumping ? styles.runnerSpriteJump : styles.runnerSpriteRun,
              ].join(" ")}
            />
            <span className={styles.runnerShadow} />
          </span>

          {!isComplete ? (
            <span
              aria-hidden="true"
              className={[
                styles.obstacle,
                isJumping ? styles.obstacleCleared : styles.obstacleWaiting,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className={styles.obstacleIndex}>{obstacleNumber}</span>
              <span className={styles.obstacleLabel}>{activeMilestoneLabel}</span>
            </span>
          ) : (
            <span className={styles.nextGoalBox}>
              <span>{content.nextGoal.eyebrow}</span>
              <strong>{content.nextGoal.title}</strong>
              <small>{content.nextGoal.primary}</small>
              <small>{content.nextGoal.secondary}</small>
            </span>
          )}

          {latestUnlockedCourse ? (
            <span
              className={styles.unlockToast}
              key={latestUnlockedCourse.title}
            >
              <span>UNLOCKED</span>
              <strong>{latestUnlockedCourse.title}</strong>
              <small>{latestUnlockedCourse.status}</small>
            </span>
          ) : null}

          <span className={styles.platform} aria-hidden="true">
            <span />
          </span>

          <span className="sr-only" aria-live="polite">
            {isComplete
              ? `${content.nextGoal.title}: ${content.nextGoal.primary}. ${content.nextGoal.secondary}`
              : latestUnlockedCourse
                ? `${content.unlockedLabel}: ${latestUnlockedCourse.title}`
                : content.instructionLabel}
          </span>
        </button>
      </div>
    </section>
  );
}
