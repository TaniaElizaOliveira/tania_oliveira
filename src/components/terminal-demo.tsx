"use client";

import { Terminal } from "@/components/ui/terminal";

export default function TerminalDemo() {
  return (
    <section className="mt-12 w-full" aria-label="Terminal de conquistas">
      <Terminal
        commands={[
          "whoami",
          "cat achievements.txt",
          "npm run build-career",
          "git log --oneline --achievements",
          "deploy --portfolio",
        ]}
        delayBetweenCommands={1000}
        enableSound={false}
        outputs={{
          0: [
            "Tânia Oliveira",
            "Software Engineering Student",
            "Junior Developer focused on web development, AI-assisted programming and secure code practices",
          ],
          1: [
            "Built institutional websites with React, Next.js, PHP and WordPress",
            "Worked on ERP integrations using .NET, C#, APIs and business systems.",
            "Developed API and marketplace synchronization workflows",
            "Created multilingual frontend experiences in Portuguese, English and Spanish",
          ],
          2: [
            "✔ Frontend foundations completed",
            "✔ Backend and API integration in progress",
            "✔ Security-focused development mindset enabled",
            "✔ AI-assisted engineering workflow configured",
          ],
          3: [
            "feat: created professional portfolio website",
            "feat: developed ERP and CRM integration concepts",
            "feat: implemented multilingual UI structure",
            "feat: improved project documentation and delivery workflow",
          ],
          4: ["Build completed successfully.", "Portfolio ready for review."],
        }}
        typingSpeed={45}
        username="tania-portfolio"
      />
    </section>
  );
}
